'use client'

import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import { footerLinks } from '@/config/site'
import { LinkComponent } from '@/components/shared/link-component'

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, 'bg-neutral-200 px-4 py-7 gap-x-8 flex justify-center items-center')} {...props}>
      {/* <div className="fixed bottom-6 left-6 z-10">
        <ThemeToggle />
      </div> */}
      {footerLinks.map(({ title, href }) => (
        <LinkComponent key={title} className="text-black hover:text-black/60 underline-offset-4 hover:underline transition" href={href}>
          {title}
        </LinkComponent>
      ))}
    </footer>
  )
}
