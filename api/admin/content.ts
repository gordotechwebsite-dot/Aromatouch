import type { VercelRequest, VercelResponse } from '@vercel/node'
import { CONTENT_PATH, isAdmin, writeJson } from '../_lib.js'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!isAdmin(req)) return res.status(401).json({ error: 'unauthorized' })
  if (req.method !== 'PUT') return res.status(405).end()
  const body = req.body
  if (!body || typeof body !== 'object' || !Array.isArray(body.products) || !body.business) {
    return res.status(400).json({ error: 'invalid_content' })
  }
  await writeJson(CONTENT_PATH, body)
  return res.status(200).json({ ok: true })
}
