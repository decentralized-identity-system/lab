'use client'
import { LinkComponent } from '@/components/shared/link-component'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAccount } from 'wagmi'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'
import { useGetSmartWalletFromAddress } from '@/lib/hooks/use-get-smart-wallet-from-address'
import { IsWalletConnected } from '@/components/shared/is-wallet-connected'
import { IsWalletDisconnected } from '@/components/shared/is-wallet-disconnected'
import { WalletConnect } from '@/components/blockchain/wallet-connect'

export default function WelcomePage() {
  const { address } = useAccount()
  const { data, error, isSuccess } = useGetSmartWalletFromAddress(address)

  useEffect(() => {
    if (isSuccess) {
      redirect('/dashboard')
    }
  }, [isSuccess])

  return (
    <div className="w-full max-w-7xl">
      <h2 className="text-tertiary text-6xl font-bold">Welcome</h2>
      <h3 className="mt-4 text-3xl text-tertiary">Start your Web3 journey and explore what's possible.</h3>
      <p className="mt-4 text-normal">
        Create a Smart Wallet with <span className="font-semibold">Sovereign Identity</span> and <span className="font-semibold">Open Finance</span>{' '}
        capabilities.
      </p>
      <div className="mt-12 flex items-center gap-x-9">
        <IsWalletConnected>
          <LinkComponent href="/commit" className={cn(buttonVariants({ size: 'xl' }))}>
            Get Started
          </LinkComponent>
        </IsWalletConnected>
        <IsWalletDisconnected>
          <WalletConnect />
        </IsWalletDisconnected>
        <LinkComponent href="/how-it-works" className={cn(buttonVariants({ variant: 'tertiary', size: 'lg' }))}>
          How it works
        </LinkComponent>
      </div>
    </div>
  )
}
