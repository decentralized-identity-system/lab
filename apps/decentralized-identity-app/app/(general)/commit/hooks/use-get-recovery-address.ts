import { useNetwork } from 'wagmi'
import { RECOVERY_ADDRESS_LIST } from '../utils/constants'

export function useGetRecoveryAddress(): `0x${string}` {
  const { chain } = useNetwork()
  return RECOVERY_ADDRESS_LIST[chain?.id || 1]
}
