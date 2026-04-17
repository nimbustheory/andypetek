import type { VercelRequest, VercelResponse } from '@vercel/node'

const GITHUB_API = 'https://api.github.com'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const token = process.env.GITHUB_TOKEN
  const repo = process.env.GITHUB_REPO

  if (!token || !repo) {
    return res.status(500).json({ error: 'GitHub configuration missing' })
  }

  // Extract the file path from the URL
  const { path } = req.query
  const filePath = Array.isArray(path) ? path.join('/') : path

  if (!filePath) {
    return res.status(400).json({ error: 'File path required' })
  }

  const headers: Record<string, string> = {
    'Authorization': `Bearer ${token}`,
    'Accept': 'application/vnd.github.v3+json',
  }

  try {
    if (req.method === 'GET') {
      const response = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, { headers })

      if (!response.ok) {
        return res.status(response.status).json({ error: `GitHub API error: ${response.statusText}` })
      }

      const data = await response.json()
      return res.status(200).json(data)
    }

    if (req.method === 'PUT') {
      const response = await fetch(`${GITHUB_API}/repos/${repo}/contents/${filePath}`, {
        method: 'PUT',
        headers: { ...headers, 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      })

      if (!response.ok) {
        const error = await response.json()
        return res.status(response.status).json({ error: error.message || response.statusText })
      }

      const data = await response.json()
      return res.status(200).json(data)
    }

    return res.status(405).json({ error: 'Method not allowed' })
  } catch (error) {
    return res.status(500).json({ error: 'Internal server error' })
  }
}
