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

export type OnPageChange = () => void
