/**
 * Prisma 接続テストスクリプト
 * 実行: pnpm tsx prisma/test-connection.ts
 */

import prisma from '../lib/db'

async function main() {
  console.log('🔍 Prisma 接続テスト開始...\n')

  try {
    // データベース接続確認
    await prisma.$connect()
    console.log('✅ データベース接続成功\n')

    // ユーザー数をカウント
    const userCount = await prisma.user.count()
    console.log(`📊 現在のユーザー数: ${userCount}\n`)

    // テストユーザー作成（既に存在する場合はスキップ）
    const testEmail = 'test@example.com'
    
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail }
    })

    if (existingUser) {
      console.log(`ℹ️  テストユーザー既に存在: ${testEmail}`)
      console.log(`   ID: ${existingUser.id}`)
      console.log(`   名前: ${existingUser.name || '(未設定)'}`)
    } else {
      const newUser = await prisma.user.create({
        data: {
          email: testEmail,
          passwordHash: 'hashed_password_dummy', // 実際はbcryptでハッシュ化
          name: 'テストユーザー',
        }
      })
      console.log(`✅ テストユーザー作成成功: ${newUser.email}`)
      console.log(`   ID: ${newUser.id}`)
    }

    console.log('\n✅ すべてのテスト成功！')
  } catch (error) {
    console.error('❌ エラー発生:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
