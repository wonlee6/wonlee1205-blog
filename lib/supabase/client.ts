import { createBrowserClient } from '@supabase/ssr'
import { unstable_noStore as noStore } from 'next/cache'

const createFetch =
  (options: Pick<RequestInit, 'next' | 'cache'>) =>
  (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
      ...init,
      ...options
    })
  }

export function createClient() {
  noStore()
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      },
      global: {
        fetch: (url: any, options = {}) => {
          return fetch(url, { ...options, cache: 'no-store' })
        }
      }
    }
  )
}
