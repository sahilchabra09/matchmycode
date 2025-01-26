import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/lib/actions/user.actions'

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET

  if (!SIGNING_SECRET) {
    throw new Error('Missing CLERK_WEBHOOK_SECRET')
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET)

  // Get headers
  const headerPayload = headers()
  const svix_id = headerPayload.get('svix-id')
  const svix_timestamp = headerPayload.get('svix-timestamp')
  const svix_signature = headerPayload.get('svix-signature')

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Missing Svix headers', { status: 400 })
  }

  try {
    const payload = await req.json()
    const body = JSON.stringify(payload)

    const evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    }) as WebhookEvent

    // Handle user.created event
    if (evt.type === "user.created") {
      const { id, first_name, last_name, email_addresses, phone_numbers } = evt.data
      
      await createUser({
        clerkId: id,
        first_name: first_name || '',
        last_name: last_name || '',
        email: email_addresses[0].email_address,
        name: `${first_name || ''} ${last_name || ''}`.trim(),
        role: "user"
      })

      return new Response('User created successfully', { status: 200 })
    }

    return new Response('Webhook received', { status: 200 })
  } catch (err) {
    console.error('Webhook Error:', err)
    return new Response('Webhook error occurred', { status: 400 })
  }
}