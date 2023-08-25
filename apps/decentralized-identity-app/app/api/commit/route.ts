import { IDENTITY_HUB_URL } from '@/app/(general)/commit/utils/constants'

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const response = await fetch(`${IDENTITY_HUB_URL}/commit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

    console.log(await response.json())
    if (!response.ok) {
      throw new Error('Failed to commit signatures')
    }

    return new Response(
      JSON.stringify({
        ok: true,
      }),
      { status: 200 }
    )
  } catch (e) {
    console.error(e)
    if (e instanceof Error) {
      return new Response(e.message, { status: 400 })
    }
    return new Response('Unknown error', { status: 400 })
  }
}
