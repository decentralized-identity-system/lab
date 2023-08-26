'use client'
import { useGetSmartWalletFromAddress } from '@/lib/hooks/use-get-smart-wallet-from-address'
import { useAccount } from 'wagmi'

export default function Credentials() {
  const { address } = useAccount()
  const { data, error, isSuccess } = useGetSmartWalletFromAddress(address)

  if (!isSuccess) return <div>loading...</div>

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-bold text-4xl mb-4">Credentials</h3>
        <p className="text-sm">Manage your verifiable credentials and attestations.</p>
      </div>
    </div>
  )
}
