// import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'
// import createMDX from '@next/mdx'
// import remarkGfm from 'remark-gfm'
// import rehypeRaw from 'rehype-raw'
// import rehypePrettyCode from "rehype-pretty-code";

// withBundleAnalyzer({
//   enabled: process.env.ANALYZE === 'true'
// })
// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })
const nextConfig: NextConfig = {
  reactStrictMode: false,
  // experimental: {
  //   dynamicIO: true
  // },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
  // experimental: {
  // optimizePackageImports: ['@nextui-org'],
  // turbo: {
  //   rules: {
  //     '*.md': [
  //       {
  //         loader: '@mdx-js/loader',
  //         options: {
  //           format: 'md',
  //         },
  //       },
  //     ]
  //   }
  // }
  // },
  // webpack: (config, options) => {
  //   config.module.noParse = [require.resolve('typescript/lib/typescript.js')]
  //   return config
  // },
  // generateBuildId: async () => {
  //   return nextBuildId
  // },
  // images: {
  //   domains: ['ddragon.leagueoflegends.com']
  // remotePatterns: [
  //   {
  //     protocol: 'http',
  //     hostname: 'ddragon.leagueoflegends.com',
  //     port: '',
  //     pathname: '/lol/**',
  //   },
  //   {
  //     protocol: 'https',
  //     hostname: 'ddragon.leagueoflegends.com',
  //     port: '',
  //     pathname: '/lol/**',
  //   }
  // ],
  // },

  // async redirects() {
  //   return [
  //     {
  //       source: '/web-builder/project/:slug',
  //       destination: '/web-builder/sign-in',
  //       permanent: true
  //     },
  //     {
  //       source: '/web-builder/project/:slug',
  //       destination: '/web-builder/sign-up',
  //       permanent: true
  //     }
  //   ]
  // }
  // pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
}

// const withMDX = createMDX({
//   // Add markdown plugins here, as desired
//   options: {
//     remarkPlugins: [],
//     rehypePlugins: [rehypePrettyCode]
//   }
// })

// export default withBundleAnalyzer(nextConfig);
// export default withMDX(nextConfig)
export default nextConfig
