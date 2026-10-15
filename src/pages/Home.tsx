import { Link } from 'react-router-dom'
import { ArrowRight, Home as HomeIcon } from 'lucide-react'
import { useLang } from '../i18n'
import { useContent } from '../content'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const { t, tl } = useLang()
  const { hero, promo, about, therapies, products, tips, serviceAreas, business } = useContent()
  const main = therapies[0]

  return (
    <>
      <section className="border-b border-line">
        <div className="wrap grid items-center gap-10 py-14 md:grid-cols-[1.1fr_0.9fr] md:py-20">
          <div>
            <p className="eyebrow">{t(hero.eyebrow)}</p>
            <h1 className="mt-4 text-5xl leading-[1.05] md:text-7xl">{t(hero.title)}</h1>
            <p className="mt-6 max-w-xl text-lg text-ink/70">{t(hero.subtitle)}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/book" className="btn">
                {t(promo.cta)} <ArrowRight size={16} />
              </Link>
              <Link to="/therapies" className="btn-line">
                {t({ en: 'See therapies', es: 'Ver terapias' })}
              </Link>
            </div>
          </div>
          {hero.image && (
            <div className="aspect-[4/5] overflow-hidden rounded-xl bg-sand">
              <img src={hero.image} alt="" className="h-full w-full object-cover" />
            </div>
          )}
        </div>
      </section>

      <section className="bg-ink text-cream">
        <div className="wrap grid gap-8 py-14 md:grid-cols-[auto_1fr_auto] md:items-center">
          <HomeIcon size={40} strokeWidth={1.2} className="text-gold-light" />
          <div>
            <h2 className="text-3xl md:text-4xl">{t(promo.title)}</h2>
            <p className="mt-3 max-w-2xl text-cream/75">{t(promo.text)}</p>
          </div>
          {main?.price && (
            <div className="border-l border-cream/20 pl-8">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-light">{t(main.name)}</p>
              <p className="font-serif text-6xl">{main.price}</p>
            </div>
          )}
        </div>
      </section>

      <section className="wrap grid gap-12 py-20 md:grid-cols-2 md:items-center">
        <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-sand">
          {about.photo ? (
            <img src={about.photo} alt={business.owner} className="h-full w-full object-cover" />
          ) : (
            <img src="/logo.png" alt={business.name} className="w-3/4" />
          )}
        </div>
        <div>
          <p className="eyebrow">{t({ en: 'Founder & therapist', es: 'Creadora y terapeuta' })}</p>
          <h2 className="mt-3 text-4xl md:text-5xl">{t(about.title)}</h2>
          {tl(about.body).map((p, i) => (
            <p key={i} className="mt-5 leading-relaxed text-ink/75">
              {p}
            </p>
          ))}
          <Link to="/book" className="btn mt-8">
            {t({ en: `Book with ${business.owner.split(' ')[0]}`, es: `Reserva con ${business.owner.split(' ')[0]}` })}
          </Link>
        </div>
      </section>

      <section className="border-y border-line">
        <div className="wrap py-20">
          <div className="flex items-end justify-between gap-6">
            <h2 className="text-4xl md:text-5xl">{t({ en: 'Therapies', es: 'Terapias' })}</h2>
            <Link to="/therapies" className="link text-sm">
              {t({ en: 'All therapies', es: 'Todas las terapias' })}
            </Link>
          </div>
          <div className="mt-10 divide-y divide-line border-t border-line">
            {therapies.map((th) => (
              <Link key={th.id} to="/therapies" className="grid gap-3 py-7 md:grid-cols-[1fr_2fr_auto] md:items-baseline">
                <h3 className="text-2xl">{t(th.name)}</h3>
                <p className="text-ink/70">{t(th.summary)}</p>
                <p className="font-serif text-2xl text-gold">{th.price}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-20">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="eyebrow">doTERRA</p>
            <h2 className="mt-3 text-4xl md:text-5xl">{t({ en: 'The oils of AromaTouch', es: 'Los aceites de AromaTouch' })}</h2>
          </div>
          <Link to="/shop" className="link text-sm">
            {t({ en: 'Shop all', es: 'Ver tienda' })}
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.slug} p={p} />
          ))}
        </div>
      </section>

      {tips.length > 0 && (
        <section className="border-y border-line bg-sand/60">
          <div className="wrap py-20">
            <div className="flex items-end justify-between gap-6">
              <h2 className="text-4xl md:text-5xl">{t({ en: 'Wellness tips', es: 'Consejos de bienestar' })}</h2>
              <Link to="/wellness" className="link text-sm">
                {t({ en: 'All tips', es: 'Todos los consejos' })}
              </Link>
            </div>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {tips.slice(0, 3).map((tip, i) => (
                <article key={i} className="border-t border-ink pt-5">
                  <h3 className="text-2xl">{t(tip.title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink/70">{t(tip.body)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="wrap py-20 text-center">
        <p className="eyebrow">{t({ en: 'Where we go', es: 'Dónde atendemos' })}</p>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl md:text-5xl">
          {t({ en: 'Scottsdale and the Phoenix metro area', es: 'Scottsdale y el área metropolitana de Phoenix' })}
        </h2>
        <p className="mx-auto mt-6 max-w-3xl leading-loose text-ink/70">{serviceAreas.join(' · ')}</p>
        <Link to="/book" className="btn mt-10">
          {t(promo.cta)}
        </Link>
      </section>
    </>
  )
}
