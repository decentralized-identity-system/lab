'use client'

import { useState, useRef } from 'react'
import { CommitSignaturesView, SelectBlockChainView, SelectIdentityHubView, SmartWalletView } from './views'
import { PageState, type DidId } from './types'

export default function CommitPage() {
  const [page, setPage] = useState<PageState>(PageState.CHAIN_SELECTION)
  const didId = useRef<DidId>({
    chain: 0,
    pkiAddress: '0x',
    walletAddress: '0x',
    salt: BigInt(0),
  })

  switch (page) {
    case PageState.CHAIN_SELECTION:
      return <SelectBlockChainView onPageChange={() => setPage(PageState.IDENTITY_HUB)} />
    case PageState.IDENTITY_HUB:
      return <SelectIdentityHubView onPageChange={() => setPage(PageState.COMMIT_SIGNATURES)} />
    case PageState.COMMIT_SIGNATURES:
      return <CommitSignaturesView didIdRef={didId} onPageChange={() => setPage(PageState.SMART_WALLET)} />
    case PageState.SMART_WALLET:
      return <SmartWalletView didId={didId.current} onPageChange={() => setPage(PageState.CHAIN_SELECTION)} />
  }
}
