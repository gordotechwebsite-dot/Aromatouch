import type { T } from '../i18n'

export type Photo = { src: string; caption: T }

// Reemplazar o ampliar con fotos propias (public/gallery/...).
export const gallery: Photo[] = [
  { src: '/products/aromatouch-massage-blend-oil.webp', caption: { en: 'AromaTouch Massage Blend', es: 'Mezcla de masaje AromaTouch' } },
  { src: '/products/lavender-oil.webp', caption: { en: 'Lavender', es: 'Lavanda' } },
  { src: '/products/peppermint-oil.webp', caption: { en: 'Peppermint', es: 'Menta' } },
  { src: '/products/cypress-oil.webp', caption: { en: 'Cypress', es: 'Ciprés' } },
  { src: '/products/marjoram-oil.webp', caption: { en: 'Marjoram', es: 'Mejorana' } },
  { src: '/products/basil-oil.webp', caption: { en: 'Basil', es: 'Albahaca' } },
  { src: '/products/grapefruit-oil.webp', caption: { en: 'Grapefruit', es: 'Toronja' } },
]
