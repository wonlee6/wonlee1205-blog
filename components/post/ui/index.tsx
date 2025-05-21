import type { MDXComponents } from 'mdx/types'
import Image, { type ImageProps } from 'next/image'
import { PropsWithChildren } from 'react'

import Alert from './alert'

const components: MDXComponents = {
  h1: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1 {...props} className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl'>
      {props.children}
    </h1>
  ),
  h2: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      {...props}
      className='scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0'>
      {props.children}
    </h2>
  ),
  h3: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 {...props} className='scroll-m-20 text-2xl font-semibold tracking-tight'>
      {props.children}
    </h3>
  ),
  h4: (props: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h4 {...props} className='scroll-m-20 text-xl font-semibold tracking-tight'>
      {props.children}
    </h4>
  ),
  p: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className='leading-7 [&:not(:first-child)]:mt-6'>
      {props.children}
    </p>
  ),
  blockquote: (props: React.BlockquoteHTMLAttributes<HTMLQuoteElement>) => (
    <blockquote {...props} className='mb-4 mt-6 border-l-2 pl-6 italic'>
      {props.children}
    </blockquote>
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => {
    if (props.style) {
      return (
        <code
          {...props}
          className='bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
          {props.children}
        </code>
      )
    }
    return (
      <code
        {...props}
        className='rounded bg-neutral-200/50 px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
        {props.children}
      </code>
    )
  },
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isInternalLink = props.href?.startsWith('#')
    return (
      <a
        href={props.href}
        className={
          isInternalLink
            ? 'font-semibold text-neutral-900 hover:underline dark:text-neutral-300'
            : 'font-semibold text-sky-500 hover:text-sky-400 hover:underline dark:text-sky-300'
        }
        target={isInternalLink ? '_self' : '_blank'}
        rel='noopener noreferrer'>
        {props.children}
      </a>
    )
  },
  ul: (props: React.HTMLAttributes<HTMLUListElement>) => (
    <ul {...props} className='my-6 ml-6 list-disc [&>li]:mt-2'>
      {props.children}
    </ul>
  ),
  ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => (
    <ol {...props} className='my-6 ml-6 list-decimal [&>li]:mt-2'>
      {props.children}
    </ol>
  ),
  li: (props: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li {...props} className='my-1'>
      {props.children}
    </li>
  ),
  pre: (props: PropsWithChildren) => {
    return (
      <pre {...props} className='my-4 overflow-x-auto rounded-lg p-4 shadow-lg'>
        {props.children}
      </pre>
    )
  },
  small: (props: React.HTMLAttributes<HTMLElement>) => (
    <small {...props} className='text-sm font-medium leading-none'>
      {props.children}
    </small>
  ),
  large: (props: React.HTMLAttributes<HTMLDivElement>) => (
    <div {...props} className='text-lg font-semibold'>
      {props.children}
    </div>
  ),
  muted: (props: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p {...props} className='text-muted-foreground text-sm'>
      {props.children}
    </p>
  ),
  img: (props) => {
    const { src, alt, width, height } = props as ImageProps
    return (
      <Image
        src={src}
        alt={alt}
        loading='lazy'
        objectFit='cover'
        width={width || 1000}
        height={height || 500}
        style={{ width: '100%', height: 'auto' }}
      />
    )
  },
  table: (props: React.HTMLAttributes<HTMLTableElement>) => (
    <div className='my-6 w-full overflow-y-auto'>
      <table className='w-full'>{props.children}</table>
    </div>
  ),
  thead: (props: React.HTMLAttributes<HTMLTableSectionElement>) => <thead>{props.children}</thead>,
  th: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className='border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right'>
      {props.children}
    </th>
  ),
  tr: (props: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className='m-0 border-t p-0 even:bg-default-100'>{props.children}</tr>
  ),
  td: (props: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className='border px-4 py-2 text-left text-sm [&[align=center]]:text-center [&[align=right]]:text-right'>
      {props.children}
    </td>
  ),
  Alert
}

export default components
