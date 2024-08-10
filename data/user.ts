import { verifySession } from '@/lib/session'
import { createClient } from '@/lib/supabase/server'

export const getUser = async () => {
  const session = await verifySession()
}
