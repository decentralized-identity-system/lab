import * as React from 'react'

import classNames from 'clsx'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ERC20Balance, ERC20Image, ERC20Name, ERC20Symbol, ERC20TotalSupply } from '@/integrations/erc20/components/erc20-read'

import { NetworkDetails } from '../blockchain/network-details'
import { NetworkIcon } from '../blockchain/network-icon'

type Props = React.HTMLAttributes<HTMLElement> & {
  address: `0x${string}`
  chainId: number
  fallbackImg?: string
}

export const TokenBalanceAndIcon = ({ address, className, chainId, fallbackImg = '/icons/token-default.png' }: Props) => {
  const classes = classNames(
    className,
    'inline-flex relative items-center gap-x-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 px-3 py-2 rounded-lg'
  )
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className={classes}>
            <NetworkIcon chainId={chainId} className="absolute top-1 left-1" height={14} width={14} />
            <ERC20Image address={address} className="rounded-full h-6 w-6" fallbackImg={fallbackImg} />
            <ERC20Balance address={address} chainId={chainId} className="text-right" />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div className="flex flex-col gap-y-3 p-3">
            <span className="flex">
              <span className="font-semibold mr-1">Network:</span> <NetworkDetails chainId={chainId} height={12} width={12} />
            </span>
            <span>
              <span className="font-semibold">Address:</span> {address}
            </span>
            <span>
              <span className="font-semibold">Name:</span> <ERC20Name address={address} chainId={chainId} />{' '}
            </span>
            <span>
              <span className="font-semibold">Symbol:</span> <ERC20Symbol address={address} chainId={chainId} />{' '}
            </span>
            <span>
              <span className="font-semibold">Total Supply:</span> <ERC20TotalSupply address={address} chainId={chainId} />{' '}
            </span>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
