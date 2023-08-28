import * as React from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { ListSessionKeys } from './list-session-keys'
import { LuWallet } from 'react-icons/lu'
import { CreateSessionKey } from './create-session-key'

type SessionKeysModal = React.HTMLAttributes<HTMLElement>

export const SessionKeysModal = ({ children, className }: SessionKeysModal) => {
  const classes = cn(className)

  return (
    <Dialog>
      <DialogTrigger className="flex justify-between items-center gap-x-3">
        <LuWallet size={24} /> Wallet
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wallet Management</DialogTitle>
          <DialogDescription>Manage your wallet keys and recovery phrase.</DialogDescription>
        </DialogHeader>
        <ListSessionKeys />
        <hr className="my-4" />
        <CreateSessionKey />
      </DialogContent>
    </Dialog>
  )
}
