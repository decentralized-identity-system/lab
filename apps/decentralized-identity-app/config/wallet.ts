import { Core } from '@walletconnect/core'
import { Web3Wallet } from '@walletconnect/web3wallet'

const core = new Core({
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID,
})

export const walletConnect = await Web3Wallet.init({
  core, // <- pass the shared `core` instance
  metadata: {
    name: 'Smart Wallet - District',
    description: 'Smart Wallet with Identity & Finance capabilities',
    url: 'wallet.district.dev',
    icons: [],
  },
})

export const initWalletConnect = async () => {
  return await Web3Wallet.init({
    core, // <- pass the shared `core` instance
    metadata: {
      name: 'Smart Wallet - District',
      description: 'Smart Wallet with Identity & Finance capabilities',
      url: 'wallet.district.dev',
      icons: [],
    },
  })
}
