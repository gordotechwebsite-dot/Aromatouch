import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { useLang } from '../i18n'
import { buyUrl, money, useContent } from '../content'
import ProductCard from '../components/ProductCard'

export default function Product() {
  const { slug } = useParams()
  const { t, tl, lang } = useLang()
  const { products, business } = useContent()
  const p = products.find((x) => x.slug === slug)

  if (!p) {
    return (
      <div className="wrap py-24">
        <Link to="/shop" className="link">{t({ en: 'Back to shop', es: 'Volver a la tienda' })}</Link>
      </div>
    )
  }

  const lists = [
    { title: { en: 'Benefits', es: 'Beneficios' }, items: tl(p.benefits) },
    { title: { en: 'Uses', es: 'Usos' }, items: tl(p.uses) },
    { title: { en: 'Directions', es: 'Instrucciones de uso' }, items: tl(p.directions) },
  ].filter((l) => l.items.length > 0)

  return (
    <>
      <div className="wrap pt-8">
        <Link to="/shop" className="link inline-flex items-center gap-1 text-sm">
          <ArrowLeft size={14} /> {t({ en: 'Shop', es: 'Tienda' })}
        </Link>
      </div>
      <section className="wrap grid gap-10 py-10 md:grid-cols-2">
        <div className="aspect-square overflow-hidden rounded-xl bg-sand">
          <img src={p.image} alt={t(p.name)} className="h-full w-full object-cover" />
        </div>
        <div>
          <p className="eyebrow">{t(p.tagline)}</p>
          <h1 className="mt-3 text-5xl leading-tight">{t(p.name)}</h1>
          <p className="mt-2 text-sm text-ink/60">
            {p.size} · {t({ en: 'Item', es: 'Artículo' })} {p.item}
          </p>
          <div className="mt-6 grid grid-cols-2 border-y border-line">
            <div className="py-4">
              <p className="text-xs uppercase tracking-widest text-ink/50">{t({ en: 'Retail', es: 'Precio regular' })}</p>
              <p className="mt-1 font-serif text-4xl">{money(p.retail)}</p>
            </div>
            <div className="border-l border-line py-4 pl-6">
              <p className="text-xs uppercase tracking-widest text-ink/50">{t({ en: 'Wholesale', es: 'Precio mayorista' })}</p>
              <p className="mt-1 font-serif text-4xl text-teal">{money(p.wholesale)}</p>
            </div>
          </div>
          <a href={buyUrl(p, lang, business.doterraOwnerId)} target="_blank" rel="noreferrer" className="btn mt-6 w-full sm:w-auto">
            {t({ en: 'Buy on doTERRA', es: 'Comprar en doTERRA' })} <ExternalLink size={15} />
          </a>
          <p className="mt-6 leading-relaxed text-ink/80">{t(p.description)}</p>
        </div>
      </section>

      <section className="wrap grid gap-10 border-t border-line py-14 md:grid-cols-3">
        {lists.map((l) => (
          <div key={l.title.en}>
            <h2 className="text-2xl">{t(l.title)}</h2>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-ink/75">
              {l.items.map((it, i) => (
                <li key={i} className="border-l border-gold pl-3">{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="wrap">
        <div className="border border-line bg-white p-6 text-sm leading-relaxed text-ink/70">
          <p className="font-medium text-ink">{t({ en: 'Cautions', es: 'Precauciones' })}</p>
          <p className="mt-2">
            {t({
              en: 'Possible skin sensitivity. Keep out of reach of children. If you are pregnant, nursing or under a doctor’s care, consult your physician. Avoid contact with eyes, inner ears and sensitive areas.',
              es: 'Posible sensibilidad en la piel. Mantener fuera del alcance de los niños. Si estás embarazada, lactando o bajo cuidado médico, consulta a tu médico. Evita el contacto con los ojos, el oído interno y las zonas sensibles.',
            })}
          </p>
          {p.sunSensitive && (
            <p className="mt-2">
              {t({
                en: 'Avoid sunlight or UV rays for up to 12 hours after applying the product.',
                es: 'Evita la luz solar o los rayos UV hasta por 12 horas después de aplicar el producto.',
              })}
            </p>
          )}
          {p.fdaNote && (
            <p className="mt-2 text-xs text-ink/50">
              {t({
                en: '*These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure or prevent any disease.',
                es: '*Estas declaraciones no han sido evaluadas por la FDA. Este producto no pretende diagnosticar, tratar, curar ni prevenir ninguna enfermedad.',
              })}
            </p>
          )}
        </div>
      </section>

      <section className="wrap py-16">
        <h2 className="text-3xl">{t({ en: 'More oils', es: 'Más aceites' })}</h2>
        <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {products.filter((x) => x.slug !== p.slug).slice(0, 4).map((x) => (
            <ProductCard key={x.slug} p={x} />
          ))}
        </div>
      </section>
    </>
  )
}
