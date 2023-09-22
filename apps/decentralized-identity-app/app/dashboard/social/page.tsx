'use client'

import { XMTPChat } from '@/components/xmtp/xmtp-chat'
import { usePrivy, useWallets } from '@privy-io/react-auth'
import { usePrivyWagmi } from '@privy-io/wagmi-connector'

export default function Social() {
  const { login, ready, authenticated, logout } = usePrivy()
  const { wallets } = useWallets()
  const { wallet: activeWallet, setActiveWallet } = usePrivyWagmi()

  if (!ready) return null

  if (!authenticated) {
    // Use Privy login instead of wagmi's connect
    return <button onClick={() => login()}>login with privy</button>
  }

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <h2>Active Wallet {activeWallet?.address}</h2>
      <button onClick={logout}>logout</button>
      <ul>
        {wallets.map((wallet) => (
          <li key={wallet.address}>
            <button onClick={() => setActiveWallet(wallet)}>Activate {wallet.address}</button>
          </li>
        ))}
      </ul>
      <div className="text-center mb-8">
        <h3 className="font-bold text-4xl mb-4">Social</h3>
        <p className="text-sm">Connect with your friends, communities and colleagues.</p>
        <XMTPChat className="mt-10" />
      </div>
    </div>
  )
}
