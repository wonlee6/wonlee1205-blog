export default function LoLLayout({children}: {children: React.ReactNode}) {
  return (
    <section className='h-full bg-lol-bg bg-repeat-round bg-cover'>
      {children}
    </section>
  )
}
