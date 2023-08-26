'use client'
import classNames from 'clsx'
import { useAccount } from 'wagmi'
import { useGetSmartWalletFromAddress } from '@/lib/hooks/use-get-smart-wallet-from-address'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { SmartWalletDeployButton } from '@/components/button-smart-wallet-deploy'
import { LinkComponent } from '@/components/shared/link-component'
import { Button } from '@/components/ui/button'
import { TokenBalanceAndIcon } from '@/components/token/token-balance-and-icon'
import { cn } from '@/lib/utils'
import { NetworkDetails } from '@/components/blockchain/network-details'
import { Address } from '@/components/blockchain/address'

export default function Dashboard() {
  const { address } = useAccount()
  const { data, error, isSuccess } = useGetSmartWalletFromAddress(address)

  if (!isSuccess) return <div>loading...</div>

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-bold text-4xl mb-4">Account</h3>
        <p className="text-sm">Manage your Web3 identity and finances in one place</p>
      </div>
        <TokenBalances className="mt-8 flex items-center gap-x-5" />
        <div className='mt-8 '>
          <SmartWalletDeployButton className="w-full" />
          <p className='text-xs mt-4 flex items-center justify-center'>
            Your Smart Wallet (<Address className='font-bold' truncate address={data.address}/>) will be deployed to <NetworkDetails className='inline-flex items-center ml-1' displayIcon width={12} height={12} chainId={84531}/>
          </p>
        </div>
        <CardGuardians className="mt-8" />
        <CardIdentity className="mt-8" />
        <CardSocial className="mt-8" />
    </div>
  )
}

type Row = React.HTMLAttributes<HTMLElement> & {
  classNameLabel?: string
  classNameValue?: string
  label: string
  value: string
}

const Row = ({ label, value }: Row) => {
  return (
    <div className="flex justify-between items-center">
      <div className="text-sm font-semibold">{label}:</div>
      <div className="text-sm">{value}</div>
    </div>
  )
}

type TokenBalances = React.HTMLAttributes<HTMLElement>;

const TokenBalances = ({ children, className }: TokenBalances) => { 
const classes = cn(className);

 return(
  <div className={classes}>
    <Card className='p-4 flex-1'>
      <TokenBalanceAndIcon className='w-full' address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'} chainId={1} />
    </Card>
    <Card className='p-4 flex-1'>
      <TokenBalanceAndIcon address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'} chainId={1} />
    </Card>
    <Card className='p-4 flex-1'>
      <TokenBalanceAndIcon address={'0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'} chainId={1} />
    </Card>
  </div>
)}

type CardGuardians = React.HTMLAttributes<HTMLElement>

const CardGuardians = ({ children, className }: CardGuardians) => {
  const classes = classNames(className, 'text-left')

  return (
    <Card className={classes}>
      <CardHeader>
        <CardTitle>Guardians</CardTitle>
        <CardDescription>Manage your Guardians to help you recover your account if you lose access to it.</CardDescription>
      </CardHeader>
      <CardFooter>
        <LinkComponent href="/dashboard/guardians">
          <Button variant="dark" size={'sm'}>
            Setup Guardians
          </Button>
        </LinkComponent>
      </CardFooter>
    </Card>
  )
}

type CardIdentity = React.HTMLAttributes<HTMLElement>

const CardIdentity = ({ children, className }: CardIdentity) => {
  const classes = classNames(className, 'text-left')

  return (
    <Card className={classes}>
      <CardHeader>
        <CardTitle>Identity</CardTitle>
        <CardDescription>Manage your digital identity via a decentralized identifier document.</CardDescription>
      </CardHeader>
      <CardFooter>
        <LinkComponent href="/dashboard/guardians">
          <Button variant="dark" size={'sm'}>
            Manage Identity
          </Button>
        </LinkComponent>
      </CardFooter>
    </Card>
  )
}

type CardSocial = React.HTMLAttributes<HTMLElement>

const CardSocial = ({ children, className }: CardSocial) => {
  const classes = classNames(className, 'text-left')

  return (
    <Card className={classes}>
      <CardHeader>
        <CardTitle>Social</CardTitle>
        <CardDescription>Connect with your friends, communities and colleagues.</CardDescription>
      </CardHeader>
      <CardFooter>
        <LinkComponent href="/dashboard/guardians">
          <Button variant="dark" size={'sm'}>
            Start Connecting
          </Button>
        </LinkComponent>
      </CardFooter>
    </Card>
  )
}
