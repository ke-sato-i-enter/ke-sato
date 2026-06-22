import {
  signIn as amplifySignIn,
  signOut as amplifySignOut,
  signUp as amplifySignUp,
  confirmResetPassword,
  confirmSignUp,
  fetchAuthSession,
  getCurrentUser,
  resendSignUpCode,
  resetPassword,
  updatePassword,
} from "aws-amplify/auth"

/**
 * ユーザー登録
 */
export async function signUp(email: string, password: string, name: string) {
  try {
    const { userId, nextStep } = await amplifySignUp({
      username: email,
      password,
      options: {
        userAttributes: {
          email,
          name,
        },
      },
    })

    return { userId, nextStep, error: null }
  } catch (error: any) {
    if (error.name === "UsernameExistsException") {
      return { userId: null, nextStep: null, error: "このメールアドレスは既に登録されています" }
    }
    console.error("Sign up error:", error)
    return { userId: null, nextStep: null, error: error.message }
  }
}

/**
 * 確認コード検証
 */
export async function confirmSignUpCode(email: string, code: string) {
  try {
    const { nextStep } = await confirmSignUp({
      username: email,
      confirmationCode: code,
    })

    return { success: true, nextStep, error: null }
  } catch (error: any) {
    console.error("Confirm sign up error:", error)
    return { success: false, nextStep: null, error: error.message }
  }
}

/**
 * 確認コード再送信
 */
export async function resendConfirmationCode(email: string) {
  try {
    await resendSignUpCode({ username: email })
    return { success: true, error: null }
  } catch (error: any) {
    console.error("Resend code error:", error)
    return { success: false, error: error.message }
  }
}

/**
 * ログイン
 */
export async function signIn(email: string, password: string) {
  try {
    const { isSignedIn, nextStep } = await amplifySignIn({
      username: email,
      password,
    })

    return { isSignedIn, nextStep, error: null }
  } catch (error: any) {
    if (error.name === "UserAlreadyAuthenticatedException") {
      await amplifySignOut()
      try {
        const { isSignedIn, nextStep } = await amplifySignIn({ username: email, password })
        return { isSignedIn, nextStep, error: null }
      } catch (retryError: any) {
        return { isSignedIn: false, nextStep: null, error: retryError.message }
      }
    }
    console.error("Sign in error:", error)
    return { isSignedIn: false, nextStep: null, error: error.message }
  }
}

/**
 * ログアウト
 */
export async function signOut() {
  try {
    await amplifySignOut()
    return { success: true, error: null }
  } catch (error: any) {
    console.error("Sign out error:", error)
    return { success: false, error: error.message }
  }
}

/**
 * 現在のユーザー取得
 */
export async function getAuthenticatedUser() {
  try {
    const user = await getCurrentUser()
    return { user, error: null }
  } catch (error: any) {
    return { user: null, error: error.message }
  }
}

/**
 * 認証セッション取得（トークン含む）
 */
export async function getAuthSession() {
  try {
    const session = await fetchAuthSession()
    return {
      tokens: session.tokens,
      credentials: session.credentials,
      error: null,
    }
  } catch (error: any) {
    return { tokens: null, credentials: null, error: error.message }
  }
}

/**
 * パスワードリセット開始
 */
export async function initiatePasswordReset(email: string) {
  try {
    const { nextStep } = await resetPassword({ username: email })
    return { success: true, nextStep, error: null }
  } catch (error: any) {
    console.error("Reset password error:", error)
    return { success: false, nextStep: null, error: error.message }
  }
}

/**
 * パスワードリセット完了
 */
export async function completePasswordReset(email: string, code: string, newPassword: string) {
  try {
    await confirmResetPassword({
      username: email,
      confirmationCode: code,
      newPassword,
    })
    return { success: true, error: null }
  } catch (error: any) {
    console.error("Confirm reset password error:", error)
    return { success: false, error: error.message }
  }
}

/**
 * パスワード変更（ログイン中）
 */
export async function changePassword(oldPassword: string, newPassword: string) {
  try {
    await updatePassword({ oldPassword, newPassword })
    return { success: true, error: null }
  } catch (error: any) {
    console.error("Change password error:", error)
    return { success: false, error: error.message }
  }
}

/**
 * 認証状態確認
 */
export async function checkAuthStatus() {
  try {
    const user = await getCurrentUser()
    const session = await fetchAuthSession()
    return {
      isAuthenticated: true,
      user,
      tokens: session.tokens,
      error: null,
    }
  } catch (error) {
    return {
      isAuthenticated: false,
      user: null,
      tokens: null,
      error: null,
    }
  }
}
