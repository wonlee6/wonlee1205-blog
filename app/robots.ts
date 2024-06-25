import {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/'
    },
    sitemap: 'https://wonlee1205-blog.vercel.app/sitemap.xml',
    host: 'https://wonlee1205-blog.vercel.app'
  }
}
