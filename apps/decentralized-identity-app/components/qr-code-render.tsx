import * as React from 'react'
import classNames from 'clsx'
import { QRCodeSVG } from 'qrcode.react'

type Props = React.HTMLAttributes<HTMLElement> & {
  bgColor?: string
  fgColor?: string
  value: string
  size?: number
  imgSettings?: {
    src: string
    height: number
    width: number
    excavate: boolean
  }
}

export const QRCodeRender = ({ className, value, bgColor = '#FFF', fgColor = '#000', size = 164, imgSettings }: Props) => {
  const classes = classNames(className, 'QRCode')
  return (
    <div className={classes}>
      <QRCodeSVG className={classes} value={value} bgColor={bgColor} fgColor={fgColor} size={size} imageSettings={imgSettings} />
    </div>
  )
}
