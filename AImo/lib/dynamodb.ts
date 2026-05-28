import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({
  region: process.env.NEXT_PUBLIC_AWS_REGION || process.env.AWS_REGION || "ap-northeast-1",
})

export const dynamodb = DynamoDBDocumentClient.from(client)

export const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "WebAppTable-dev"

// データ型定義
export interface User {
  pk: string // userId (Cognito sub)
  sk: "USER"
  email: string
  name?: string
  birthDate?: string
  gender?: string
  address?: string
  phone?: string
  photoUrl?: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  pk: string // userId (Cognito sub)
  sk: "PROFILE"
  skills?: string // JSON
  workHistory?: string // JSON
  desiredConditions?: string // JSON
  selfPr?: string
  question1Answer?: string
  question2Answer?: string
  question3Answer?: string
  createdAt: string
  updatedAt: string
}

/**
 * ユーザー取得
 */
export async function getUser(userId: string): Promise<User | null> {
  const result = await dynamodb.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { pk: userId, sk: "USER" },
    })
  )

  return result.Item as User | null
}

/**
 * ユーザー作成
 */
export async function createUser(
  data: Omit<User, "sk" | "createdAt" | "updatedAt">
): Promise<User> {
  const now = new Date().toISOString()
  const user: User = {
    ...data,
    sk: "USER",
    createdAt: now,
    updatedAt: now,
  }

  await dynamodb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: user,
    })
  )

  return user
}

/**
 * ユーザー更新
 */
export async function updateUser(
  userId: string,
  data: Partial<Omit<User, "pk" | "sk" | "createdAt" | "updatedAt">>
): Promise<User> {
  const updateExpressions: string[] = []
  const expressionAttributeNames: Record<string, string> = {}
  const expressionAttributeValues: Record<string, any> = {}

  // 更新する属性を動的に構築
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      updateExpressions.push(`#${key} = :${key}`)
      expressionAttributeNames[`#${key}`] = key
      expressionAttributeValues[`:${key}`] = value
    }
  })

  // updatedAt を追加
  updateExpressions.push("#updatedAt = :updatedAt")
  expressionAttributeNames["#updatedAt"] = "updatedAt"
  expressionAttributeValues[":updatedAt"] = new Date().toISOString()

  const result = await dynamodb.send(
    new UpdateCommand({
      TableName: TABLE_NAME,
      Key: { pk: userId, sk: "USER" },
      UpdateExpression: `SET ${updateExpressions.join(", ")}`,
      ExpressionAttributeNames: expressionAttributeNames,
      ExpressionAttributeValues: expressionAttributeValues,
      ReturnValues: "ALL_NEW",
    })
  )

  return result.Attributes as User
}

/**
 * プロフィール取得
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const result = await dynamodb.send(
    new GetCommand({
      TableName: TABLE_NAME,
      Key: { pk: userId, sk: "PROFILE" },
    })
  )

  return result.Item as UserProfile | null
}

/**
 * プロフィール作成または更新
 */
export async function upsertUserProfile(
  userId: string,
  data: Partial<Omit<UserProfile, "pk" | "sk" | "createdAt" | "updatedAt">>
): Promise<UserProfile> {
  const existing = await getUserProfile(userId)
  const now = new Date().toISOString()

  const profile: UserProfile = {
    pk: userId,
    sk: "PROFILE",
    ...existing,
    ...data,
    createdAt: existing?.createdAt || now,
    updatedAt: now,
  }

  await dynamodb.send(
    new PutCommand({
      TableName: TABLE_NAME,
      Item: profile,
    })
  )

  return profile
}

/**
 * メールアドレスでユーザー検索（GSI必要）
 * 注: 現在のスキーマにはGSIがないため、Scanを使用（本番環境では非推奨）
 */
export async function getUserByEmail(email: string): Promise<User | null> {
  // 開発用：全ユーザーをスキャン（本番ではGSIを使用すべき）
  const result = await dynamodb.send(
    new QueryCommand({
      TableName: TABLE_NAME,
      FilterExpression: "email = :email AND sk = :sk",
      ExpressionAttributeValues: {
        ":email": email,
        ":sk": "USER",
      },
    })
  )

  return result.Items?.[0] as User | null
}

/**
 * ユーザーとプロフィールを一括取得
 */
export async function getUserWithProfile(userId: string) {
  const [user, profile] = await Promise.all([getUser(userId), getUserProfile(userId)])

  return {
    user,
    profile,
  }
}
