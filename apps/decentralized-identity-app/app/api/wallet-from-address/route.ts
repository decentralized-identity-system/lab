import { IDENTITY_HUB_URL } from '@/app/(general)/commit/utils/constants'
import { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const address = req.nextUrl.searchParams.get('address')

    if (!address) {
      throw new Error('No address provided')
    }
    const response = await fetch(`${IDENTITY_HUB_URL}/wallet-from-address/${address}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error('Failed to get DID document from address')
    }

    const data = await response.json()
    return new Response(JSON.stringify(data), { status: 200 })
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 })
    }
    return new Response('Unknown error', { status: 400 })
  }
}
