import Image from 'next/image'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { OnPageChange } from '../types'
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card'
import { LinkComponent } from '@/components/shared/link-component'
import { Switch } from '@/components/ui/switch'

export function SelectIdentityHubView({ onPageChange }: { onPageChange: OnPageChange }) {
  return (
    <div className="w-full flex flex-col text-tertiary items-center max-w-4xl">
      <h2 className="font-bold text-5xl ">Select Identity Hub</h2>
      <Card className="mt-10 w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <Image alt="District logo" quality={100} src="/district-logo.png" height={32} width={32} />
          <p className="text-2xs">district.web3oftrust.eth</p>
          <LinkComponent
            href="https://districtlabs.com/"
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: 'tertiary',
              })
            )}>
            Details
          </LinkComponent>
        </CardHeader>
        <CardContent>
          <h3 className="font-bold text-4xl text-black">District Labs</h3>
          <p className="mt-2 text-sm leading-6">
            <strong className="font-bold">Identity simplified for the metaverse.</strong>Sed tristique neque eget turpis sagittis malesuada. Maecenas
            vel magna volutpat ipsum vulputate fermentum....
          </p>
          <div className="mt-8 flex flex-col gap-y-4 text-black">
            <div className="flex items-center text-sm justify-between">
              <span>Identity Storage</span>
              <span className="font-bold ">FREE</span>
            </div>
            <div className="flex items-center text-sm justify-between">
              <span>Verifiable Credentials</span>
              <span className="font-bold">FREE</span>
            </div>
            <div className="flex items-center text-sm justify-between">
              <span>Account Recovery</span>
              <span className="font-bold">$25/month</span>
            </div>
          </div>
          <LinkComponent
            href="https://districtlabs.com/"
            className={cn(
              buttonVariants({
                size: 'sm',
                variant: 'tertiary',
              }),
              'font-bold w-full mt-5 text-black'
            )}>
            View All Identity Hub Features
          </LinkComponent>
        </CardContent>
        <CardFooter className="justify-between">
          <Button variant="action">Full Features</Button>
          <Switch />
        </CardFooter>
      </Card>
      <h4 className="mt-5 text-tertiary font-bold text-center">Recommended Identity Hub</h4>
      <div className="mt-14 w-full flex items-center justify-between">
        <div className="text-sm">TODO: add steps</div>
        <Button onClick={onPageChange} variant="secondary" size="lg">
          Next
        </Button>
      </div>
    </div>
  )
}
