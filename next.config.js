/** @type {import('next').NextConfig} */


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
  webpack: (config, options) => {
    config.module.noParse = [require.resolve('typescript/lib/typescript.js')]
    return config
  },
  // generateBuildId: async () => {
  //   return nextBuildId
  // },
  images: {
    domains: ['ddragon.leagueoflegends.com']
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
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

module.exports = nextConfig
