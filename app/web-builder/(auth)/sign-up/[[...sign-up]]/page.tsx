import { SignUp } from '@clerk/nextjs'

export default async function SignUpPage() {
  return <SignUp fallbackRedirectUrl={`/web-builder/project`} />
  // return <AuthClient authType='sign-up' />
}
