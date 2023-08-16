import { ReactNode } from 'react'
import { Footer } from '@/components/layout/footer'
import { Toaster } from '@/components/ui/toaster'

export default function GeneralLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="flex flex-col">
        <main className="flex-center min-h-[calc(100vh_-_92px)] flex border flex-1 flex-col md:px-10 lg:py-20">{children}</main>
        <Footer />
      </div>
      {/* TODO: Add position controls */}
      <Toaster />
    </>
  )
}
