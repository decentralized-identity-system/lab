import * as React from 'react'

import classNames from 'clsx'
import { Chain } from 'viem'
import { useNetwork } from 'wagmi'

import { NetworkIcon } from './network-icon'

const useSelectNetwork = ({ chainId, chains }: { chainId?: number; chains?: Chain[] }): Chain | undefined => {
  return React.useMemo(() => {
    if (!chainId) return undefined
    if (!chains) return undefined
    const chainFiltered = chains.filter((chain: { id: number }) => chain.id === chainId)[0]
    if (!chainFiltered) return undefined
    return chainFiltered
  }, [chains, chainId])
}

type Props = React.HTMLAttributes<HTMLElement> & {
  chainId: number
  width?: number
  height?: number
  displayIcon?: boolean
}

export const NetworkDetails = ({ chainId, className, displayIcon = false, width = 24, height = 24 }: Props) => {
  const classes = classNames(className)
  const { chains } = useNetwork()

  const chain = useSelectNetwork({ chainId, chains })

  return (
    <span className={classes}>
      {displayIcon && <NetworkIcon chainId={chainId} className="mr-1" height={height} width={width} />}
      <span className="font-semibold">{chain?.name}</span>
      <span className="">({chain?.id})</span>
    </span>
  )
}
