import type { Lang } from '../i18n'

export function time12(h: number, m: number, lang: Lang) {
  const hh = h % 12 === 0 ? 12 : h % 12
  const mm = String(m).padStart(2, '0')
  if (lang === 'es') return `${hh}:${mm} ${h < 12 ? 'a. m.' : 'p. m.'}`
  return `${hh}:${mm} ${h < 12 ? 'AM' : 'PM'}`
}

export const slots: [number, number][] = Array.from({ length: 23 }, (_, i) => [8 + Math.floor(i / 2), (i % 2) * 30])
