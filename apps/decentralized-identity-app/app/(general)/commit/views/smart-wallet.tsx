import Image from 'next/image'
import { useAccount, useWaitForTransaction } from 'wagmi'
import type { OnPageChange, DidId } from '../types'
import { RECOVERY } from '../utils/constants'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { usePkiIsWallet, usePreparePkiDeployWallet, usePkiDeployWallet } from '@/lib/generated/blockchain'
import { LinkComponent } from '@/components/shared/link-component'
import { LoadingSpinner } from '@/components/ui/loading-spinner'

const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

interface SmartWalletViewProps {
  didId: DidId
  onPageChange: OnPageChange
}

export function SmartWalletView({ didId }: SmartWalletViewProps) {
  const { address } = useAccount()
  const { data: isWallet } = usePkiIsWallet({
    address: didId.pkiAddress,
    args: [didId.walletAddress],
  })

  const { config } = usePreparePkiDeployWallet({
    address: didId.pkiAddress,
    args: address ? [RECOVERY, address, didId.salt] : undefined,
    enabled: !!address,
  })

  const { data, write } = usePkiDeployWallet(config)

  const {
    isLoading: isLoadingDeployWallet,
    isError,
    isSuccess: isSuccessDeployWallet,
  } = useWaitForTransaction({
    hash: data?.hash,
  })

  return (
    <div className="w-full flex flex-col items-center max-w-2xl">
      <h2 className="font-bold text-5xl text-tertiary">Smart Wallet</h2>
      <Card className="w-full mt-11 min-h-[450px] flex items-center justify-center ">
        <div className="w-full flex items-center flex-col  max-w-xl">
          <Image
            quality={100}
            className="rounded-xl border-2 shadow-lg  border-white "
            alt="Smart wallet avatar"
            src={`https://cdn.stamp.fyi/avatar/${didId.walletAddress}?w=100&h=100`}
            width={100}
            height={100}
          />
          <div className="mt-10 text-center">
            <p className="text-[#6B976A] text-xl font-bold">{truncateAddress(didId.walletAddress)}</p>
            <p className="mt-1 font-medium">Smart Wallet Address</p>
          </div>
          <div className="mt-8 text-center">
            <CopyToClipboard text={`did:dis:${didId.chain}:${didId.pkiAddress}:${didId.walletAddress}`}>
              <span>
                <p className="text-xl font-bold cursor-pointer">
                  did:dis:<span className="text-[#3290C5]">{didId.chain}</span>:
                  <span className="text-[#AB65BC]">{truncateAddress(didId.pkiAddress)}</span>:
                  <span className="text-[#6B976A]">{truncateAddress(didId.walletAddress)}</span>
                </p>
                <div className="flex justify-center items-center gap-x-2 cursor-pointer">
                  <p className="mt-1 font-medium">Decentralized Id</p>
                  <FaCopy className=" text-neutral-500" />
                </div>
              </span>
            </CopyToClipboard>
          </div>
          {isLoadingDeployWallet && data?.hash ? (
            <div className="mt-8 ">
              Track the transaction at{' '}
              <LinkComponent
                href={`https://sepolia.etherscan.io/tx/${data?.hash}`}
                className="text-[#6B976A] font-bold hover:underline underline-offset-2">
                Etherscan
              </LinkComponent>
            </div>
          ) : (
            isSuccessDeployWallet && (
              <div className="mt-8 ">
                Successfully deployed smart wallet to{' '}
                <LinkComponent
                  href={`https://sepolia.etherscan.io/address/${didId.walletAddress}`}
                  className="text-[#6B976A] font-bold hover:underline underline-offset-2">
                  {truncateAddress(didId.walletAddress)}
                </LinkComponent>
              </div>
            )
          )}
          <div className="mt-12 flex items-center gap-x-9">
            <div className="flex items-center gap-x-1">
              <div className="h-4 w-4 rounded-full bg-[#3290C5]" />
              <p className="font-medium">Chain</p>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="h-4 w-4 rounded-full bg-[#AB65BC]" />
              <p className="font-medium">Resolver</p>
            </div>
            <div className="flex items-center gap-x-1">
              <div className="h-4 w-4 rounded-full bg-[#6B976A]" />
              <p className="font-medium">Wallet</p>
            </div>
          </div>
        </div>
      </Card>
      <div className="mt-7 flex text-center items-center gap-x-7">
        <div>
          <Button
            variant={isError ? 'destructive' : 'secondary'}
            disabled={isWallet || isLoadingDeployWallet || isSuccessDeployWallet || !write}
            onClick={() => write?.()}>
            {isWallet || isSuccessDeployWallet ? (
              'Wallet Deployed'
            ) : isError ? (
              'An Error Ocurred, try again'
            ) : isLoadingDeployWallet ? (
              <>
                Deploying <LoadingSpinner className="ml-2" />
              </>
            ) : (
              'Deploy Wallet'
            )}
          </Button>
          <p className="mt-2 text-tertiary">Optional</p>
        </div>
        <div>
          <Button disabled>Connect Social Media</Button>
          <p className="mt-2 text-tertiary">Recommended</p>
        </div>
      </div>
    </div>
  )
}
