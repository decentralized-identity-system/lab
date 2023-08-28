'use client'

import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import { legalLinks } from '@/config/site'
import { LinkComponent } from '@/components/shared/link-component'

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, 'px-4 py-7 gap-x-8 flex justify-center items-center')} {...props}>
      {legalLinks.map(({ title, href }) => (
        <LinkComponent key={title} className="text-black hover:text-black/60 underline-offset-4 hover:underline transition" href={href}>
          {title}
        </LinkComponent>
      ))}
    </footer>
  )
}
