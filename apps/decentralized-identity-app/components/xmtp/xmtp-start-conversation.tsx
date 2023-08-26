import { cn } from '@/lib/utils'
import { useCanMessage, useSendMessage, useStartConversation } from '@xmtp/react-sdk'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

type XMTPStartConversation = React.HTMLAttributes<HTMLElement> & {}

export const XMTPStartConversation = ({ className }: XMTPStartConversation) => {
  const { startConversation } = useStartConversation()
  const { canMessage } = useCanMessage()
  const [peerAddress, setPeerAddress] = useState('')
  const [message, setMessage] = useState('')
  const [peerIsActive, setPeerIsActive] = useState<boolean>(false)

  const handleAccountChange = async (event: any) => {
    setPeerAddress(event.target.value)
    const isPeerActive = await canMessage(event.target.value)
    setPeerIsActive(!!isPeerActive)
  }

  const handleMessageChange = (event: any) => {
    setMessage(event.target.value)
  }

  const handleStartConversation = async () => {
    if (peerAddress.trim() !== '') {
      if (!canMessage(peerAddress)) return
      startConversation(peerAddress, message)
      setPeerAddress('')
      setMessage('')
    }
  }

  const [canSendMessage, setCanSendMessage] = useState<boolean>(false)
  useEffect(() => {
    if (peerIsActive && message.length > 0) {
      setCanSendMessage(true)
    } else {
      setCanSendMessage(false)
    }
  }, [peerIsActive, message])

  const classes = cn(className)
  return (
    <div className={classes}>
      <input className="w-full input mb-4" type="text" placeholder="Account" value={peerAddress} onChange={handleAccountChange} />
      <div className={'flex items-center gap-x-4'}>
        <input className="w-full input" type="text" placeholder="Type your message..." value={message} onChange={handleMessageChange} />
        <Button rounded={'lg'} disabled={!canSendMessage} variant={canSendMessage ? 'dark' : 'disabled'} onClick={handleStartConversation}>
          Send
        </Button>
      </div>
    </div>
  )
}
