'use client'
import { ReactNode } from 'react'

import { configureChainsConfig } from '@/config/networks'

import { PrivyProvider } from '@privy-io/react-auth'
import { PrivyWagmiConnector } from '@privy-io/wagmi-connector'

export function Privy({ children }: { children: ReactNode }) {
  return (
    <PrivyProvider appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? ''} config={{ loginMethods: ['wallet', 'email', 'google'] }}>
      <PrivyWagmiConnector wagmiChainsConfig={configureChainsConfig}>{children}</PrivyWagmiConnector>
    </PrivyProvider>
  )
}
