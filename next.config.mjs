import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import createMDX from '@next/mdx'

/** @type {import('next').NextConfig} */

// const withBundleAnalyzer = require('@next/bundle-analyzer')({
//   enabled: process.env.ANALYZE === 'true',
// })

const nextConfig = {
  reactStrictMode: true,
  experimental: {
    optimizePackageImports: ['@nextui-org', 'primereact'],
    turbo: {
      rules: {
        '*.md': [
          {
            loader: '@mdx-js/loader',
            options: {
              format: 'md',
            },
          },
        ]
      }
    }
  },
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
  logging: {
    fetches: {
      fullUrl: true
    }
  },
  pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx']
}

// const withMDX = createMDX({
//   // Add markdown plugins here, as desired
//   options: {
//     remarkPlugins: [remarkGfm],
//     rehypePlugins: [rehypeRaw],
//   }
// })

export default nextConfig;