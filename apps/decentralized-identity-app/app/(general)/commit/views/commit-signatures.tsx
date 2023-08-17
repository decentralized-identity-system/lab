import { Button, buttonVariants } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import type { OnPageChange } from '../types'
import { cn } from '@/lib/utils'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { toBytes, encodePacked, keccak256 } from 'viem'
import { useState } from 'react'
import type { Signatures } from '../types'
import { useCommitSignatures } from '../hooks/use-commit-signatures'
import { LinkComponent } from '@/components/shared/link-component'
import { Card } from '@/components/ui/card'

const PKI_ADDRESS = '0x1234567890123456789012345678901234567890'
const ENTRYPOINT = '0x2222222222222222222222222222222222222222'
const WALLET_ADDRESS = '0x1111111111111111111111111111111111111116'
const SALT = BigInt(4)

function constructDidDocument({ pkiAddress, chainId, walletAddress }: { pkiAddress: string; chainId: number; walletAddress: string }) {
  const DID = { '@context': 'https://www.w3.org/ns/did/v1', id: `did:dis:${chainId}:${pkiAddress}:${walletAddress}` }
  return DID
}

export function CommitSignaturesView({ onPageChange }: { onPageChange: OnPageChange }) {
  const [signatures, setSignatures] = useState<Signatures>({
    wallet: undefined,
    identity: undefined,
  })

  const { chain } = useNetwork()
  const { address } = useAccount()
  const { signMessage } = useSignMessage({
    onSuccess: (data) => {
      if (!signatures.wallet) {
        setSignatures({ ...signatures, wallet: data })
      } else if (!signatures.identity) {
        setSignatures({ ...signatures, identity: data })
      }
    },
  })

  const {
    isError,
    isLoading,
    mutate: commitSignatures,
  } = useCommitSignatures({
    commitPayload: {
      did: constructDidDocument({ pkiAddress: PKI_ADDRESS, chainId: chain?.id || 1, walletAddress: WALLET_ADDRESS }).id,
      didDocument: constructDidDocument({ pkiAddress: PKI_ADDRESS, chainId: chain?.id || 1, walletAddress: WALLET_ADDRESS }),
      hexDid: keccak256(
        encodePacked(
          ['string'],
          [JSON.stringify(constructDidDocument({ pkiAddress: PKI_ADDRESS, chainId: chain?.id || 1, walletAddress: WALLET_ADDRESS }))]
        )
      ),
      salt: SALT.toString(),
      signatureWallet: signatures.wallet || '',
      signatureDid: signatures.identity || '',
    },
    onSuccess: onPageChange,
  })

  const handleSignWalletMessage = async () => {
    if (!address) return
    const bytesWalletMessage = keccak256(encodePacked(['address', 'address', 'address', 'uint256'], [PKI_ADDRESS, ENTRYPOINT, address, SALT]))
    signMessage({ message: bytesWalletMessage })
  }

  const handleSignDidMessage = async () => {
    if (!address || !chain) return
    const DID = constructDidDocument({ pkiAddress: PKI_ADDRESS, chainId: chain.id, walletAddress: WALLET_ADDRESS })
    const bytesDidMessage = keccak256(encodePacked(['string'], [JSON.stringify(DID)]))
    signMessage({ message: bytesDidMessage.toString() })
  }

  return (
    <div className="w-full flex flex-col items-center max-w-4xl">
      <h2 className="font-bold text-5xl text-tertiary">Commitment Signatures</h2>
      <Card className="w-full mt-11 min-h-[450px] flex items-center justify-center rounded-xl ">
        <div className="w-full flex flex-col gap-y-8 max-w-2xl">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-base">Commit</h3>
            <LinkComponent href="/how-to" className={cn(buttonVariants({ variant: 'tertiary', size: 'lg' }), 'p-0')}>
              How it works
            </LinkComponent>
          </div>
          <div className="flex items-center justifu-between gap-x-8">
            <div className="w-full">
              <Card className="rounded-md w-full flex text-tertiary items-center justify-between px-4 h-20">
                <h4 className="text-2xl font-bold">Wallet</h4>
                <p>Signature 1</p>
              </Card>
              <Button
                onClick={handleSignWalletMessage}
                disabled={!!signatures.wallet}
                variant={signatures.wallet ? 'default' : !!signatures.wallet ? 'secondary' : 'action'}
                className="w-full mt-2">
                {signatures.wallet ? 'Complete' : 'Sign Commitment'}
              </Button>
            </div>
            <div className="w-full">
              <Card className="rounded-md w-full flex text-tertiary items-center justify-between px-4 h-20">
                <h4 className="text-2xl font-bold">Identity</h4>
                <p>Signature 2</p>
              </Card>
              <Button
                onClick={handleSignDidMessage}
                disabled={!signatures.wallet || !!signatures.identity}
                variant={signatures.identity ? 'default' : !signatures.wallet || !!signatures.identity ? 'secondary' : 'action'}
                className="w-full mt-2">
                {signatures.identity ? 'Complete' : 'Sign Commitment'}
              </Button>
            </div>
          </div>
          <div className="text-xs font-medium">By signing these signatures you’re commit to a onchain Smart Wallet and offchain Identity.</div>
        </div>
      </Card>
      <div className="mt-14 w-full flex items-center justify-between">
        <div className="text-sm">TODO: add steps</div>
        <Button
          disabled={isLoading || !signatures.wallet || !signatures.identity}
          onClick={() => commitSignatures()}
          variant={isError ? 'destructive' : 'secondary'}
          size="lg">
          {isLoading ? (
            <>
              Loading <LoadingSpinner className="ml-2" />
            </>
          ) : isError ? (
            'An error ocurred, try Again'
          ) : (
            'Commit Signatures'
          )}
        </Button>
      </div>
    </div>
  )
}
