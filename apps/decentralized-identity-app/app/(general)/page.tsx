import { LinkComponent } from '@/components/shared/link-component'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export default function WelcomePage() {
  return (
    <div className="w-full max-w-7xl">
      <h2 className="text-tertiary text-6xl font-bold">Welcome</h2>
      <p className="mt-6 text-3xl text-tertiary">Are you ready to start your Web3 Journey? </p>
      <div className="mt-24 flex items-center gap-x-9">
        <LinkComponent href="/commit" className={cn(buttonVariants({ size: 'xl' }))}>
          Get Started
        </LinkComponent>
        <LinkComponent href="/how-to" className={cn(buttonVariants({ variant: 'tertiary', size: 'lg' }))}>
          How it works
        </LinkComponent>
      </div>
    </div>
  )
}
