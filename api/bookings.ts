import crypto from 'node:crypto'
import type { VercelRequest, VercelResponse } from '@vercel/node'
import { writeJson } from './_lib.js'

const fields = ['name', 'phone', 'email', 'therapy', 'date', 'time', 'city', 'address', 'notes', 'lang'] as const

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).end()
  const body = (req.body || {}) as Record<string, unknown>
  const booking: Record<string, string> = {}
  for (const f of fields) booking[f] = String(body[f] ?? '').slice(0, f === 'notes' ? 2000 : 200).trim()
  if (!booking.name || !booking.phone) return res.status(400).json({ error: 'name_and_phone_required' })
  const createdAt = new Date().toISOString()
  const id = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}`
  await writeJson(`bookings/${id}.json`, { id, createdAt, ...booking })
  return res.status(201).json({ ok: true })
}
