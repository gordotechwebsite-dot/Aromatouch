import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang, T, TList } from './i18n'
import { business, serviceAreas } from './data/business'
import { products, type Product } from './data/products'
import { therapies, type Therapy } from './data/therapies'
import { tips, type Tip } from './data/tips'
import { gallery, type Photo } from './data/gallery'

export type Business = typeof business
export type SiteContent = {
  business: Business
  hero: { eyebrow: T; title: T; subtitle: T; image: string }
  promo: { title: T; text: T; cta: T }
  about: { title: T; body: TList; photo: string }
  serviceAreas: string[]
  therapies: Therapy[]
  products: Product[]
  tips: Tip[]
  gallery: Photo[]
}

// eslint-disable-next-line react-refresh/only-export-components
export const defaultContent: SiteContent = {
  business,
  hero: {
    eyebrow: { en: 'Scottsdale · Greater Phoenix', es: 'Scottsdale · Área de Phoenix' },
    title: {
      en: 'The Incredible AromaTouch Technique',
      es: 'La Increíble Técnica de AromaTouch',
    },
    subtitle: {
      en: 'Essential oil therapy with eight pure doTERRA oils, at your home in Scottsdale and the Phoenix metro area.',
      es: 'Terapia con ocho aceites esenciales puros doTERRA, en tu casa en Scottsdale y el área metropolitana de Phoenix.',
    },
    image: '/products/aromatouch-massage-blend-oil.webp',
  },
  promo: {
    title: { en: 'Home visits', es: 'Servicio a domicilio' },
    text: {
      en: 'Treat yourself to a moment just for you. Nayibe brings the table, the oils and the calm to your home anywhere in Scottsdale and the Phoenix metro area.',
      es: 'Regálate un momento para ti. Nayibe lleva la camilla, los aceites y la calma a tu casa en Scottsdale y el área metropolitana de Phoenix.',
    },
    cta: { en: 'Book your experience', es: 'Agenda tu experiencia' },
  },
  about: {
    title: { en: 'Meet Nayibe Alarcon', es: 'Conoce a Nayibe Alarcon' },
    body: {
      en: [
        'Nayibe Alarcon is the therapist behind AromaTouch by Nayibe A. She brings the AromaTouch Technique to Scottsdale and the Phoenix area with one idea: every session should feel personal.',
        'She listens first, chooses the oils with you and applies them by hand, step by step, so you leave lighter, calmer and cared for. Sessions in English and Spanish.',
      ],
      es: [
        'Nayibe Alarcon es la terapeuta de AromaTouch by Nayibe A. Lleva la Técnica AromaTouch a Scottsdale y el área de Phoenix con una idea: cada sesión debe sentirse personal.',
        'Primero escucha, elige los aceites contigo y los aplica a mano, paso a paso, para que salgas más liviano, tranquilo y cuidado. Sesiones en español e inglés.',
      ],
    },
    photo: '/about/nayibe.webp',
  },
  serviceAreas,
  therapies,
  products,
  tips,
  gallery,
}

const ContentContext = createContext<SiteContent>(defaultContent)

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent)

  useEffect(() => {
    fetch('/api/content')
      .then((r) => (r.ok ? r.json() : null))
      .then((d: Partial<SiteContent> | null) => {
        if (d && typeof d === 'object') setContent({ ...defaultContent, ...d })
      })
      .catch(() => {})
  }, [])

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export const useContent = () => useContext(ContentContext)

// eslint-disable-next-line react-refresh/only-export-components
export function buyUrl(p: Product, lang: Lang, ownerId: string) {
  if (p.buyUrl) return p.buyUrl
  return `https://www.doterra.com/US/${lang}/p/${p.slug}?OwnerID=${ownerId}`
}

// eslint-disable-next-line react-refresh/only-export-components
export const money = (n: number) => `$${n.toFixed(2)}`

// eslint-disable-next-line react-refresh/only-export-components
export const waLink = (number: string, text: string) =>
  `https://wa.me/${number.replace(/\D/g, '')}?text=${encodeURIComponent(text)}`

// eslint-disable-next-line react-refresh/only-export-components
export const prettyPhone = (n: string) => {
  const d = n.replace(/\D/g, '')
  return d.length === 11 && d.startsWith('1') ? `+1 (${d.slice(1, 4)}) ${d.slice(4, 7)}-${d.slice(7)}` : `+${d}`
}
