// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// Site
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
interface SiteConfig {
  name: string
  title: string
  emoji: string
  description: string
  previewImg: string
  localeDefault: string
  links: {
    docs: string
    discord: string
    twitter: string
    github: string
  }
}

export const SITE_CANONICAL = 'https://turboeth.xyz'

export const siteConfig: SiteConfig = {
  name: 'Smart Wallet',
  title: 'Smart Wallet - Identity & Finance',
  emoji: '⚡',
  description: 'Smart Wallet for Web3 with Identity & Finance primitives',
  previewImg: `${SITE_CANONICAL}/preview.png`,
  localeDefault: 'en',
  links: {
    docs: 'https://docs.turboeth.xyz/overview',
    discord: 'https://discord.gg/U4jy7Xfh76',
    twitter: 'https://twitter.com/district_labs',
    github: 'https://github.com/turbo-eth',
  },
}

export const legalLinks = [
  {
    title: 'Terms of Service',
    href: 'https://districtlabs.com/legal/terms-of-service',
  },
  {
    title: 'Privacy Policy',
    href: 'https://districtlabs.com/legal/privacy-policy',
  },
]
