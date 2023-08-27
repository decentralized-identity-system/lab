import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'District Smart Wallet',
    short_name: 'Wallet',
    theme_color: '#FFFFFF',
    background_color: '#156A18',
    start_url: '/dashboard',
    display: 'standalone',
    orientation: 'portrait',
    icons: [
      {
        src: '/icons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
