'use client'
import { useAccount } from 'wagmi'
import { QRCode } from '@/components/qr-code'
import { useGethWalletFromAddress } from '@/lib/hooks/use-get-wallet-from-address'

export default function Dashboard() {
  const { address } = useAccount()
  const { data, error, isSuccess } = useGethWalletFromAddress(address)

  console.log(data, error, isSuccess, 'data, error, isSuccess')

  if (!isSuccess) return <div>loading...</div>

  return (
    <div className="w-full max-w-7xl flex justify-center items-center">
      <QRCode className='rounded-xl border-2 border-white shadow-md' fgColor='#3e3e3e' value={data.did} size={368} imgSettings={{
        src: 'https://pbs.twimg.com/profile_images/1614629077276663813/-D_dYj9i_400x400.jpg',
        height: 64,
        width: 64,
        excavate: true
      }} />
    </div>
  )
}
