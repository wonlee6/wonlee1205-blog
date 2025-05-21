import { defineDocumentType, makeSource } from 'contentlayer2/source-files'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import { type Options, rehypePrettyCode } from 'rehype-pretty-code'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

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
