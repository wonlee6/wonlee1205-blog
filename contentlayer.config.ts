import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import Slugger from 'github-slugger'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { toString } from 'mdast-util-to-string'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { type Options, rehypePrettyCode } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { visit } from 'unist-util-visit'

const options: Options = {
  theme: 'catppuccin-latte'
}

export const Post = defineDocumentType(() => ({
  name: 'Post',
  contentType: 'mdx',
  filePathPattern: `**/*.mdx`,
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    description: { type: 'string', required: true },
    readTime: { type: 'number' },
    coverImage: { type: 'string' },
    tags: { type: 'list', of: { type: 'string' }, required: true }
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (post) => `/post/${post._raw.flattenedPath}`
    },
    slug: {
      type: 'string',
      resolve: (post) => post._raw.flattenedPath
    },
    headings: {
      type: 'list',
      resolve: (doc) => {
        const slugger = new Slugger()
        const tree = fromMarkdown(doc.body.raw)
        const headings: { level: number; text: string; id: string }[] = []

        visit(tree, 'heading', (node: any) => {
          const text = toString(node)
          const id = slugger.slug(text)
          headings.push({ level: node.depth, text, id })
        })

        return headings
      }
    }
  }
}))

export default makeSource({
  contentDirPath: 'posts',
  documentTypes: [Post],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypeAutolinkHeadings, { behavior: 'wrap' }],
      [rehypePrettyCode, options]
    ]
  }
})
