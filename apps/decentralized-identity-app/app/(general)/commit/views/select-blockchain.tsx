import { LinkComponent } from '@/components/shared/link-component'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { OnPageChange } from '../types'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { useNetwork, useSwitchNetwork } from 'wagmi'
import { useMemo } from 'react'

const supportedBlockchains = [
  {
    name: 'Hardhat',
    chainId: 31337,
    recommended: false,
    className: 'border-[#25292E]',
    logo: '/chains/hardhat.svg',
  },
  {
    name: 'Sepolia',
    chainId: 11155111,
    recommended: false,
    className: 'border-[#25292E]',
    logo: '/chains/ethereum.svg',
  },
  // {
  //   name: 'Base',
  //   recommended: false,
  //   chainId: 8453,
  //   className: 'border-[#6471ED]',
  //   logo: '/chains/base.svg',
  // },
  // {
  //   name: 'Optimism',
  //   chainId: 10,
  //   className: 'border-[#FF3131]',
  //   logo: '/chains/optimism.svg',
  // },
  // {
  //   name: 'Ethereum',
  //   chainId: 1,
  //   className: 'border-[#25292E]',
  //   logo: '/chains/ethereum.svg',
  // },
]

export function SelectBlockChainView({ onPageChange }: { onPageChange: OnPageChange }) {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  const isValidChain = useMemo(() => supportedBlockchains.some(({ chainId }) => chainId === chain?.id), [chain])

  return (
    <div className="w-full flex flex-col items-center max-w-4xl">
      <h2 className="font-bold text-5xl text-tertiary">Select Blockchain</h2>
      <Card className="w-full mt-11 min-h-[450px] flex items-center justify-center">
        <div className="w-full flex flex-col gap-y-8 max-w-2xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base">Select Starting Blockchain</h3>
            <LinkComponent href="/how-it-works" className={cn(buttonVariants({ variant: 'tertiary', size: 'lg' }), 'p-0')}>
              How it works
            </LinkComponent>
          </div>
          <div className="flex items-center gap-x-5">
            {supportedBlockchains.map(({ chainId, className, logo, name, recommended }) => (
              <Card
                key={chainId}
                onClick={() => switchNetwork?.(chainId)}
                className={cn(
                  'w-full py-4 px-2.5 transition-all flex items-center justify-between rounded cursor-pointer',
                  chain?.id === chainId && className
                )}>
                <h4 className="text-tertiary">{name}</h4>
                <div className="flex items-center gap-x-1.5">
                  {recommended && <p className="text-2xs text-black font-bold">Recommended</p>}
                  <Image alt={`${name} logo`} src={logo} className="rounded-full" width={30} height={30} />
                </div>
              </Card>
            ))}
          </div>
          <div className="text-xs font-medium">The Smart Wallet can be deployed on multiple chains -- but let’s start with one for now.</div>
        </div>
      </Card>
      <div className="mt-14 w-full flex items-center justify-between">
        <div className="text-sm">TODO: add steps</div>
        <Button onClick={onPageChange} disabled={!isValidChain} variant="secondary" size="lg">
          Next
        </Button>
      </div>
    </div>
  )
}
