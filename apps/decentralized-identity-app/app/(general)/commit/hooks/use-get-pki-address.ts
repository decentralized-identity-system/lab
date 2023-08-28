import { useNetwork } from 'wagmi'
import { PKI_ADDRESS_LIST } from '../utils/constants'

export function useGetPKIAddress(): `0x${string}` {
  const { chain } = useNetwork()
  return PKI_ADDRESS_LIST[chain?.id || 1]
}
