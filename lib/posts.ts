import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {serialize} from 'next-mdx-remote/serialize'

const postsDirectory = path.join(process.cwd(), 'posts')

export type Tag =
  | 'React'
  | 'Recoil'
  | 'Next'
  | 'Javascript'
  | 'Typescript'
  | 'Java'
  | 'Etc'

export interface PostData {
  id: string
  title: string
  date: string
  tag: Tag
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
  // const mdExist = fs.existsSync(fullMdPath)

  const fileContents = fs.readFileSync(fullMdPath, 'utf8')
  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents)
  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  // .use(html)
  // .process(matterResult.content)
  // const processedContent = await unified()
  //   .use(remarkParse)
  //   .use(remarkGfm)
  //   .use(remarkRehype, {allowDangerousHtml: true})
  //   .use(rehypeStringify)
  //   .process(matterResult.content)

  // const contentHtml = processedContent.toString()

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml: matterResult.content.toString(),
    ...matterResult.data
  }
  // const fullMdxPath = path.join(postsDirectory, `${id}.mdx`)
  // const fileContents = fs.readFileSync(fullMdxPath, 'utf8')

  // // Use gray-matter to parse the post metadata section
  // const matterResult = matter(fileContents)

  // const mdxSource = await serialize(matterResult.content)

  // return {
  //   id,
  //   mdxSource,
  //   ...matterResult.data
  // }
}
