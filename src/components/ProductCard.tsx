import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { money } from '../content'
import type { Product } from '../data/products'

export default function ProductCard({ p }: { p: Product }) {
  const { t, tl } = useLang()
  return (
    <Link to={`/shop/${p.slug}`} className="group block">
      <div className="flex aspect-[3/2] items-center justify-center p-2">
        <img src={p.image} alt={t(p.name)} className="max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" loading="lazy" />
      </div>
      <h3 className="mt-3 text-xl leading-tight">{t(p.name)}</h3>
      <p className="mt-1 text-sm text-ink/60">{t(p.tagline)} · {p.size}</p>
      <p className="mt-1 text-sm font-medium">{money(p.retail)}</p>
      {tl(p.benefits).length > 0 && (
        <ul className="mt-3 space-y-1.5 text-sm leading-snug text-ink/70">
          {tl(p.benefits).map((b, i) => (
            <li key={i} className="border-l border-gold pl-2">{b}</li>
          ))}
        </ul>
      )}
    </Link>
  )
}
