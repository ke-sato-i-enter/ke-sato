import { NextRequest, NextResponse } from "next/server"
import { DynamoDBClient } from "@aws-sdk/client-dynamodb"
import { DynamoDBDocumentClient, ScanCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb"

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "ap-northeast-1",
})
const dynamodb = DynamoDBDocumentClient.from(client)
const TABLE_NAME = process.env.DYNAMODB_TABLE_NAME || "WebAppTable-dev"

export async function GET() {
  try {
    const result = await dynamodb.send(new ScanCommand({ TableName: TABLE_NAME }))

    const items = result.Items || []
    const users = items.filter((i) => i.sk === "USER")
    const profileMap = items
      .filter((i) => i.sk === "PROFILE")
      .reduce((acc: Record<string, any>, p) => { acc[p.pk] = p; return acc }, {})

    const applicants = users
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .map((item) => {
        const profile = profileMap[item.pk] ?? null
        return {
          id: item.pk,
          name: item.name ?? "未設定",
          email: item.email,
          age: item.birthDate ? calcAge(item.birthDate) : null,
          gender: item.gender ?? null,
          phone: item.phone ?? null,
          address: item.address ?? null,
          appliedDate: item.createdAt.slice(0, 10),
          lastContact: item.updatedAt.slice(0, 10),
          status: item.applicantStatus ?? "applied",
          question1Answer: profile?.question1Answer ?? null,
          question2Answer: profile?.question2Answer ?? null,
          question3Answer: profile?.question3Answer ?? null,
        }
      })

    return NextResponse.json({ applicants })
  } catch (error: any) {
    console.error("Admin applicants fetch error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, status } = await request.json()

    if (!id || !status) {
      return NextResponse.json({ error: "id と status は必須です" }, { status: 400 })
    }

    await dynamodb.send(
      new UpdateCommand({
        TableName: TABLE_NAME,
        Key: { pk: id, sk: "USER" },
        UpdateExpression: "SET applicantStatus = :status, updatedAt = :updatedAt",
        ExpressionAttributeValues: {
          ":status": status,
          ":updatedAt": new Date().toISOString(),
        },
      })
    )

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Admin applicant status update error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

function calcAge(birthDate: string): number {
  const birth = new Date(birthDate)
  const today = new Date()
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--
  return age
}
