import AuthClient from '@/components/auth'
import { verifySession } from '@/lib/session'

export default async function SignInPage() {
  await verifySession()

  return <AuthClient authType='sign-in' />
}
