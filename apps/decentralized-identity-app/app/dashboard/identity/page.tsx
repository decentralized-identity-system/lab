'use client'
import classNames from 'clsx'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useGetSmartWalletFromAddress } from '@/lib/hooks/use-get-smart-wallet-from-address'
import { useAccount } from 'wagmi'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { LinkComponent } from '@/components/shared/link-component'

export default function Identity() {
  const { address } = useAccount()
  const { data, error, isSuccess } = useGetSmartWalletFromAddress(address)

  if (!isSuccess) return <div>loading...</div>

  return (
    <div className="w-full max-w-screen-sm mx-auto">
      <div className="text-center mb-8">
        <h3 className="font-bold text-4xl mb-4">Identity</h3>
        <p className="text-sm">Manage your Identity and Authentication Keys</p>
      </div>
      <Tabs defaultValue="identity-credentials">
        <TabsList className="w-full flex items-center p-2 bg-transparent mb-4">
          <TabsTrigger className="flex-1" value="identity-credentials">
            Credentials
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="identity-document">
            Document
          </TabsTrigger>
        </TabsList>
        <div className="card">
          <TabsContent className="border-none" value="identity-credentials">
            Verifiable Credentials Coming Soon...
          </TabsContent>
          <TabsContent className="border-none" value="identity-document">
            <div className="flex border-b-2 mb-4 pb-2 justify-between">
              <h3 className="font-normal text-lg">Identity Document</h3>
              <IdentityDocumentHowItWorksModal className="text-xs">How It Works</IdentityDocumentHowItWorksModal>
            </div>
            <IdentityDocument document={data.identity.document} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

type IdentityDocument = React.HTMLAttributes<HTMLElement> & {
  document: any
}

const IdentityDocument = ({ document }: IdentityDocument) => {
  return (
    <div>
      <pre className="break-all max-w-full overflow-auto text-xs border-2 border-neutral-200 p-2 rounded-md">
        <code>{JSON.stringify(document, null, 2)}</code>
      </pre>
    </div>
  )
}

type IdentityDocumentHowItWorksModal = React.HTMLAttributes<HTMLElement>

export const IdentityDocumentHowItWorksModal = ({ children, className }: IdentityDocumentHowItWorksModal) => {
  const classes = classNames(className, 'Component')
  return (
    <div className={classes}>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="leading-5">
          <DialogHeader>
            <DialogTitle>Identity Document</DialogTitle>
            <p className="text-sm">
              The Identity Document is{' '}
              <LinkComponent className="hover:underline link" href="https://www.w3.org/TR/did-core/">
                W3C Decentralized Identifier (DID) document{' '}
              </LinkComponent>{' '}
              for managing your online identity.
            </p>
            <p className="text-sm">The document allows you to:</p>
            <ul className="list-disc list-inside text-sm">
              <li>Manage your public keys</li>
              <li>Manage your authentication keys</li>
              <li>Manage your services</li>
              <li>Manage your attestations</li>
            </ul>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
