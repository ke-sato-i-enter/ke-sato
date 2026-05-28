import { Amplify } from "aws-amplify"

// Amplify設定（クライアント側）
export function configureAmplify() {
  if (typeof window === "undefined") return

  const userPoolId = process.env.NEXT_PUBLIC_USER_POOL_ID
  const userPoolClientId = process.env.NEXT_PUBLIC_USER_POOL_CLIENT_ID

  // Cognitoが設定されていない場合はスキップ
  if (!userPoolId || !userPoolClientId) {
    console.warn("⚠️ Cognito not configured. Authentication features will not work.")
    console.warn('   Run "pnpm sst dev" to create Cognito User Pool.')
    return
  }

  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId,
        userPoolClientId,
        loginWith: {
          email: true,
        },
      },
    },
  })
}
