import { useMutation } from '@tanstack/react-query'

interface CommitSignaturesProps {
  did: string
  didDocument: any
  originalOwner: `0x${string}`
  hexDid: string
  salt: string
  signatureWallet: string
  signatureDid: string
}

interface WalletCommitSignatures {
  did: string
  chainId: number
  creator: string
  address: string
  salt: number
  pki: string
  recovery: string
  commitments: {
    wallet: string
    identity: string
  }
  identity: {
    hex: string
    document: any
  }
}

export function useCommitSignatures({ commitPayload, onSuccess }: { commitPayload: WalletCommitSignatures; onSuccess?: () => void }) {
  return useMutation(['commit-signatures', commitPayload], {
    mutationFn: async () => {
      const response = await fetch(`api/commit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commitPayload),
      })

      if (!response.ok) {
        throw new Error('Failed to commit signatures')
      }
    },
    onSuccess,
  })
}
