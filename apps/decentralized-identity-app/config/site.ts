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
  name: 'TurboETH',
  title: 'TurboETH - Web3 App Template',
  emoji: '⚡',
  description: 'Web3 App Template built using Next.js, RainbowKit, SIWE, Disco, and more!',
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

export const footerLinks = [
  {
    title: 'Wallet',
    href: '/dashboard',
  },
  {
    title: 'Guardians',
    href: '/dashboard/guardians',
  },
  {
    title: 'Credentials',
    href: '/dashboard/credentials',
  },
]
