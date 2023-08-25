'use client'

import { HTMLAttributes } from 'react'

import Image from 'next/image'

import useScroll from '@/lib/hooks/use-scroll'
import { cn } from '@/lib/utils'
import { NavigationMenuGeneral } from '@/components/layout/navigation-menu-general'
import { UserDropdown } from '@/components/layout/user-dropdown'
import { IsDarkTheme } from '@/components/shared/is-dark-theme'
import { IsDesktop } from '@/components/shared/is-desktop'
import { IsLightTheme } from '@/components/shared/is-light-theme'
import { IsMobile } from '@/components/shared/is-mobile'
import { LinkComponent } from '@/components/shared/link-component'
import { ThemeToggle } from '@/components/shared/theme-toggle'
import { WalletConnect } from '@/components/blockchain/wallet-connect'

export function Header({ className, ...props }: HTMLAttributes<HTMLElement>) {
  const scrolled = useScroll(50)
  const classes = cn(
    className,
    'fixed top-0 w-full',
    'px-6 lg:px-6 py-3 mb-8 flex items-center',
    {
      'border-b border-gray-200 bg-white/50 backdrop-blur-xl dark:bg-black/50 dark:border-gray-800': scrolled,
    },
    'z-30 transition-all'
  )
  return (
    <header className={classes} {...props}>
      <IsMobile>
        <div className="flex w-full justify-between p-4">
          <LinkComponent className="flex flex-1 items-center " href="/">
            <IsLightTheme>
              <Image alt="Logo" height={24} src="/district-logo.png" width={24} />
            </IsLightTheme>
            <IsDarkTheme>
              <Image alt="Logo" height={24} src="/district-logo.png" width={24} />
            </IsDarkTheme>
          </LinkComponent>
          <div className="">
            <UserDropdown />
          </div>
        </div>
      </IsMobile>
      <IsDesktop>
        <div className="flex justify-between w-full">
          <LinkComponent className="flex items-center" href="/">
            <IsLightTheme>
              <Image alt="Logo" height={24} src="/district-logo.png" width={24} />
            </IsLightTheme>
            <IsDarkTheme>
              <Image alt="Logo" height={24} src="/district-logo.png" width={24} />
            </IsDarkTheme>
          </LinkComponent>
          <div className="flex items-center gap-4">
            <WalletConnect />
          </div>
        </div>
      </IsDesktop>
    </header>
  )
}
