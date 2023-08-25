import { BigNumber } from 'ethers'
import type { Address } from 'viem'

export const IDENTITY_HUB_URL = process.env.NODE_ENV === 'production' ? 'https://lab-production-3cc9.up.railway.app' : 'http://127.0.0.1:3001'

export const SALT_FOR_WALLET = 1

/**
 * Public Key Infrastructure address list
 */
export const PKI_ADDRESS_LIST: {
  [chainId: number]: Address
} = {
  31337: '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512', // Hardhat
  58008: '0x4DAc95a0565A5820cf6303092fcbf78D4E11c0C4', // Sepolia
}

/**
 * Recovery constant address list
 */
export const RECOVERY_ADDRESS_LIST: {
  [chainId: number]: Address
} = {
  31337: '0x0000000000000000000000000000000000000000', // Hardhat
  58008: '0x0000000000000000000000000000000000000000', // Sepolia
}
