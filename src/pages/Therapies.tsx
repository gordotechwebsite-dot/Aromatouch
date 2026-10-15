import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useLang } from '../i18n'
import { useContent } from '../content'
import PageHead from '../components/PageHead'

export default function Therapies() {
  const { t, tl } = useLang()
  const { therapies, promo } = useContent()
  return (
    <>
      <PageHead
        eyebrow={t({ en: 'Therapies', es: 'Terapias' })}
        title={t({ en: 'Essential oil therapy, at your home', es: 'Terapia con aceites esenciales, en tu casa' })}
        intro={t(promo.text)}
      />
      <div className="wrap divide-y divide-line">
        {therapies.map((th) => (
          <section key={th.id} id={th.id} className="grid gap-8 py-14 md:grid-cols-[1fr_1.4fr]">
            <div>
              <h2 className="text-4xl">{t(th.name)}</h2>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-ink/60">
                {th.duration && <span>{th.duration}</span>}
                {th.price && <span className="font-serif text-3xl text-gold">{th.price}</span>}
              </div>
              {th.image && (
                <div className="mt-6 aspect-[4/3] overflow-hidden rounded-xl bg-sand">
                  <img src={th.image} alt={t(th.name)} className="h-full w-full object-cover" />
                </div>
              )}
            </div>
            <div>
              <p className="text-lg leading-relaxed text-ink/80">{t(th.summary)}</p>
              {th.benefits && tl(th.benefits).length > 0 && (
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {tl(th.benefits).map((b, i) => (
                    <li key={i} className="flex gap-2 text-sm">
                      <Check size={16} className="mt-0.5 shrink-0 text-teal" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <ul className="mt-6 space-y-2 border-t border-line pt-6 text-sm text-ink/70">
                {tl(th.details).map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
              <Link to={`/book?therapy=${th.id}`} className="btn mt-8">
                {t(promo.cta)}
              </Link>
            </div>
          </section>
        ))}
      </div>
    </>
  )
}
