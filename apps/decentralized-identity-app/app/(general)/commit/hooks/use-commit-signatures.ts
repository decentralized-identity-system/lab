import { useMutation } from '@tanstack/react-query'

interface CommitSignaturesProps {
  did: string
  didDocument: any
  hexDid: string
  salt: string
  signatureWallet: string
  signatureDid: string
}

export function useCommitSignatures({ commitPayload, onSuccess }: { commitPayload: CommitSignaturesProps; onSuccess?: () => void }) {
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
