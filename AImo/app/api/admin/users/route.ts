import { NextResponse } from "next/server"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-northeast-1",
})
const dynamodb = DynamoDBDocumentClient.from(client)
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "WebAppTable-dev"

export async function GET() {
  try {
    const result = await dynamodb.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression: "sk = :sk",
        ExpressionAttributeValues: { ":sk": "USER" },
      })
    )

    const users = (result.Items || []).sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )

    return NextResponse.json({ users, count: users.length })
  } catch (error: any) {
    console.error("Admin users fetch error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
