'use client'

import { XMTPChat } from '@/components/xmtp/xmtp-chat'

export default function Social() {
  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-bold text-4xl mb-4">Social</h3>
        <p className="text-sm">Connect with your friends, communities and colleagues.</p>
        <XMTPChat className="mt-10" />
      </div>
    </div>
  )
}
