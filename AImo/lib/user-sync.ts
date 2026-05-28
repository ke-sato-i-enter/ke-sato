import type { CognitoUser } from "@/lib/auth-server"
import { createUser, getUser, getUserWithProfile } from "@/lib/dynamodb"

/**
 * CognitoユーザーをDynamoDBと同期
 * ユーザーが存在しない場合は自動作成
 */
export async function getOrCreateUser(cognitoUser: CognitoUser) {
  const userId = cognitoUser.sub
  const email = cognitoUser.email || `${cognitoUser.sub}@cognito.local`

  // 既存ユーザーを検索
  let dbUser = await getUser(userId)

  // ユーザーが存在しない場合は作成
  if (!dbUser) {
    dbUser = await createUser({
      pk: userId,
      email,
      name: cognitoUser.name || undefined,
    })
    console.log(`✓ Created new user in DynamoDB: ${email}`)
  }

  return dbUser
}

/**
 * CognitoユーザーのプロフィールをDynamoDBから取得
 * 存在しない場合は自動作成してから取得
 */
export async function getUserProfile(cognitoUser: CognitoUser) {
  const userId = cognitoUser.sub

  // ユーザーを同期（存在しない場合は作成）
  await getOrCreateUser(cognitoUser)

  // ユーザーとプロフィールを取得
  const { user, profile } = await getUserWithProfile(userId)

  return {
    id: user?.pk,
    email: user?.email,
    name: user?.name,
    birthDate: user?.birthDate,
    gender: user?.gender,
    address: user?.address,
    phone: user?.phone,
    photoUrl: user?.photoUrl,
    createdAt: user?.createdAt,
    updatedAt: user?.updatedAt,
    profile: profile
      ? {
          skills: profile.skills,
          workHistory: profile.workHistory,
          desiredConditions: profile.desiredConditions,
          selfPr: profile.selfPr,
          question1Answer: profile.question1Answer,
          question2Answer: profile.question2Answer,
          question3Answer: profile.question3Answer,
        }
      : null,
  }
}
