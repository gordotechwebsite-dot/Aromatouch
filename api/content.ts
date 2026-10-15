import type { VercelRequest, VercelResponse } from '@vercel/node'
import { CONTENT_PATH, readJson } from './_lib.js'

export default async function handler(_req: VercelRequest, res: VercelResponse) {
  res.setHeader('Cache-Control', 'no-store')
  const data = await readJson(CONTENT_PATH)
  if (!data) return res.status(404).json({ error: 'not_found' })
  return res.status(200).json(data)
}
