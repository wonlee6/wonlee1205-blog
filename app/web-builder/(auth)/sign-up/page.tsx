import AuthClient from '@/components/auth'
import { verifySession } from '@/lib/session'

export default async function SignUpPage() {
  await verifySession()

  return <AuthClient authType='sign-up' />
}
