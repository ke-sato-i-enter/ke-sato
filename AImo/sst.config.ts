/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "sample-webapp",
      removal: input?.stage === "production" ? "retain" : "remove",
      home: "aws",
      providers: {
        aws: {
          region: "ap-northeast-1", // 東京リージョン
        },
      },
    };
  },
  async run() {
    // DynamoDB テーブル（ユーザーデータ）
    // 暗号化はAWS管理キーでデフォルト有効
    const table = new sst.aws.Dynamo("WebAppTable", {
      fields: {
        pk: "string",  // パーティションキー（userId または email）
        sk: "string",  // ソートキー（USER, PROFILE, etc）
      },
      primaryIndex: { hashKey: "pk", rangeKey: "sk" },
      transform: {
        table: {
          serverSideEncryption: {
            enabled: true, // 保存時の暗号化を明示的に有効化
          },
          pointInTimeRecovery: {
            enabled: true, // ポイントインタイムリカバリー有効化（誤更新・削除対策）
          },
        },
      },
    });

    // Cognito ユーザープール（認証）
    const userPool = new sst.aws.CognitoUserPool("UserPool", {
      usernames: ["email"],
    });

    const userPoolClient = userPool.addClient("UserPoolClient", {
      transform: {
        client: {
          generateSecret: false,
          explicitAuthFlows: [
            "ALLOW_USER_PASSWORD_AUTH",
            "ALLOW_REFRESH_TOKEN_AUTH",
            "ALLOW_USER_SRP_AUTH",
          ],
        },
      },
    });

    // S3バケット（画像・動画アップロード用）
    // パブリックアクセスを明示的にブロック、暗号化を有効化
    const bucket = new sst.aws.Bucket("Uploads", {
      public: false,
    });

    // S3バケット暗号化設定（AES256 サーバーサイド暗号化）
    // ※ Next.jsアセットバケットはSSTにより自動的にAES256暗号化が有効化されます
    new aws.s3.BucketServerSideEncryptionConfigurationV2("UploadsEncryption", {
      bucket: bucket.name,
      rules: [{
        applyServerSideEncryptionByDefault: {
          sseAlgorithm: "AES256",
        },
        bucketKeyEnabled: true, // S3 Bucket Keyを有効化してKMSコストを削減
      }],
    });

    // Next.jsサイト（CloudFront + Lambda）
    const site = new sst.aws.Nextjs("WebAppSite", {
      link: [bucket, userPool, userPoolClient, table],
      environment: {
        NEXT_PUBLIC_UPLOAD_BUCKET: bucket.name,
        NEXT_PUBLIC_USER_POOL_ID: userPool.id,
        NEXT_PUBLIC_USER_POOL_CLIENT_ID: userPoolClient.id,
        NEXT_PUBLIC_AWS_REGION: "ap-northeast-1",
        DYNAMODB_TABLE_NAME: table.name,
      },
    });

    // CloudFront地理的制限（日本のみ）とTLS v1.2設定
    // Lambda同時実行数制限（コスト管理: 5並列まで）
    // ※ これらはSSTがインフラをプロビジョニングした後、AWS SDKで手動設定が必要です
    // ※ または、SST transform機能でPulumi/Terraformレベルでカスタマイズ可能です

    return {
      url: site.url,
      bucketName: bucket.name,
      userPoolId: userPool.id,
      userPoolClientId: userPoolClient.id,
      tableName: table.name,
    };
  },
});
