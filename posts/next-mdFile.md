---
title: 'Md file 가져오기'
date: '2023-04-17'
tag: 'Next'
description: 'Next에서 Md file을 가져오는 방법'
---

## 1. 필요한 라이브러리 다운

```
yarn add gray-matter
```

## 2. 파일 생성

> root > lib > posts.ts 만든 후 아래와 같은 함수 생성

```ts
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const postsDirectory = path.join(process.cwd(), 'posts')

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  })
  // Sort posts by date
  return (allPostsData as PostData[]).sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}
```

`root > posts` 폴더 안의 md 파일을 가져오는 함수이다.

### 참고

- fs파일 시스템에서 파일을 읽을 수 있는 Node.js 모듈입니다.
- path파일 경로를 조작할 수 있는 Node.js 모듈입니다.
- matter각 마크다운 파일의 메타데이터를 파싱할 수 있는 라이브러리입니다.
- Next.js에서 lib폴더에는 폴더와 같이 할당된 이름이 없으므로 pages아무 이름이나 지정할 수 있습니다. lib일반적으로 또는 를 사용하는 것이 관례입니다 utils.

### root > posts 에 md 파일을 만들자

1. pre-rendering.md

```
---
title: 'Two Forms of Pre-rendering'
date: '2020-01-01'
---

Next.js has two forms of pre-rendering: **Static Generation** and **Server-side Rendering**. The difference is in **when** it generates the HTML for a page.

- **Static Generation** is the pre-rendering method that generates the HTML at **build time**. The pre-rendered HTML is then _reused_ on each request.
- **Server-side Rendering** is the pre-rendering method that generates the HTML on **each request**.

Importantly, Next.js lets you **choose** which pre-rendering form to use for each page. You can create a "hybrid" Next.js app by using Static Generation for most pages and using Server-side Rendering for others.
```

2. ssg-ssr.md

```
---
title: 'When to Use Static Generation v.s. Server-side Rendering'
date: '2020-01-02'
---

We recommend using **Static Generation** (with and without data) whenever possible because your page can be built once and served by CDN, which makes it much faster than having a server render the page on every request.

You can use Static Generation for many types of pages, including:

- Marketing pages
- Blog posts
- E-commerce product listings
- Help and documentation

You should ask yourself: "Can I pre-render this page **ahead** of a user's request?" If the answer is yes, then you should choose Static Generation.

On the other hand, Static Generation is **not** a good idea if you cannot pre-render a page ahead of a user's request. Maybe your page shows frequently updated data, and the page content changes on every request.

In that case, you can use **Server-Side Rendering**. It will be slower, but the pre-rendered page will always be up-to-date. Or you can skip pre-rendering and use client-side JavaScript to populate data.
```

## 3. getStaticProps 이용하여 불러오기

```jsx
export async function getStaticProps() {
  const allPostsData = getSortedPostsData()
  return {
    props: {
      allPostsData
    }
  }
}

// index.tsx
export default function Home({allPostsData}) {
  return (
    <Layout home>
      {/* Keep the existing code here */}

      {/* Add this <section> tag below the existing <section> tag */}
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({id, date, title}) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
}
```

- 실행하기 전에 빌드 또는 dev 환경에서 테스트 해보자

## 4. 동적으로 선택한 파일 정보 가져오기

md file 전체를 가져오는 방법은 완료하였고, 선택한 아이템에 대한 정보를 가져와보자.

다시 `lib > posts.ts` 에 가서,

```ts
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory)
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    }
  })
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Combine the data with the id
  return {
    id,
    ...matterResult.data
  }
}
```

위 함수는 getStaticPath 아래 함수는 getStaticProps에 사용

```jsx
// pages > posts > [id].tsx
export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}
export async function getStaticProps({params}) {
  const postData = getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}

export default function Post({postData}: Props) {
  return (
    <Layout>
      ...
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      ...
    </Layout>
  )
}
```

아래의 주소를 방문해보자

- http://localhost:3000/posts/ssg-ssr
- http://localhost:3000/posts/pre-rendering

## 5. 마크다운 콘텐츠 가져오기

마크다운 콘텐츠를 렌더링하기 위해 라이브러리 설치

```
yarn add remark remark-html
```

이전에 작성했던 함수 수정

```js
import {remark} from 'remark'
import html from 'remark-html'

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    ...matterResult.data
  }
}
```

> 비동기적으로 데이터 페치하기 위해 `async/await` 사용

다시 `post.tsx`

```jsx
export async function getStaticProps({params}) {
  // Add the "await" keyword like this:
  const postData = await getPostData(params.id)

  return {
    props: {
      postData
    }
  }
}

export default function Post({postData}) {
  return (
    <Layout>
      ...
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{__html: postData.contentHtml}} />
      ...
    </Layout>
  )
}
```

다시 URL에 방문하여 내용물 확인

- http://localhost:3000/posts/ssg-ssr
- http://localhost:3000/posts/pre-rendering

## 6. Link 이용하여 페이지 이동

```jsx
...
<li className={utilStyles.listItem} key={id}>
  <Link href={`/posts/${id}`}>{title}</Link>
  <br />
  <small className={utilStyles.lightText}>
    <Date dateString={date} />
  </small>
</li>
...
```

[참조](https://nextjs.org/learn/basics/data-fetching)
