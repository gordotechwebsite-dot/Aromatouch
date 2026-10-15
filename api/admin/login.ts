import type { VercelRequest, VercelResponse } from '@vercel/node'
import { checkPassword, makeToken } from '../_lib.js'

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const password = String((req.body || {}).password || '')
  if (!checkPassword(password)) return res.status(401).json({ error: 'invalid_password' })
  return res.status(200).json({ token: makeToken() })
}
