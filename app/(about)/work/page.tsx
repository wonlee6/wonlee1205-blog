import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import WorkIndex from '@/components/work'
import { createClient } from '@/lib/supabase/server'

export default async function AboutPage() {
  const { data, error, publicUrl } = await getImageList()

  if (error) {
    return redirect('/')
  }

  const dataList = data?.map((i) => i.name) || []

  return <WorkIndex data={dataList || []} publicUrl={publicUrl} />
}

const getImageList = async () => {
  const supabase = await createClient()
  const url = supabase.storage.from('images').getPublicUrl('work')

  const { data, error } = await supabase.storage
    .from('images')
    .list('work', { sortBy: { column: 'name', order: 'asc' } })

  return {
    data,
    error,
    publicUrl: url.data.publicUrl
  }
}
