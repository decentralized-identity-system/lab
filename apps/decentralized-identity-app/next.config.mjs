import './env.mjs'
import withPWA from 'next-pwa'

const configuredPWA = withPWA({
  dest: '/public',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['avatars.githubusercontent.com', 'images.unsplash.com', 'cloudflare-ipfs.com', 'cdn.stamp.fyi'],
  },
  env: {
    mode: process.env.NODE_ENV,
  },
  experimental: {
    appDir: true,
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }) => {
    config.resolve.fallback = { fs: false, net: false, tls: false }
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: /icon/,
      use: ['@svgr/webpack'],
    })
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      resourceQuery: { not: [/icon/] },
      loader: 'next-image-loader',
      options: { assetPrefix: '' },
    })
    return config
  },
}

export default nextConfig
// export default configuredPWA(nextConfig)
