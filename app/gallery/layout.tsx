import './gallery.css'

export default function GalleryLayout({children}: {children: React.ReactNode}) {
  return (
    <section className='bg-zinc-950 w-full h-screen pt-10'>{children}</section>
  )
}
