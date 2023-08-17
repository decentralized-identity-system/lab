import Image from 'next/image'
import type { OnPageChange } from '../types'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaCopy } from 'react-icons/fa'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const DID_ID = {
  chain: 10,
  pkiAddress: '0x1234567890123456789012345678901234567890',
  walletAddress: '0x1111111111111111111111111111111111111111',
}

const truncateAddress = (address: string) => `${address.slice(0, 6)}...${address.slice(-4)}`

export function SmartWalletView({ onPageChange }: { onPageChange: OnPageChange }) {
  return (
    <div className="w-full flex flex-col items-center max-w-2xl">
      <h2 className="font-bold text-5xl text-tertiary">Smart Wallet</h2>
      <Card className="w-full mt-11 min-h-[450px] flex items-center justify-center ">
        <div className="w-full flex items-center flex-col  max-w-xl">
          <Image
            quality={100}
            className="rounded-xl border-2 shadow-lg  border-white "
            alt="Smart wallet avatar"
            src={`https://cdn.stamp.fyi/avatar/${DID_ID.walletAddress}?w=100&h=100`}
            width={100}
            height={100}
          />
          <div className="mt-10 text-center">
            <p className="text-[#6B976A] text-xl font-bold">{truncateAddress(DID_ID.walletAddress)}</p>
            <p className="mt-1 font-medium">Smart Wallet Address</p>
          </div>
          <div className="mt-8 text-center">
            <CopyToClipboard text={`did:dis:${DID_ID.chain}:${DID_ID.pkiAddress}:${DID_ID.walletAddress}`}>
              <span>
                <p className="text-xl font-bold cursor-pointer">
                  did:dis:<span className="text-[#3290C5]">{DID_ID.chain}</span>:
                  <span className="text-[#AB65BC]">{truncateAddress(DID_ID.pkiAddress)}</span>:
                  <span className="text-[#6B976A]">{truncateAddress(DID_ID.walletAddress)}</span>
                </p>
                <div className="flex justify-center items-center gap-x-2 cursor-pointer">
                  <p className="mt-1 font-medium">Decentralized Id</p>
                  <FaCopy className=" text-neutral-500" />
                </div>
              </span>
            </CopyToClipboard>
          </div>
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
          <Button variant="secondary">Deploy Wallet</Button>
          <p className="mt-2 text-tertiary">Optional</p>
        </div>
        <div>
          <Button>Connect Social Media</Button>
          <p className="mt-2 text-tertiary">Recommended</p>
        </div>
      </div>
    </div>
  )
}
