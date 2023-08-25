import { useQuery } from 'wagmi'

export function useGethWalletFromAddress(address: string | undefined) {
  return useQuery(['wallet-from-address', address], async () => {
    if (!address) throw new Error('No address provided')
    const response = await fetch(
      `api/wallet-from-address?` +
        new URLSearchParams({
          address: address,
        }),
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      throw new Error('Failed to fetch Smart Wallet from address')
    }

    return response.json()
  })
}
