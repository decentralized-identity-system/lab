'use client'
import { useAccount } from 'wagmi'
import { useGetSmartWalletFromAddress } from '@/lib/hooks/use-get-smart-wallet-from-address'
import { Card, CardContent } from '@/components/ui/card'
import { SmartWalletDeployButton } from '@/components/button-smart-wallet-deploy'

export default function Dashboard() {
  const { address } = useAccount()
  const { data, error, isSuccess } = useGetSmartWalletFromAddress(address)

  if (!isSuccess) return <div>loading...</div>

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-bold text-4xl mb-4">Smart Wallet</h3>
        <p className="text-sm">Manage your Web3 identity and finances in one place</p>
        <Card className="mt-8 text-left">
          <CardContent className="flex flex-col gap-y-3 py-4">
            <Row label="Status" value={'Counterfactual'} />
            <Row label="Creator" value={data.creator} />
            <Row label="Address" value={data.address} />
            <Row label="Network" value={data.chainId} />
            <Row label="Public Key Infrastructure (PKI)" value={data.pki} />
            <Row label="Recovery" value={data.recovery} />
          </CardContent>
        </Card>
        <SmartWalletDeployButton className="mt-8 w-full" />
      </div>
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
