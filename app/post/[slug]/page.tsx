import {Metadata} from 'next'
import {getAllPostIds, getPostData} from '@/lib/posts'
// import Utterance from './utterance'
import MarkdownViwer from '../../../components/post/markdownViwer'
import PostingGuide from '../../../components/post/postingGuide'

export type PostData = {
  date: string
  id: string
  tag: string
  title: string
  contentHtml: string
  description: string
}

export async function generateMetadata({
  params
}: {
  params: {slug: string}
}): Promise<Metadata> {
  const postData = (await getPostData(params.slug)) as PostData
  return {
    title: postData.title,
    description: postData.description,
    authors: {name: 'Sangwon', url: 'https://wonlee1205-blog.vercel.app/'},
    creator: 'Sangwon',
    keywords: postData.tag,
    openGraph: {
      type: 'article',
      countryName: 'South Korea',
      locale: 'ko',
      description: postData.description,
      title: postData.title
    },
    metadataBase: new URL('https://wonlee1205-blog.vercel.app/')
  }
}

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((post) => ({slug: post.params.id}))
}

export default async function PostPage({
  params
}: {
  params: {slug: string}
}): Promise<JSX.Element> {
  const postData = (await getPostData(params.slug)) as PostData

  return (
    <>
      {postData.contentHtml && (
        <div className='w-full mb-4 prose 2xl:prose-lg prose-neutral prose-headings:underline dark:prose-invert dark:prose-blockquote:text-black'>
          <MarkdownViwer contentHtml={postData.contentHtml} />
        </div>
      )}
      {/* <Utterance /> */}
      <PostingGuide postData={postData} />
    </>
  )
}
