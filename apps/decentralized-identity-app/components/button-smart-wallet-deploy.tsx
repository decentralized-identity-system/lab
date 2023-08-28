import * as React from 'react'
import classNames from 'clsx'
import { Button } from '@/components/ui/button'

type SmartWalletDeployButton = React.HTMLAttributes<HTMLElement>

export const SmartWalletDeployButton = ({ className }: SmartWalletDeployButton) => {
  const classes = classNames(className, 'SmartWalletDeployButton')
  return (
    <Button variant={'dark'} className={classes} rounded={'full'}>
      Initialize Smart Wallet
    </Button>
  )
}
