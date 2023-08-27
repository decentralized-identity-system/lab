'use client'
import { ReactNode } from 'react'
import { XMTPProvider } from '@xmtp/react-sdk'
import { Footer } from '@/app/dashboard/_layout/footer'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/app/dashboard/_layout/header'

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <XMTPProvider>
      <div className="flex flex-col">
        <Header />
        <main className="min-h-[calc(100vh_-_92px)] flex flex-1 flex-col px-8 pb-32 pt-20 md:px-10 lg:pt-20 lg:pb-32 overflow-x-hidden">
          {children}
        </main>
        <Footer className="fixed bottom-0 right-0 left-0 z-0" />
      </div>
      <Toaster />
    </XMTPProvider>
  )
}
