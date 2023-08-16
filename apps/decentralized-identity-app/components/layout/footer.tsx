'use client'

import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import { footerLinks } from '@/config/site'
import { LinkComponent } from '../shared/link-component'

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, 'px-4 py-9 gap-x-8 flex border-black justify-center items-center')} {...props}>
      {footerLinks.map(({ title, href }) => (
        <LinkComponent className="text-black hover:text-black/60 underline-offset-4 hover:underline transition" href={href}>
          {title}
        </LinkComponent>
      ))}
    </footer>
  )
}
