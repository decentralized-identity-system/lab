import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { useMessages, useSendMessage, useStreamMessages } from '@xmtp/react-sdk'
import { XMTPMessage } from './xmtp-message'
import { Card } from '../ui/card'
import { AvatarBlockie } from '../avatar-blockie'
import { Address } from '../blockchain/address'
import { cn } from '@/lib/utils'
import { TimeFromDate } from '../shared/time-from-date'
import { XMTPSendMessage } from './xmtp-send-message'

type Conversation = {
  context?: undefined
  createdAt: Date
  id: number
  isReady: boolean
  peerAddress: string
  topic: string
  updatedAt: Date
  walletAddress: string
}

type XMTPConversation = React.HTMLAttributes<HTMLElement> & {
  classNameTrigger?: string
  classNameCard?: string
  conversation: Conversation
}

export const XMTPConversation = ({ classNameTrigger, classNameCard, conversation }: any) => {
  const { messages, isLoading } = useMessages(conversation)
  const classesCard = cn(classNameCard, 'p-4 flex flex-col text-left')
  return (
    <div>
      <Dialog>
        <DialogTrigger className={classNameTrigger}>
          <Card className={classesCard}>
            <div className="flex gap-x-6 items-center">
              <AvatarBlockie className="rounded-full" styled address={conversation.peerAddress} />
              <Address address={conversation.peerAddress} />
            </div>
            <span className="mt-4 text-xs">
              Last Update: <TimeFromDate date={conversation.updatedAt} type="DATETIME" />
            </span>
          </Card>
        </DialogTrigger>
        <DialogContent className="fix flex-col top-0 bottom-0 right-0 rounded-none pt-12">
          <div className="flex-1 flex flex-col gap-y-4 h-full">
            {!isLoading && messages?.map((message) => <XMTPMessage key={message.id} message={message} />)}
          </div>
          <div className="self-end">
            <XMTPSendMessage className="w-full" conversation={conversation} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
