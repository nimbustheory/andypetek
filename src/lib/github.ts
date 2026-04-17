// GitHub API utilities for reading/writing repo files
// Uses serverless API proxy in production to keep tokens secure
// Falls back to direct API calls with VITE_ env vars for local dev

interface GitHubFileResponse {
  content: string
  sha: string
  path: string
}

/**
 * Determine if we should use the serverless proxy or direct API
 */
function useProxy(): boolean {
  // In production, always use the proxy (no VITE_ token available)
  // In dev, use proxy if available, fall back to direct
  return !import.meta.env.VITE_GITHUB_TOKEN
}

/**
 * Get file contents from repo
 */
export async function getFile(path: string): Promise<{ content: string; sha: string }> {
  if (useProxy()) {
    const response = await fetch(`/api/github/${path}`)
    if (!response.ok) {
      throw new Error(`Failed to get file: ${response.statusText}`)
    }
    const data: GitHubFileResponse = await response.json()
    const content = new TextDecoder().decode(
      Uint8Array.from(atob(data.content.replace(/\n/g, '')), c => c.charCodeAt(0))
    )
    return { content, sha: data.sha }
  }

  // Direct API call for local development
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const repo = import.meta.env.VITE_GITHUB_REPO

  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to get file: ${response.statusText}`)
  }

  const data: GitHubFileResponse = await response.json()
  const content = new TextDecoder().decode(
    Uint8Array.from(atob(data.content.replace(/\n/g, '')), c => c.charCodeAt(0))
  )

  return { content, sha: data.sha }
}

/**
 * Get JSON file and parse it
 */
export async function getJsonFile<T>(path: string): Promise<{ data: T; sha: string }> {
  const { content, sha } = await getFile(path)
  const data = JSON.parse(content) as T
  return { data, sha }
}

/**
 * Update file in repo (creates commit)
 */
export async function updateFile(
  path: string,
  content: string,
  message: string,
  sha: string
): Promise<void> {
  const encodedContent = btoa(String.fromCharCode(...new TextEncoder().encode(content)))

  if (useProxy()) {
    const response = await fetch(`/api/github/${path}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content: encodedContent, sha }),
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(`Failed to update file: ${error.error || response.statusText}`)
    }
    return
  }

  // Direct API call for local development
  const token = import.meta.env.VITE_GITHUB_TOKEN
  const repo = import.meta.env.VITE_GITHUB_REPO

  const response = await fetch(`https://api.github.com/repos/${repo}/contents/${path}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message, content: encodedContent, sha }),
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Failed to update file: ${error.message || response.statusText}`)
  }
}

/**
 * Update JSON file
 */
export async function updateJsonFile<T>(
  path: string,
  data: T,
  message: string,
  sha: string
): Promise<void> {
  const content = JSON.stringify(data, null, 2)
  await updateFile(path, content, message, sha)
}

/**
 * Check if GitHub is configured (either via proxy or direct)
 */
export function isGitHubConfigured(): boolean {
  // If we're in a deployed environment, assume the proxy is configured
  if (import.meta.env.PROD) return true
  // In dev, check for the direct token
  return !!(import.meta.env.VITE_GITHUB_TOKEN && import.meta.env.VITE_GITHUB_REPO)
}
