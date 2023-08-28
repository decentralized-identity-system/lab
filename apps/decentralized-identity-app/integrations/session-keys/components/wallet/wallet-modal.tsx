import * as React from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LuWallet } from 'react-icons/lu'
import { useWallet } from '../../hooks/use-wallet'
import { AvatarBlockie } from '@/components/avatar-blockie'

type WalletModal = React.HTMLAttributes<HTMLElement>

export const WalletModal = (props: WalletModal) => {
  const { accounts } = useWallet()
  return (
    <Dialog>
      <DialogTrigger className="flex justify-between items-center gap-x-3">
        <span className="bg-white hover:shadow-lg transition-shadow p-2 rounded-md">
          <LuWallet className="text-neutral-700" size={24} />
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wallet</DialogTitle>
          <DialogDescription>Manage your wallet accounts and backup phrases.</DialogDescription>
        </DialogHeader>
        {accounts?.map((account) => (
          <div className="flex items-center gap-x-3">
            <AvatarBlockie className="rounded-full shadow-sm" address={account?.address} />
            <span className="text-sm">{account?.address}</span>
          </div>
        ))}
      </DialogContent>
    </Dialog>
  )
}
