'use client'
import { LinkComponent } from '@/components/shared/link-component'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useAccount } from 'wagmi'
import { useFetchDIDDocumentFromAddress } from './commit/hooks/use-fetch-did-document-from-address'
import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function WelcomePage() {
  const { address } = useAccount()
  const { data, error, isSuccess } = useFetchDIDDocumentFromAddress(address)

  console.log(data, error, isSuccess, 'data, error, isSuccess')

  useEffect(() => {
    if (isSuccess) {
      redirect('/dashboard')
    }
  }, [isSuccess])

  return (
    <div className="w-full max-w-7xl">
      <h2 className="text-tertiary text-6xl font-bold">Welcome</h2>
      <p className="mt-6 text-3xl text-tertiary">Are you ready to start your Web3 Journey? </p>
      <div className="mt-24 flex items-center gap-x-9">
        <LinkComponent href="/commit" className={cn(buttonVariants({ size: 'xl' }))}>
          Get Started
        </LinkComponent>
        <LinkComponent href="/how-it-works" className={cn(buttonVariants({ variant: 'tertiary', size: 'lg' }))}>
          How it works
        </LinkComponent>
      </div>
    </div>
  )
}
