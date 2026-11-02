import { promises as fs } from 'fs'
import path from 'path'

const OWNER = process.env.GITHUB_REPO_OWNER || 'hemanthsudhan27-ship-it'
const REPO = process.env.GITHUB_REPO_NAME || 'joshy-travels'
const BRANCH = process.env.GITHUB_BRANCH || 'main'
const TOKEN = process.env.GITHUB_PAT

export interface GitHubFileResponse {
  name: string
  path: string
  sha: string
  size: number
  url: string
  html_url: string
  git_url: string
  download_url: string
  type: string
  content?: string
  encoding?: string
}

function resolveLocalPath(relativePath: string): string {
  // Statically resolve path without dynamic wildcard tracing
  return path.join(/*turbopackIgnore: true*/ process.cwd(), relativePath)
}

/**
 * Fetch a file from the GitHub repository including its base64 content and SHA
 */
export async function getGitHubFile(filePath: string): Promise<GitHubFileResponse | null> {
  if (!TOKEN) return null
  try {
    const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
        'User-Agent': 'JJTravels-Admin',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      if (res.status === 404) return null
      console.warn(`GitHub API get file warning (${res.status}):`, await res.text())
      return null
    }

    return await res.json()
  } catch (err) {
    console.warn(`GitHub fetch error for ${filePath}:`, err)
    return null
  }
}

/**
 * Commit or update a file in the GitHub repository
 */
export async function putGitHubFile(
  filePath: string,
  contentBase64: string,
  message: string,
  sha?: string
) {
  if (!TOKEN) return null

  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${filePath}`
  const body: Record<string, unknown> = {
    message,
    content: contentBase64,
    branch: BRANCH,
  }

  // If SHA was not provided, attempt to fetch existing SHA to prevent 422 conflicts
  if (!sha) {
    const existing = await getGitHubFile(filePath)
    if (existing?.sha) {
      body.sha = existing.sha
    }
  } else {
    body.sha = sha
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'JJTravels-Admin',
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const errorText = await res.text()
    throw new Error(`Failed to commit ${filePath} to GitHub: ${errorText}`)
  }

  return await res.json()
}

/**
 * Read JSON data: attempts GitHub fetch first if TOKEN exists, falls back to local filesystem
 */
export async function readJsonData<T>(relativePath: string, defaultData: T): Promise<T> {
  // 1. Try reading from GitHub repository on production / if token configured
  if (TOKEN) {
    try {
      const ghFile = await getGitHubFile(relativePath)
      if (ghFile && ghFile.content) {
        const decoded = Buffer.from(ghFile.content, 'base64').toString('utf-8')
        const parsed = JSON.parse(decoded) as T
        // Also update local copy in development
        try {
          const localPath = resolveLocalPath(relativePath)
          await fs.mkdir(path.dirname(localPath), { recursive: true })
          await fs.writeFile(localPath, JSON.stringify(parsed, null, 2), 'utf-8')
        } catch {
          // Ignore local write error in read-only environments
        }
        return parsed
      }
    } catch (err) {
      console.warn(`GitHub read failed for ${relativePath}, falling back to local file:`, err)
    }
  }

  // 2. Read from local filesystem
  try {
    const localPath = resolveLocalPath(relativePath)
    const raw = await fs.readFile(localPath, 'utf-8')
    return JSON.parse(raw) as T
  } catch {
    return defaultData
  }
}

/**
 * Save JSON data: writes to local filesystem and commits to GitHub repository
 */
export async function saveJsonData<T>(
  relativePath: string,
  data: T,
  commitMessage: string
): Promise<{ success: boolean; sha?: string }> {
  const jsonString = JSON.stringify(data, null, 2)
  const base64Content = Buffer.from(jsonString, 'utf-8').toString('base64')

  // 1. Write to local filesystem immediately for fast feedback
  try {
    const localPath = resolveLocalPath(relativePath)
    await fs.mkdir(path.dirname(localPath), { recursive: true })
    await fs.writeFile(localPath, jsonString, 'utf-8')
  } catch (fsErr) {
    console.warn(`Local file write warning for ${relativePath}:`, fsErr)
  }

  // 2. Commit to GitHub if TOKEN is configured
  let commitResult = null
  if (TOKEN) {
    try {
      commitResult = await putGitHubFile(relativePath, base64Content, commitMessage)
    } catch (ghErr) {
      console.error(`GitHub commit failed for ${relativePath}:`, ghErr)
      throw ghErr
    }
  }

  return {
    success: true,
    sha: commitResult?.content?.sha,
  }
}

/**
 * Save an uploaded image file: saves locally and commits base64 to GitHub
 */
export async function saveUploadedImage(
  folderPath: string, // e.g. "public/images/packages"
  file: File,
  commitPrefix = 'admin: upload image'
): Promise<{ filePath: string; publicUrl: string; dataUrl: string; rawUrl?: string }> {
  const buffer = Buffer.from(await file.arrayBuffer())
  const base64Content = buffer.toString('base64')

  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg'
  const cleanName = file.name
    .replace(/\.[^/.]+$/, '')
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, '-')
    .replace(/-+/g, '-')

  const uniqueId = Date.now()
  const fileName = `${uniqueId}-${cleanName}.${ext}`
  const repoFilePath = `${folderPath.replace(/^\/+/, '')}/${fileName}`

  // Public URL accessible on the web
  const publicUrl = `/${repoFilePath.replace(/^public\//, '')}`
  const dataUrl = `data:image/${ext};base64,${base64Content}`
  const rawUrl = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${repoFilePath}`

  // 1. Write locally
  try {
    const localPath = resolveLocalPath(repoFilePath)
    await fs.mkdir(path.dirname(localPath), { recursive: true })
    await fs.writeFile(localPath, buffer)
  } catch (fsErr) {
    console.warn(`Local image write warning:`, fsErr)
  }

  // 2. Commit to GitHub
  if (TOKEN) {
    try {
      await putGitHubFile(
        repoFilePath,
        base64Content,
        `${commitPrefix} ${fileName}`
      )
    } catch (ghErr) {
      console.warn(`GitHub image commit warning for ${fileName}:`, ghErr)
    }
  }

  return {
    filePath: repoFilePath,
    publicUrl,
    dataUrl,
    rawUrl,
  }
}
