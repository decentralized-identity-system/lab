import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { LuCamera } from 'react-icons/lu'

type QRCodeReader = React.HTMLAttributes<HTMLElement> & {
  classNameTrigger?: string
  iconSize?: number
}

export const QRCodeReader = ({ classNameTrigger, iconSize = 24 }: QRCodeReader) => {
  const [data, setData] = useState<any>('No result')

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <Dialog>
        <DialogTrigger className={classNameTrigger}>
          <LuCamera size={iconSize} />
        </DialogTrigger>
        <DialogContent className="fixed top-0 bottom-0 left-0 right-0">
          <QrReader
            className="fixed top-0 bottom-0 left-0 right-0"
            videoStyle={{ width: '100%', height: '100%' }}
            videoContainerStyle={{ width: '100%', height: '100%' }}
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (!!result) {
                setData(result)
              }

              if (!!error) {
                console.info(error)
              }
            }}
          />
          <div className="fixed p-3 bg-neutral-100 text-center bottom-0 left-0 right-0">{data}</div>
        </DialogContent>
      </Dialog>
    </>
  )
}
