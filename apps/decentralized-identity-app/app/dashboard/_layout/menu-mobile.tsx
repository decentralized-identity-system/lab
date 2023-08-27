'use client'
import { LuMenu } from 'react-icons/lu'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

import { LinkComponent } from '../../../components/shared/link-component'
import { dashboardLinks } from '@/config/dashboard-links'

export function MenuMobile() {
  return (
    <Popover>
      <PopoverTrigger>
        <button>
          <LuMenu size={24} />
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="w-full flex flex-col gap-y-6 rounded-md p-2 ">
          {dashboardLinks.map(({ title, href }) => (
            <LinkComponent key={title} className="text-black hover:text-black/60 underline-offset-4 hover:underline transition uppercase" href={href}>
              {title}
            </LinkComponent>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  )
}
