import AuthClient from '@/components/auth'
import { verifySession } from '@/lib/session'

export default async function SignInPage({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  if (searchParams && Object.keys(searchParams)[0]) {
    //
  } else {
    await verifySession()
  }

  return <AuthClient authType='sign-in' />
}
