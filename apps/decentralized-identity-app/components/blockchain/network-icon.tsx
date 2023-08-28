import * as React from 'react'

import classNames from 'clsx'
import Image from 'next/image'

import { NetworkIconImages } from '@/data/network-icon-images'

type Props = React.HTMLAttributes<HTMLElement> & {
  chainId: number
  width?: number
  height?: number
}

export const NetworkIcon = ({ chainId, className, width = 24, height = 24 }: Props) => {
  const classes = classNames(className, 'Component')
  return <Image alt={`Network ${chainId}`} className={classes} height={height} src={NetworkIconImages[chainId || 1]} width={width} />
}
