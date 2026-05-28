/**
 * 認証機能テストスクリプト
 * 
 * テストユーザーを作成し、パスワードハッシュ化と検証が正しく動作することを確認
 * 実行: pnpm tsx scripts/test-auth.ts
 */

import 'dotenv/config'
import { hash, compare } from 'bcryptjs'
import prisma from '../lib/db'

async function main() {
  console.log('🔐 認証機能テスト開始...\n')

  const testEmail = 'test@example.com'
  const testPassword = 'password123'
  const testName = 'テストユーザー'

  try {
    // 既存のテストユーザーを削除
    const existingUser = await prisma.user.findUnique({
      where: { email: testEmail }
    })

    if (existingUser) {
      await prisma.user.delete({
        where: { email: testEmail }
      })
      console.log('✅ 既存のテストユーザーを削除しました\n')
    }

    // パスワードハッシュ化テスト
    console.log('🔒 パスワードハッシュ化テスト...')
    const passwordHash = await hash(testPassword, 10)
    console.log(`   元のパスワード: ${testPassword}`)
    console.log(`   ハッシュ化: ${passwordHash}\n`)

    // ユーザー作成テスト
    console.log('👤 ユーザー作成テスト...')
    const newUser = await prisma.user.create({
      data: {
        email: testEmail,
        passwordHash,
        name: testName,
      }
    })
    console.log(`   ✅ ユーザー作成成功`)
    console.log(`   ID: ${newUser.id}`)
    console.log(`   Email: ${newUser.email}`)
    console.log(`   Name: ${newUser.name}\n`)

    // パスワード検証テスト（正しいパスワード）
    console.log('🔍 パスワード検証テスト（正しいパスワード）...')
    const isValid = await compare(testPassword, passwordHash)
    console.log(`   結果: ${isValid ? '✅ 成功' : '❌ 失敗'}\n`)

    // パスワード検証テスト（間違ったパスワード）
    console.log('🔍 パスワード検証テスト（間違ったパスワード）...')
    const isInvalid = await compare('wrongpassword', passwordHash)
    console.log(`   結果: ${!isInvalid ? '✅ 正しく拒否された' : '❌ 失敗（間違ったパスワードが通った）'}\n`)

    // ユーザー取得テスト
    console.log('📊 ユーザー取得テスト...')
    const fetchedUser = await prisma.user.findUnique({
      where: { email: testEmail },
      select: {
        id: true,
        email: true,
        name: true,
        passwordHash: true,
        createdAt: true,
      }
    })

    if (fetchedUser) {
      console.log('   ✅ ユーザー取得成功')
      console.log(`   ID: ${fetchedUser.id}`)
      console.log(`   Email: ${fetchedUser.email}`)
      console.log(`   Name: ${fetchedUser.name}`)
      console.log(`   作成日時: ${fetchedUser.createdAt.toISOString()}\n`)
    } else {
      console.log('   ❌ ユーザー取得失敗\n')
    }

    console.log('✅ すべてのテスト成功！')
    console.log('\n📝 次のステップ:')
    console.log('   1. 開発サーバーを起動: pnpm dev')
    console.log('   2. /api/auth/signin にアクセスしてログインテスト')
    console.log(`   3. テストユーザーでログイン: ${testEmail} / ${testPassword}`)

  } catch (error) {
    console.error('❌ エラー発生:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

main()
