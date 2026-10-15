import crypto from 'node:crypto'
import { get, put } from '@vercel/blob'
import type { VercelRequest } from '@vercel/node'

const key = () => `${process.env.ADMIN_SECRET || ''}:${process.env.ADMIN_PASSWORD || ''}`
const mac = (s: string) => crypto.createHmac('sha256', key()).update(s).digest('hex')

export function makeToken() {
  const exp = String(Date.now() + 7 * 24 * 60 * 60 * 1000)
  return `${exp}.${mac(exp)}`
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD
  if (!expected) return false
  const a = Buffer.from(mac(`pw:${password}`))
  const b = Buffer.from(mac(`pw:${expected}`))
  return crypto.timingSafeEqual(a, b)
}

export function isAdmin(req: VercelRequest) {
  if (!process.env.ADMIN_PASSWORD) return false
  const token = (req.headers.authorization || '').replace(/^Bearer\s+/i, '')
  const [exp, sig] = token.split('.')
  if (!exp || !sig || Number(exp) < Date.now()) return false
  const good = Buffer.from(mac(exp))
  const got = Buffer.from(sig)
  return good.length === got.length && crypto.timingSafeEqual(good, got)
}

export async function readBlob(pathname: string) {
  try {
    const r = await get(pathname, { access: 'private', useCache: false })
    if (!r || r.statusCode !== 200) return null
    return Buffer.from(await new Response(r.stream).arrayBuffer())
  } catch {
    return null
  }
}

export async function readJson<T>(pathname: string): Promise<T | null> {
  const buf = await readBlob(pathname)
  return buf ? (JSON.parse(buf.toString('utf8')) as T) : null
}

export function writeJson(pathname: string, data: unknown) {
  return put(pathname, JSON.stringify(data), {
    access: 'private',
    contentType: 'application/json',
    addRandomSuffix: false,
    allowOverwrite: true,
  })
}

export const CONTENT_PATH = 'site/content.json'
