import Link from 'next/link'

export default function NotFound() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-4'>
      <h1 className='text-5xl font-bold'>Not Found</h1>
      <p className='text-lg'>Could not find requested resource</p>
      <Link className='rounded-md bg-red-300 p-4 hover:bg-red-500' href='/'>
        Return Home
      </Link>
    </div>
  )
}
