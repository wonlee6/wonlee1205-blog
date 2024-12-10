import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'
import { rehypePrettyCode } from 'rehype-pretty-code'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

const postsDirectory = path.join(process.cwd(), 'posts')

export interface PostData {
  id: string
  title: string
  date: string
  tag: string[]
  description?: string
}

export async function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '').replace(/\.mdx$/, '')

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
        id: fileName.replace(/\.md$/, '').replace(/\.mdx$/, '')
      }
    }
  })
}
export async function getPostData(id: string) {
  const fullMdPath = path.join(postsDirectory, `${id}.md`)
  const fullMdxPath = path.join(postsDirectory, `${id}.mdx`)

  // if (fs.existsSync(fullMdPath)) {
  //   fileContents = fs.readFileSync(fullMdPath, 'utf8')
  //   matterResult = matter(fileContents)

  //   return {
  //     id,
  //     contentHtml: matterResult.content.toString(),
  //     ...matterResult.data
  //   }
  // }

  const fileContents = fs.readFileSync(fullMdPath, 'utf8')
  const matterResult = matter(fileContents)

  const processedContent = await unified()
    .use(remarkParse) // markdown 파싱
    .use(remarkGfm) // GitHub Flavored Markdown을 지원
    .use(remarkRehype, { allowDangerousHtml: true }) // Markdown을 HTML로 변환합니다.
    .use(rehypePrettyCode)
    .use(rehypeRaw) // 원시 HTML을 처리
    .use(rehypeStringify) // HTML을 문자열로 변환
    .process(matterResult.content)

  return {
    id,
    contentHtml: processedContent.toString(),
    ...matterResult.data
  }
}
