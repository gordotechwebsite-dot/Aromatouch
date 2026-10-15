import crypto from 'node:crypto'
import { put } from '@vercel/blob'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAdmin } from '../_lib.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' })
  if (req.method !== 'POST') return res.status(405).end()
  const data = String((req.body || {}).data || '')
  const buf = Buffer.from(data, 'base64')
  if (!buf.length || buf.length > 4 * 1024 * 1024) return res.status(400).json({ error: 'invalid_image' })
  const pathname = `uploads/${Date.now()}-${crypto.randomBytes(4).toString('hex')}.webp`
  await put(pathname, buf, { access: 'private', contentType: 'image/webp', addRandomSuffix: false })
  return res.status(201).json({ url: `/api/media?p=${pathname}` })
}
