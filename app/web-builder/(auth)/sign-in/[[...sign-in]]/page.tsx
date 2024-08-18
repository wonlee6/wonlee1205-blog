import { SignIn } from '@clerk/nextjs'

export default async function SignInPage() {
  return <SignIn routing='hash' fallbackRedirectUrl={`/web-builder/project`} />
  // return <AuthClient authType='sign-in' />
}
