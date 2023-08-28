import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LuQrCode } from 'react-icons/lu'
import { useGetSmartWalletFromAddress } from '@/lib/hooks/use-get-smart-wallet-from-address'
import { useAccount } from 'wagmi'
import { QRCodeRender } from './qr-code-render'

type QRCodeDisplay = React.HTMLAttributes<HTMLElement> & {
  classNameTrigger?: string
  iconSize?: number
}

export const QRCodeDisplay = ({ classNameTrigger, iconSize = 24 }: QRCodeDisplay) => {
  const { address } = useAccount()
  const { data, error, isSuccess } = useGetSmartWalletFromAddress(address)

  return (
    <>
      <Dialog>
        <DialogTrigger className={classNameTrigger}>
          <LuQrCode size={iconSize} />
        </DialogTrigger>
        <DialogContent className="fixed top-0 bottom-0 left-0 right-0  flex items-center justify-center">
          <QRCodeRender
            className="rounded-xl w-full"
            fgColor="#3e3e3e"
            value={data?.did}
            size={360}
            imgSettings={{
              src: '/logo.png',
              height: 64,
              width: 64,
              excavate: true,
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}
