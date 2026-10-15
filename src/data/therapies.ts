import type { T, TList } from '../i18n'

export type Therapy = {
  id: string
  name: T
  summary: T
  details: TList
  duration?: string
  price?: string
  image?: string
  benefits?: TList
}

// duration y price se muestran solo cuando tienen valor.
export const therapies: Therapy[] = [
  {
    id: 'aromatouch-technique',
    name: { en: 'AromaTouch Technique', es: 'Técnica AromaTouch' },
    summary: {
      en: 'The full AromaTouch experience: a sequence of eight essential oils applied by hand along the back and feet, combined with calm, deliberate touch.',
      es: 'La experiencia AromaTouch completa: una secuencia de ocho aceites esenciales aplicados a mano en la espalda y los pies, con un contacto tranquilo y preciso.',
    },
    details: {
      en: [
        'Four phases: stress reduction, immune enhancement, inflammatory response and homeostasis.',
        'Oils used: Balance, Lavender, Melaleuca, On Guard, AromaTouch, Deep Blue, Wild Orange and Peppermint.',
        'Ideal to reset after a demanding week.',
      ],
      es: [
        'Cuatro fases: reducción del estrés, refuerzo inmunológico, respuesta inflamatoria y homeostasis.',
        'Aceites: Balance, Lavanda, Melaleuca, On Guard, AromaTouch, Deep Blue, Naranja Silvestre y Menta.',
        'Ideal para recuperarte después de una semana exigente.',
      ],
    },
    price: '$77',
    benefits: {
      en: [
        'Helps reduce stress and anxiety',
        'Supports a healthy immune system',
        'Physical and emotional well-being',
        'Promotes balance, relaxation and harmony',
      ],
      es: [
        'Ayuda a reducir el estrés y la ansiedad',
        'Apoya el bienestar del sistema inmunológico',
        'Brinda bienestar físico y emocional',
        'Promueve equilibrio, relajación y armonía',
      ],
    },
  },
  {
    id: 'hand-technique',
    name: { en: 'AromaTouch Hand Technique', es: 'Técnica de Manos AromaTouch' },
    summary: {
      en: 'A shorter session focused on the hands, using the AromaTouch blend. Comfortable seated, perfect for seniors or anyone who prefers not to lie down.',
      es: 'Una sesión más corta enfocada en las manos con la mezcla AromaTouch. Se recibe sentado, perfecta para adultos mayores o para quien prefiere no acostarse.',
    },
    details: {
      en: ['Seated and fully clothed.', 'A thoughtful gift for a loved one.'],
      es: ['Sentado y con ropa.', 'Un regalo especial para un ser querido.'],
    },
  },
  {
    id: 'custom-oils',
    name: { en: 'Personalized Oil Session', es: 'Sesión personalizada de aceites' },
    summary: {
      en: 'Nayibe chooses the oils with you: Lavender to unwind, Peppermint to cool, Cypress to invigorate, Marjoram to soothe, Grapefruit to uplift.',
      es: 'Nayibe elige los aceites contigo: Lavanda para relajarte, Menta para refrescar, Ciprés para revitalizar, Mejorana para calmar, Toronja para animar.',
    },
    details: {
      en: ['Focused on neck, shoulders, back or legs.', 'Great after hiking or training.'],
      es: ['Enfocada en cuello, hombros, espalda o piernas.', 'Excelente después de caminatas o entrenamiento.'],
    },
  },
]
