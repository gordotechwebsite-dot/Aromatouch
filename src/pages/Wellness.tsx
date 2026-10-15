import { Link } from 'react-router-dom'
import { useLang } from '../i18n'
import { useContent } from '../content'
import PageHead from '../components/PageHead'

export default function Wellness() {
  const { t } = useLang()
  const { tips, products } = useContent()
  return (
    <>
      <PageHead
        eyebrow={t({ en: 'Wellness', es: 'Bienestar' })}
        title={t({ en: 'Wellness tips from Nayibe', es: 'Consejos de bienestar de Nayibe' })}
        intro={t({
          en: 'Simple ways to use essential oils safely in everyday life, written for the Arizona climate.',
          es: 'Formas sencillas de usar aceites esenciales con seguridad en el día a día, pensadas para el clima de Arizona.',
        })}
      />
      <div className="wrap grid gap-x-10 gap-y-12 py-14 md:grid-cols-2">
        {tips.map((tip, i) => {
          const p = tip.product ? products.find((x) => x.slug === tip.product) : undefined
          return (
            <article key={i} className="border-t border-ink pt-6">
              <p className="font-serif text-lg text-gold">{String(i + 1).padStart(2, '0')}</p>
              <h2 className="mt-1 text-3xl">{t(tip.title)}</h2>
              <p className="mt-4 leading-relaxed text-ink/75">{t(tip.body)}</p>
              {p && (
                <Link to={`/shop/${p.slug}`} className="link mt-4 inline-block text-sm">
                  {t(p.name)}
                </Link>
              )}
            </article>
          )
        })}
      </div>
    </>
  )
}
