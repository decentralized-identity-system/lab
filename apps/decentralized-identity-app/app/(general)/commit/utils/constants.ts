import type { Address } from 'viem'

export const IDENTITY_HUB_URL = process.env.NODE_ENV === 'production' ? 'https://lab-production-3cc9.up.railway.app' : 'http://localhost:3001'

/**
 * Public Key Infrastructure address on Sepolia
 */
export const PKI_ADDRESS = '0x4DAc95a0565A5820cf6303092fcbf78D4E11c0C4'

/**
 * Recovery constant on Sepolia
 */
export const RECOVERY: Address = '0xdEAD000000000000000042069420694206942069'
