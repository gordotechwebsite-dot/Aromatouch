import type { T } from '../i18n'

export type Tip = { title: T; body: T; product?: string }

export const tips: Tip[] = [
  {
    title: { en: 'Arizona sun and oils', es: 'El sol de Arizona y los aceites' },
    body: {
      en: 'Grapefruit and the AromaTouch blend can make skin sensitive to sunlight. After applying them, avoid direct sun and UV rays for at least 12 hours. Plan topical use for the evening.',
      es: 'La Toronja y la mezcla AromaTouch pueden volver la piel sensible al sol. Después de aplicarlas, evita el sol directo y los rayos UV por al menos 12 horas. Úsalas de noche.',
    },
    product: 'grapefruit-oil',
  },
  {
    title: { en: 'Always dilute', es: 'Siempre diluye' },
    body: {
      en: 'One or two drops go a long way. Mix them with a carrier oil, such as fractionated coconut oil, to minimize skin sensitivity, and keep oils away from eyes, inner ears and sensitive areas.',
      es: 'Una o dos gotas rinden mucho. Mézclalas con un aceite portador, como el de coco fraccionado, para minimizar la sensibilidad, y mantén los aceites lejos de ojos, oídos y zonas sensibles.',
    },
  },
  {
    title: { en: 'A soothing soak', es: 'Un baño relajante' },
    body: {
      en: 'Add a few drops of the AromaTouch blend to Epsom salts and stir them into running bathwater. A simple way to extend the calm of a session at home.',
      es: 'Agrega unas gotas de la mezcla AromaTouch a sales de Epsom y disuélvelas en el agua corriente de la tina. Una forma sencilla de prolongar en casa la calma de la sesión.',
    },
    product: 'aromatouch-massage-blend-oil',
  },
  {
    title: { en: 'Wind down at night', es: 'Relájate en la noche' },
    body: {
      en: 'As the day settles, place three to four drops of Lavender in your diffuser. Its gentle aroma helps create a peaceful environment for rest.',
      es: 'Cuando el día se calma, pon de tres a cuatro gotas de Lavanda en tu difusor. Su aroma suave ayuda a crear un ambiente tranquilo para descansar.',
    },
    product: 'lavender-oil',
  },
  {
    title: { en: 'Before and after a hike', es: 'Antes y después de caminar' },
    body: {
      en: 'Heading to Camelback or Pinnacle Peak? Apply diluted Cypress to feet and legs before a long walk, and Marjoram before and after exercise for a soothing sensation.',
      es: '¿Vas a Camelback o Pinnacle Peak? Aplica Ciprés diluido en pies y piernas antes de una caminata larga, y Mejorana antes y después del ejercicio para una sensación calmante.',
    },
    product: 'cypress-oil',
  },
  {
    title: { en: 'Afternoon focus', es: 'Concentración en la tarde' },
    body: {
      en: 'Place a drop of Peppermint in your palm and inhale, or diffuse three to four drops. Its refreshing aroma supports focus and motivation.',
      es: 'Pon una gota de Menta en la palma de la mano e inhala, o difunde de tres a cuatro gotas. Su aroma refrescante favorece la concentración y la motivación.',
    },
    product: 'peppermint-oil',
  },
  {
    title: { en: 'Neck and shoulders', es: 'Cuello y hombros' },
    body: {
      en: 'Rub a drop of Marjoram on the back of the neck, or apply the AromaTouch blend to neck and shoulders with a carrier oil for a soothing massage.',
      es: 'Frota una gota de Mejorana en la nuca, o aplica la mezcla AromaTouch en cuello y hombros con un aceite portador para un masaje relajante.',
    },
    product: 'marjoram-oil',
  },
  {
    title: { en: 'Share the hand technique', es: 'Comparte la técnica de manos' },
    body: {
      en: 'The AromaTouch Hand Technique is a simple way to comfort a loved one. Massage the AromaTouch blend into their hands slowly, palm and fingers.',
      es: 'La Técnica de Manos AromaTouch es una forma sencilla de reconfortar a un ser querido. Masajea despacio la mezcla AromaTouch en sus manos, palma y dedos.',
    },
  },
]
