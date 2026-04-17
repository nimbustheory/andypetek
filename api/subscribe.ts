import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.BUTTONDOWN_API_KEY

  if (!apiKey) {
    // Development mode - simulate success
    return res.status(200).json({ success: true, dev: true })
  }

  const { email, tags } = req.body || {}

  if (!email) {
    return res.status(400).json({ error: 'Email is required' })
  }

  try {
    const response = await fetch('https://api.buttondown.email/v1/subscribers', {
      method: 'POST',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, tags }),
    })

    if (response.ok) {
      return res.status(200).json({ success: true })
    }

    const data = await response.json()
    return res.status(response.status).json({ error: data.detail || 'Subscription failed' })
  } catch {
    return res.status(500).json({ error: 'Failed to subscribe' })
  }
}
