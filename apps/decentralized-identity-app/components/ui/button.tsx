import { ButtonHTMLAttributes, forwardRef } from 'react'

import { VariantProps, cva } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        disabled: 'bg-neutral-400 text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        tertiary: 'text-tertiary underline-offset-4 hover:underline',
        dark: 'text-white bg-neutral-800 hover:underline',
        action: 'bg-action text-action-foreground hover:bg-action/90',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 py-2 px-6',
        sm: 'h-9 px-4',
        lg: 'h-11 px-8 text-base',
        xl: 'h-14 px-10 text-xl font-bold',
      },
      rounded: {
        default: 'rounded-xs',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        xl: 'rounded-xl',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      rounded: 'default',
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, rounded, ...props }, ref) => {
  return <button ref={ref} className={cn(buttonVariants({ variant, size, rounded, className }))} {...props} />
})
Button.displayName = 'Button'

export { Button, buttonVariants }
