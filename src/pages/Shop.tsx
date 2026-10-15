import { useLang } from '../i18n'
import { useContent } from '../content'
import PageHead from '../components/PageHead'
import ProductCard from '../components/ProductCard'

export default function Shop() {
  const { t } = useLang()
  const { products } = useContent()
  return (
    <>
      <PageHead
        eyebrow={t({ en: 'Shop', es: 'Tienda' })}
        title={t({ en: 'doTERRA essential oils', es: 'Aceites esenciales doTERRA' })}
        intro={t({
          en: 'The AromaTouch Massage Blend and the six oils that make it. Orders are placed securely on doTERRA.com under Nayibe’s account.',
          es: 'La mezcla de masaje AromaTouch y los seis aceites que la componen. Las compras se hacen de forma segura en doTERRA.com con la cuenta de Nayibe.',
        })}
      />
      <div className="wrap grid grid-cols-2 gap-x-5 gap-y-12 py-14 md:grid-cols-3 lg:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.slug} p={p} />
        ))}
      </div>
    </>
  )
}
