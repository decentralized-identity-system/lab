import React, { useEffect, useState } from 'react'
import { QrReader } from 'react-qr-reader'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { LuCamera } from 'react-icons/lu'

type QRCodeReader = React.HTMLAttributes<HTMLElement> & {
  classNameTrigger?: string
  iconSize?: number
}

export const QRCodeReader = ({ classNameTrigger, iconSize = 24 }: QRCodeReader) => {
  const [data, setData] = useState('No result')

  useEffect(() => {
    console.log(data)
  }, [data])

  return (
    <>
      <Dialog>
        <DialogTrigger className={classNameTrigger}>
          <LuCamera size={iconSize} />
        </DialogTrigger>
        <DialogContent>
          <QrReader
            constraints={{ facingMode: 'environment' }}
            onResult={(result, error) => {
              if (!!result) {
                setData(result?.text)
              }

              if (!!error) {
                console.info(error)
              }
            }}
          />
          <p>{data}</p>
        </DialogContent>
      </Dialog>
    </>
  )
}
