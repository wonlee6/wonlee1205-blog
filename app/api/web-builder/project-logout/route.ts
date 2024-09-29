import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { deleteSession } from '@/lib/session'

export async function POST(request: Request) {
  await deleteSession()
  revalidatePath('/web-builder')
  redirect('/web-builder/sign-in')
}
