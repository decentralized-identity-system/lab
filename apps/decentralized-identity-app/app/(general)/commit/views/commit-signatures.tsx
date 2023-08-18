import { Button, buttonVariants } from '@/components/ui/button'
import { LoadingSpinner } from '@/components/ui/loading-spinner'
import { cn } from '@/lib/utils'
import { useAccount, useNetwork, useSignMessage } from 'wagmi'
import { encodePacked, keccak256 } from 'viem'
import { useMemo, useState, MutableRefObject } from 'react'
import type { Signatures, OnPageChange, DidId } from '../types'
import { useCommitSignatures } from '../hooks/use-commit-signatures'
import { LinkComponent } from '@/components/shared/link-component'
import { Card } from '@/components/ui/card'
import { usePkiComputeAddress } from '@/lib/generated/blockchain'
import { RECOVERY, PKI_ADDRESS } from '../utils/constants'
import { generateSalt, constructDidDocument } from '../utils'

interface CommitSignaturesView {
  didIdRef: MutableRefObject<DidId>
  onPageChange: OnPageChange
}

export function CommitSignaturesView({ didIdRef, onPageChange }: CommitSignaturesView) {
  const [signatures, setSignatures] = useState<Signatures>({
    wallet: undefined,
    identity: undefined,
  })
  const { chain } = useNetwork()
  const { address } = useAccount()
  const SALT = useMemo(() => generateSalt(), [])

  const { data: walletAddress } = usePkiComputeAddress({
    address: PKI_ADDRESS,
    args: address ? [RECOVERY, address, SALT] : undefined,
    enabled: !!address,
  })

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
      did: constructDidDocument({ pkiAddress: PKI_ADDRESS, chainId: chain?.id, walletAddress }).id,
      didDocument: constructDidDocument({ pkiAddress: PKI_ADDRESS, chainId: chain?.id, walletAddress }),
      hexDid: keccak256(
        encodePacked(['string'], [JSON.stringify(constructDidDocument({ pkiAddress: PKI_ADDRESS, chainId: chain?.id, walletAddress }))])
      ),
      salt: SALT.toString(),
      signatureWallet: signatures.wallet || '',
      signatureDid: signatures.identity || '',
    },
    onSuccess: () => {
      if (!chain || !walletAddress) return
      didIdRef.current = {
        chain: chain?.id,
        pkiAddress: PKI_ADDRESS,
        walletAddress: walletAddress,
        salt: SALT,
      }
      onPageChange()
    },
  })

  const handleSignWalletMessage = async () => {
    if (!address) return
    const bytesWalletMessage = keccak256(encodePacked(['address', 'address', 'address', 'uint256'], [PKI_ADDRESS, RECOVERY, address, SALT]))
    signMessage({ message: bytesWalletMessage })
  }

  const handleSignDidMessage = async () => {
    if (!address || !chain) return
    const DID = constructDidDocument({ pkiAddress: PKI_ADDRESS, chainId: chain.id, walletAddress: walletAddress })
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
                disabled={!!signatures.wallet || !walletAddress}
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
                disabled={!signatures.wallet || !!signatures.identity || !walletAddress}
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
