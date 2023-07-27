---
title: 'ReactMarkDown'
date: '2023-04-25'
tag: 'tailwind'
description: 'ReactMarkDown 라이브러리에 Tailwindcss를 적용해보자'
---

## 1. 설치

### tailwind 설치

```
yarn add tailwindcss
yarn add -D @tailwindcss/typography
```

### ReactMarkDown 설치

```
yarn add react-markdown remark-gfm rehype-raw
```

## 2. tailwind config 설정

`tailwind.config.js`의 plugin에 `@tailwindcss/typography` 추가해주자

```
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}
```

## 3. ReactMarkDown Component

설치했던 `remarkGfm`, `rehypeRaw` 넣어주면 끝

```tsx
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'

function MarkdownView({contentHtml}: {contentHtml: string}): JSX.Element {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code({inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '')
          return inline ? (
            // 강조
            <code
              style={{
                background: 'var(--highlight-color)',
                padding: '2px'
              }}
              {...props}>
              {children}
            </code>
          ) : match ? (
            // 코드
            // 언어가 선택됨
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={vscDarkPlus as any}
              language={match[1]}
              PreTag='div'
              {...props}
            />
          ) : (
            // 언어가 선택되지 않음
            <SyntaxHighlighter
              children={String(children).replace(/\n$/, '')}
              style={vscDarkPlus as any}
              language='textile'
              PreTag='div'
              {...props}
            />
          )
        },
        // 인용문 (>)
        blockquote({children, ...props}) {
          return (
            <blockquote
              style={{
                background: '#f0f0f0',
                padding: '1px 15px',
                borderRadius: '10px'
              }}
              {...props}>
              {children}
            </blockquote>
          )
        },
        em({children, ...props}) {
          return (
            <span style={{fontStyle: 'italic'}} {...props}>
              {children}
            </span>
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
```

## 4. tailwind style 적용

```tsx
<div className='prose prose-neutral'>
  <EditerMarkdown contentHtml={postData.contentHtml} />
</div>
```

[참고](https://tailwindcss.com/docs/typography-plugin)
