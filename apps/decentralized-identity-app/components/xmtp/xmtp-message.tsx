import { cn } from '@/lib/utils'
import { AvatarBlockie } from '../avatar-blockie'
import { CachedMessage } from '@xmtp/react-sdk'

type MessageContent = React.HTMLAttributes<HTMLElement> & {
  content: string
  contentBytes?: undefined
  contentFallback?: undefined
  contentType: string
  conversationTopic: string
  hasSendError: boolean
  id: number
  isSending: boolean
  senderAddress: string
  sentAt: Date
  status: string
  uuid: string
  walletAddress: string
  xmtpID: string
}

type XMTPMessage = React.HTMLAttributes<HTMLElement> & {
  message: CachedMessage<any, any>
}

export const XMTPMessage = ({ className, message }: XMTPMessage) => {
  const classes = cn(className, 'flex p-2 rounded-md', {
    'bg-blue-100': message.senderAddress === message.walletAddress,
    'bg-neutral-100': message.senderAddress != message.walletAddress,
  })
  return (
    <div className={classes}>
      <div className="inline-block mr-4">
        <AvatarBlockie className="rounded-full" styled address={message.senderAddress} />
      </div>
      <div className="flex-1">
        <p className="text-sm leading-6">{message.content}</p>
      </div>
    </div>
  )
}
