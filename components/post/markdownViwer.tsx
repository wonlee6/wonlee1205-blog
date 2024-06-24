'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {vscDarkPlus} from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {cn} from '@/lib/utils'

export default function MarkdownView({contentHtml}: {contentHtml: string}): JSX.Element {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code(props) {
          const {children, className, node, ref, style, ...rest} = props
          const match = /language-(\w+)/.exec(className || '')
          return match ? (
            <SyntaxHighlighter
              {...rest}
              PreTag='div'
              children={String(children).replace(/\n$/, '')}
              language={match[1]}
              style={vscDarkPlus as any}
            />
          ) : (
            <code {...rest} className={cn(className, 'font-light text-default-500')}>
              {children}
            </code>
          )
        },
        // 인용문 (>)
        blockquote({children, className, ...props}) {
          return (
            <blockquote
              {...props}
              className={cn(className, 'rounded-lg bg-default-100 p-1 text-default-600')}>
              {children}
            </blockquote>
          )
        },
        em({children, ...props}) {
          return (
            <span style={{fontStyle: 'italic', color: 'red', border: '1px solid red'}} {...props}>
              {children}
            </span>
          )
        },
        pre({children, className, ...rest}) {
          return (
            <pre {...rest} className={cn(className, 'm-0')}>
              {children}
            </pre>
          )
        }
      }}>
      {contentHtml
        .toString()
        .replace(/\n\s\n\s/gi, '\n\n&nbsp;\n\n')
        .replace(/\*\*/gi, '@$_%!^')
        .replace(/@\$_%!\^/gi, '**')
        .replace(/<\/?u>/gi, '*')}
    </ReactMarkdown>
  )
}
