import type { Address } from 'viem'

export enum PageState {
  CHAIN_SELECTION,
  IDENTITY_HUB,
  COMMIT_SIGNATURES,
  SMART_WALLET,
  SUCCESS,
}

export interface Signatures {
  wallet: string | undefined
  identity: string | undefined
}

export interface DidId {
  chain: number
  pkiAddress: Address
  walletAddress: Address
  salt: bigint
}

export type OnPageChange = () => void
