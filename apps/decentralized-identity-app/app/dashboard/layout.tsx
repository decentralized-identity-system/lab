import { ReactNode } from 'react'
import { Footer } from '@/app/dashboard/footer'
import { Toaster } from '@/components/ui/toaster'
import { Header } from './header'

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <Header />
        <main className="flex-center min-h-[calc(100vh_-_92px)] flex flex-1 flex-col md:px-10 lg:py-20">{children}</main>
        <Footer className="fixed bottom-0 right-0 left-0 z-0" />
      </div>
      <Toaster />
    </>
  )
}
