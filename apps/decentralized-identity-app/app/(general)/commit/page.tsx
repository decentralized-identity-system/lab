'use client'

import { useState } from 'react'
import { CommitSignaturesView, SelectBlockChainView, SelectIdentityHubView, SmartWalletView } from './views'
import { PageState } from './types'

export default function CommitPage() {
  const [page, setPage] = useState<PageState>(PageState.CHAIN_SELECTION)

  switch (page) {
    case PageState.CHAIN_SELECTION:
      return <SelectBlockChainView onPageChange={() => setPage(PageState.COMMIT_SIGNATURES)} />
    case PageState.IDENTITY_HUB:
      return <SelectIdentityHubView onPageChange={() => setPage(PageState.COMMIT_SIGNATURES)} />
    case PageState.COMMIT_SIGNATURES:
      return <CommitSignaturesView onPageChange={() => setPage(PageState.SMART_WALLET)} />
    case PageState.SMART_WALLET:
      return <SmartWalletView onPageChange={() => setPage(PageState.CHAIN_SELECTION)} />
  }
}
