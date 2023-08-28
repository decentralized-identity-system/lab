import { useQuery } from 'wagmi'

export function useFetchDIDDocumentFromAddress(address: string | undefined) {
  return useQuery(['did-document-from-address', address], async () => {
    if (!address) throw new Error('No address provided')
    const response = await fetch(
      `api/did-from-address?` +
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
      throw new Error('Failed to fetch DID document from address')
    }

    return response.json()
  })
}
