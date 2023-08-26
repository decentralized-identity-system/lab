import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'

import * as TooltipPrimitive from '@radix-ui/react-tooltip'

import { cn } from '@/lib/utils'

const Tooltip = ({ ...props }) => (
  <TooltipPrimitive.Provider>
    <TooltipPrimitive.Root {...props} />
  </TooltipPrimitive.Provider>
)
Tooltip.displayName = TooltipPrimitive.Tooltip.displayName

const TooltipTrigger = TooltipPrimitive.Trigger

const TooltipContent = forwardRef<ElementRef<typeof TooltipPrimitive.Content>, ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>>(
  ({ className, sideOffset = 4, ...props }, ref) => (
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'z-50 overflow-hidden rounded-md border border-neutral-100 bg-white px-3 py-1.5 text-sm text-neutral-700 shadow-md animate-in fade-in-50 data-[side=bottom]:slide-in-from-top-1 data-[side=top]:slide-in-from-bottom-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 dark:border-neutral-800 dark:bg-neutral-800 dark:text-neutral-100',
        className
      )}
      {...props}
    />
  )
)
TooltipContent.displayName = TooltipPrimitive.Content.displayName

const TooltipProvider = TooltipPrimitive.TooltipProvider

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider }
