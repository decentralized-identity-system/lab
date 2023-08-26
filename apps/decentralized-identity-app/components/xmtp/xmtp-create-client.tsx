import { useEthersSigner } from '@/lib/hooks/use-ethers-signer'
import { useClient } from '@xmtp/react-sdk'
import { useCallback } from 'react'
import { useNetwork } from 'wagmi'
import { Button } from '../ui/button'

export const XMTPCreateClient = ({}) => {
  const { client, error, isLoading, initialize } = useClient()
  const { chain } = useNetwork()
  const walletClient = useEthersSigner({
    chainId: chain?.id,
  })

  const handleConnect = useCallback(async () => {
    if (!walletClient) return
    await initialize({ signer: walletClient })
  }, [walletClient, initialize])

  if (error) {
    return <span>An error occurred while initializing the client</span>
  }

  if (isLoading) {
    return <span>Awaiting signatures...</span>
  }

  if (!client) {
    return (
      <Button type="button" onClick={handleConnect}>
        Connect
      </Button>
    )
  }

  return <span className="">Ready</span>
}
