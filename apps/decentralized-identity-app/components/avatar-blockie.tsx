import * as React from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'

type AvatarBlockie = React.HTMLAttributes<HTMLElement> & {
  address?: string | `0x${string}`
  styled?: boolean
  width?: number
  height?: number
}

export const AvatarBlockie = ({ address, className, styled, width = 32, height = 32 }: AvatarBlockie) => {
  const classes = cn(
    {
      'rounded-sm border-2 shadow-md border-opacity-50  border-white': styled,
    },
    className
  )

  return (
    <Image
      quality={100}
      className={classes}
      alt="Smart wallet avatar"
      src={`https://cdn.stamp.fyi/avatar/${address}?w=100&h=100`}
      width={width}
      height={height}
    />
  )
}
