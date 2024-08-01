'use client'

import {MDXComponents} from 'mdx/types'
import Pre from 'pliny/ui/Pre.js'

export const MdxComponents: MDXComponents = {
  pre: ({children}) => <Pre>{children}</Pre>
}

export default function MdxLayout({children}: {children: React.ReactNode}) {
  // Create any shared layout or styles here
  return (
    <article className='prose prose-sky mb-4 w-full dark:prose-invert prose-headings:underline dark:prose-blockquote:text-black'>
      {children}
    </article>
  )
}
