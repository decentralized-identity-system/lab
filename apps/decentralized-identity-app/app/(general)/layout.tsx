import { ReactNode } from 'react'
import { Footer } from '@/app/(general)/footer'
import { Toaster } from '@/components/ui/toaster'
import { NetworkStatus } from '@/components/blockchain/network-status'
import { WalletConnect } from '@/components/blockchain/wallet-connect'

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <main className="flex-center min-h-[calc(100vh_-_92px)] flex flex-1 flex-col md:px-10 lg:py-20">{children}</main>
        <div className="fixed bottom-6 left-6">
          <NetworkStatus />
        </div>
        <div className="fixed bottom-6 right-6 flex items-center">
          <WalletConnect />
        </div>
        <Footer />
      </div>
      {/* TODO: Add position controls */}
      <Toaster />
    </>
  )
}
