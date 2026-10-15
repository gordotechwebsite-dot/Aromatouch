import type { VercelRequest, VercelResponse } from '@vercel/node'
import { readBlob } from './_lib.js'

const types: Record<string, string> = { webp: 'image/webp', jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png' }

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const p = String(req.query.p || '')
  if (!/^uploads\/[\w.-]+$/.test(p)) return res.status(400).end()
  const buf = await readBlob(p)
  if (!buf) return res.status(404).end()
  res.setHeader('Content-Type', types[p.split('.').pop() || ''] || 'application/octet-stream')
  res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
  return res.status(200).send(buf)
}
