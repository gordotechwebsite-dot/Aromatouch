import { del, list } from '@vercel/blob'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { isAdmin, readJson } from '../_lib.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' })
  if (req.method === 'DELETE') {
    const id = String(req.query.id || '')
    if (!/^[\w-]+$/.test(id)) return res.status(400).end()
    await del(`bookings/${id}.json`)
    return res.status(200).json({ ok: true })
  }
  if (req.method !== 'GET') return res.status(405).end()
  const { blobs } = await list({ prefix: 'bookings/', limit: 1000 })
  const recent = blobs.sort((a, b) => b.pathname.localeCompare(a.pathname)).slice(0, 200)
  const items = await Promise.all(recent.map((b) => readJson(b.pathname)))
  res.setHeader('Cache-Control', 'no-store')
  return res.status(200).json(items.filter(Boolean))
}
