import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useLang } from '../i18n'
import { useContent } from '../content'

export default function Home() {
  const { t, tl } = useLang()
  const { hero, promo, about, therapies, business } = useContent()

  return (
    <>
      <section className="border-b border-line">
        <div className="wrap grid items-center gap-10 py-12 md:grid-cols-2 md:gap-14 md:py-16">
          <div>
            <h1 className="text-4xl leading-[1.08] md:text-5xl lg:text-6xl">{t(hero.title)}</h1>
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
            <div className="flex aspect-[3/2] items-center justify-center bg-[#3ac1cc]">
              <img src={hero.image} alt="" className="max-h-full w-full object-contain" />
            </div>
          )}
        </div>
      </section>

      <section className="wrap grid gap-12 py-20 md:grid-cols-2 md:items-center">
        <div className={`flex items-center justify-center overflow-hidden ${about.photo ? 'aspect-square' : 'aspect-[4/5]'}`}>
          {about.photo ? (
            <img src={about.photo} alt={business.owner} className="h-full w-full object-cover" />
          ) : (
            <img src="/logo.png" alt={business.name} className="w-3/4" />
          )}
        </div>
        <div>
          <p className="eyebrow">{t({ en: 'Therapist', es: 'Terapeuta' })}</p>
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

      <section className="wrap py-16 text-center">
        <Link to="/shop" className="btn">
          {t({ en: 'Discover our products', es: 'Conoce nuestros productos' })} <ArrowRight size={16} />
        </Link>
      </section>
    </>
  )
}
