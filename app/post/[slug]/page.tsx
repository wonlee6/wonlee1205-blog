import { Metadata } from 'next'
import { getAllPostIds, getPostData, getSortedPostsData } from '@/lib/posts'
import PostingGuide from '../../../components/post/postingGuide'
// import Utterance from '@/components/post/utterance'

export type Post = {
  date: string
  id: string
  tag: string[]
  title: string
  contentHtml: string
  description: string
}

export async function generateMetadata({
  params
}: {
  params: { slug: string }
}): Promise<Metadata> {
  const postData = (await getPostData(params.slug)) as Post

  return {
    title: postData.title,
    description: postData.description,
    authors: [{ name: 'sang won', url: `https://wonlee1205-blog.vercel.app/post/${params.slug}` }],
    creator: 'sang won',
    keywords: postData.tag,
    openGraph: {
      type: 'article',
      countryName: 'South Korea',
      locale: 'ko',
      description: postData.description,
      title: postData.title,
      url: `https://wonlee1205-blog.vercel.app/post/${params.slug}`
    },
    metadataBase: new URL(`https://wonlee1205-blog.vercel.app/post/${params.slug}`)
  }
}

export async function generateStaticParams() {
  const paths = getAllPostIds()
  return paths.map((post) => ({ slug: post.params.id }))
}

export default async function PostPage({
  params
}: {
  params: { slug: string }
}): Promise<JSX.Element> {
  const postData = (await getPostData(params.slug)) as Post
  const allPostsData = await getSortedPostsData()

  return (
    <>
      <div className='flex flex-col justify-between p-4'>
        {postData.contentHtml && (
          <div className='prose mb-4 w-full dark:prose-invert'>
            <article dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
          </div>
        )}
        {/* <Utterance /> */}
        <PostingGuide allPostsData={allPostsData} postData={postData} />
      </div>
    </>
  )
}
