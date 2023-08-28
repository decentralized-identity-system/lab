'use client'

import { HTMLAttributes } from 'react'

import { cn } from '@/lib/utils'
import { LinkComponent } from '@/components/shared/link-component'
import { QRCodeReader } from '@/components/qr-code-reader'
import { QRCodeDisplay } from '@/components/qr-code-display'
import { dashboardLinks } from '@/config/dashboard-links'
import { IsDesktop } from '@/components/shared/is-desktop'

export function Footer({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <footer className={cn(className, 'bg-neutral-200 px-4 py-4 grid grid-cols-3 items-center')} {...props}>
      <div className="flex col-span-1 items-center gap-x-4">
        <div className="p-2 rounded-md hover:bg-neutral-100">
          <QRCodeDisplay iconSize={24} />
        </div>
        <LinkComponent className="uppercase" href="/dashboard">
          Account
        </LinkComponent>
      </div>
      <div className="flex col-span-1 justify-center gap-x-8">
        <IsDesktop>
          {dashboardLinks.map(({ title, href }) => (
            <LinkComponent key={title} className="text-black hover:text-black/60 underline-offset-4 hover:underline transition uppercase" href={href}>
              {title}
            </LinkComponent>
          ))}
        </IsDesktop>
      </div>
      <div className="col-span-1 self-end flex justify-end">
        <QRCodeReader classNameTrigger="p-2 rounded-md hover:bg-neutral-100" />
      </div>
    </footer>
  )
}
