#!/bin/bash

# セキュリティ設定スクリプト
# デプロイ後に実行: AWS_PROFILE=your-profile ./scripts/apply-security-settings.sh production

set -e

STAGE=$1
PROFILE=${AWS_PROFILE:-default}

if [ -z "$STAGE" ]; then
  echo "Usage: AWS_PROFILE=your-profile $0 <stage>"
  echo "Example: AWS_PROFILE=takumi-tech $0 production"
  exit 1
fi

echo "📋 Applying security settings for stage: $STAGE"
echo "📋 Using AWS Profile: $PROFILE"
echo ""

# 1. CloudFront Distribution IDを取得
echo "🔍 Finding CloudFront Distribution..."
DISTRIBUTION_ID=$(aws cloudfront list-distributions \
  --profile $PROFILE \
  --query "DistributionList.Items[?Comment=='sample-webapp-$STAGE-WebAppSite'].Id" \
  --output text | head -1)

if [ -z "$DISTRIBUTION_ID" ]; then
  echo "⚠️  CloudFront Distribution not found for stage: $STAGE"
  echo "   Trying alternative search..."
  DISTRIBUTION_ID=$(aws cloudfront list-distributions \
    --profile $PROFILE \
    --query "DistributionList.Items[?contains(Origins.Items[0].DomainName, 'sample-webapp-$STAGE')].Id" \
    --output text | head -1)
fi

if [ -z "$DISTRIBUTION_ID" ]; then
  echo "❌ CloudFront Distribution not found!"
  exit 1
fi

echo "✅ Found Distribution: $DISTRIBUTION_ID"
echo ""

# 2. Lambda Function名を取得
echo "🔍 Finding Lambda Functions..."
LAMBDA_FUNCTIONS=$(aws lambda list-functions \
  --profile $PROFILE \
  --query "Functions[?contains(FunctionName, 'sample-webapp-$STAGE-WebAppSite')].FunctionName" \
  --output text)

if [ -z "$LAMBDA_FUNCTIONS" ]; then
  echo "❌ Lambda Functions not found!"
  exit 1
fi

echo "✅ Found Lambda Functions:"
echo "$LAMBDA_FUNCTIONS"
echo ""

# 3. CloudFront地理的制限を設定（日本のみ）
echo "🌏 Setting CloudFront geo-restriction to Japan only..."
aws cloudfront get-distribution-config \
  --profile $PROFILE \
  --id $DISTRIBUTION_ID \
  --query 'DistributionConfig' \
  --output json > /tmp/cf-config.json

# ETagを取得
ETAG=$(aws cloudfront get-distribution-config \
  --profile $PROFILE \
  --id $DISTRIBUTION_ID \
  --query 'ETag' \
  --output text)

# geo-restrictionを追加
jq '.Restrictions.GeoRestriction = {"RestrictionType": "whitelist", "Quantity": 1, "Items": ["JP"]}' \
  /tmp/cf-config.json > /tmp/cf-config-updated.json

# TLS v1.2を設定
jq '.ViewerCertificate.MinimumProtocolVersion = "TLSv1.2_2021"' \
  /tmp/cf-config-updated.json > /tmp/cf-config-final.json

# CloudFront設定を更新
aws cloudfront update-distribution \
  --profile $PROFILE \
  --id $DISTRIBUTION_ID \
  --distribution-config file:///tmp/cf-config-final.json \
  --if-match $ETAG \
  --query 'Distribution.Id' \
  --output text > /dev/null

echo "✅ CloudFront geo-restriction and TLS settings applied"
echo ""

# 4. Lambda同時実行数制限を設定
echo "⚡ Setting Lambda reserved concurrent executions to 5..."
for FUNCTION_NAME in $LAMBDA_FUNCTIONS; do
  echo "   - $FUNCTION_NAME"
  aws lambda put-function-concurrency \
    --profile $PROFILE \
    --function-name $FUNCTION_NAME \
    --reserved-concurrent-executions 5 \
    --output text > /dev/null
  echo "     ✅ Set to 5 concurrent executions"
done

echo ""
echo "🎉 All security settings applied successfully!"
echo ""
echo "📋 Summary:"
echo "   ✅ CloudFront geo-restriction: Japan only"
echo "   ✅ CloudFront TLS: v1.2+"
echo "   ✅ Lambda concurrency: 5 per function"
echo ""
echo "🔗 CloudFront Distribution: https://$DISTRIBUTION_ID.cloudfront.net"
