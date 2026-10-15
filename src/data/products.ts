import type { T, TList } from '../i18n'

export type Product = {
  slug: string
  name: T
  tagline: T
  size: string
  item: string
  retail: number
  wholesale: number
  image: string
  description: T
  benefits: TList
  uses: TList
  directions: TList
  sunSensitive?: boolean
  fdaNote?: boolean
  buyUrl?: string
}

// Precios de doterra.com (EE. UU.), consultados en octubre de 2026.
export const products: Product[] = [
  {
    slug: 'aromatouch-massage-blend-oil',
    name: { en: 'AromaTouch Massage Blend', es: 'Mezcla de masaje AromaTouch' },
    tagline: { en: 'The signature blend', es: 'La mezcla insignia' },
    size: '15 mL',
    item: '31200001',
    retail: 46.67,
    wholesale: 35.0,
    image: '/products/aromatouch-massage-blend-oil.webp',
    description: {
      en: 'AromaTouch combines Cypress, Peppermint, Marjoram, Basil, Grapefruit and Lavender essential oils to complement relaxing physical contact during the AromaTouch Technique, a method of applying essential oils that produces a profound overall wellness experience.',
      es: 'AromaTouch combina los aceites esenciales de Ciprés, Menta, Mejorana, Albahaca, Toronja y Lavanda para complementar el contacto físico relajante durante la Técnica AromaTouch, un método de aplicación de aceites que produce una experiencia profunda de bienestar general.',
    },
    benefits: {
      en: ['Comforts and soothes the skin.', 'Provides a relaxing aroma.'],
      es: ['Reconforta y calma la piel.', 'Proporciona un aroma relajante.'],
    },
    uses: {
      en: [
        'Apply directly to the neck and shoulders, or combine with a carrier oil for a soothing massage.',
        "Massage into a loved one's hands using the AromaTouch Hand Technique.",
        'Mix with Epsom salts and running bathwater for a soothing soak.',
      ],
      es: [
        'Aplícala directamente en el cuello y los hombros, o combínala con un aceite portador para un masaje relajante.',
        'Masajéala en las manos de un ser querido con la Técnica de Manos AromaTouch.',
        'Mézclala con sales de Epsom y el agua corriente del baño para un baño relajante.',
      ],
    },
    directions: {
      en: ['Topical: apply one to two drops to the desired area. Dilute with a carrier oil to minimize skin sensitivity.'],
      es: ['Tópico: aplica una o dos gotas en el área deseada. Diluye con un aceite portador para minimizar la sensibilidad.'],
    },
    sunSensitive: true,
  },
  {
    slug: 'cypress-oil',
    name: { en: 'Cypress', es: 'Ciprés' },
    tagline: { en: 'Energizing and clean', es: 'Energizante y limpio' },
    size: '15 mL',
    item: '60206972',
    retail: 25.33,
    wholesale: 19.0,
    image: '/products/cypress-oil.webp',
    description: {
      en: 'Derived from tall evergreen trees native to southern Europe and western Asia, Cypress has an energizing, clean and refreshing aroma that makes it popular in spas and among massage therapists. Its grounding scent is also ideal for times of transition.',
      es: 'Obtenido de altos árboles perennes nativos del sur de Europa y el oeste de Asia, el Ciprés tiene un aroma energizante, limpio y refrescante, muy usado en spas y por terapeutas de masaje. Su aroma equilibrante también es ideal para momentos de transición.',
    },
    benefits: {
      en: ['Provides an invigorating sensation to the skin.', 'Helps improve the appearance of oily skin.', 'Offers a refreshing, uplifting aroma.'],
      es: ['Proporciona una sensación vigorizante a la piel.', 'Ayuda a mejorar la apariencia de la piel grasa.', 'Ofrece un aroma refrescante y estimulante.'],
    },
    uses: {
      en: [
        'Apply to feet and legs before a long run or hike.',
        'Diffuse for an energizing aroma.',
        'Mix a few drops with a carrier oil for an invigorating massage.',
        'Add one or two drops to facial toner to improve the appearance of oily skin.',
      ],
      es: [
        'Aplícalo en pies y piernas antes de correr o caminar largo rato.',
        'Difúndelo para un aroma energizante.',
        'Mezcla unas gotas con un aceite portador para un masaje vigorizante.',
        'Agrega una o dos gotas a tu tónico facial para mejorar la apariencia de la piel grasa.',
      ],
    },
    directions: {
      en: ['Aromatic: three to four drops in the diffuser of your choice.', 'Topical: one to two drops on the desired area, diluted with a carrier oil.'],
      es: ['Aromático: de tres a cuatro gotas en tu difusor.', 'Tópico: una o dos gotas en el área deseada, diluidas con un aceite portador.'],
    },
  },
  {
    slug: 'peppermint-oil',
    name: { en: 'Peppermint', es: 'Menta' },
    tagline: { en: 'Minty, fresh, herbaceous', es: 'Mentolada, fresca, herbal' },
    size: '15 mL',
    item: '30190001',
    retail: 34.67,
    wholesale: 26.0,
    image: '/products/peppermint-oil.webp',
    description: {
      en: 'Steam-distilled from the fresh aerial parts of flowering Mentha piperita, Peppermint is naturally rich in menthol and menthone. It supports digestive comfort after meals, an atmosphere of alertness and motivation, and a cooling sensation when applied topically.*',
      es: 'Destilada al vapor de las partes aéreas frescas y floridas de Mentha piperita, la Menta es naturalmente rica en mentol y mentona. Favorece el confort digestivo después de las comidas, un ambiente de alerta y motivación, y una sensación refrescante al aplicarla en la piel.*',
    },
    benefits: {
      en: [
        'Promotes healthy digestive function and eases digestive discomfort when ingested.*',
        'Encourages an atmosphere of mental clarity and focus.',
        'Provides a cooling sensation and eases discomfort when applied topically in massage.',
      ],
      es: [
        'Favorece el funcionamiento digestivo y alivia las molestias digestivas cuando se ingiere.*',
        'Fomenta un ambiente de claridad mental y concentración.',
        'Proporciona una sensación refrescante y alivia molestias cuando se aplica en un masaje.',
      ],
    },
    uses: {
      en: [
        'After a meal: dilute one drop in four fluid ounces of water.*',
        'Mid-afternoon: place a drop in your palm and inhale, or diffuse three to four drops.',
        'After activity: dilute one to two drops with a carrier oil and massage into the desired area.',
      ],
      es: [
        'Después de comer: diluye una gota en cuatro onzas líquidas de agua.*',
        'A media tarde: pon una gota en la palma e inhala, o difunde de tres a cuatro gotas.',
        'Después de la actividad: diluye una o dos gotas con aceite portador y masajea el área deseada.',
      ],
    },
    directions: {
      en: ['Aromatic, internal and topical use.'],
      es: ['Uso aromático, interno y tópico.'],
    },
    fdaNote: true,
  },
  {
    slug: 'marjoram-oil',
    name: { en: 'Marjoram', es: 'Mejorana' },
    tagline: { en: 'Joy of the mountains', es: 'Alegría de las montañas' },
    size: '15 mL',
    item: '30140001',
    retail: 32.0,
    wholesale: 24.0,
    image: '/products/marjoram-oil.webp',
    description: {
      en: 'Also known as "wintersweet" or "joy of the mountains", Marjoram is valued for its calming properties when used as part of a soothing massage. The Greeks and Romans saw marjoram as a symbol of happiness.',
      es: 'También conocida como "alegría de las montañas", la Mejorana es valorada por sus propiedades calmantes cuando se usa en un masaje relajante. Los griegos y romanos la veían como un símbolo de felicidad.',
    },
    benefits: {
      en: ['Provides a soothing, calming sensation to the skin.', 'May promote a healthy cardiovascular system when ingested.*'],
      es: ['Proporciona una sensación calmante y relajante a la piel.', 'Puede favorecer un sistema cardiovascular saludable cuando se ingiere.*'],
    },
    uses: {
      en: [
        'Rub a drop on the back of the neck.',
        'Apply before and after exercising.',
        'Use in place of dried herbs while cooking.',
      ],
      es: [
        'Frota una gota en la nuca.',
        'Aplícala antes y después de hacer ejercicio.',
        'Úsala en lugar de hierbas secas al cocinar.',
      ],
    },
    directions: {
      en: [
        'Aromatic: three to four drops in the diffuser.',
        'Internal: dilute one drop in four fluid ounces of liquid.',
        'Topical: one to two drops on the desired area, diluted with a carrier oil.',
      ],
      es: [
        'Aromático: de tres a cuatro gotas en el difusor.',
        'Interno: diluye una gota en cuatro onzas líquidas.',
        'Tópico: una o dos gotas en el área deseada, diluidas con un aceite portador.',
      ],
    },
    fdaNote: true,
  },
  {
    slug: 'basil-oil',
    name: { en: 'Basil', es: 'Albahaca' },
    tagline: { en: 'Sweet, warm, relaxing', es: 'Dulce, cálida, relajante' },
    size: '15 mL',
    item: '30010001',
    retail: 44.0,
    wholesale: 33.0,
    image: '/products/basil-oil.webp',
    description: {
      en: 'High in linalool, Basil has a relaxing aroma, and its camphor content gives it exceptional cleansing properties. Its skin-cooling properties also make it ideal for uplifting aromatic massages.',
      es: 'Rica en linalol, la Albahaca tiene un aroma relajante, y su contenido de alcanfor le da propiedades limpiadoras excepcionales. Su efecto refrescante en la piel la hace ideal para masajes aromáticos estimulantes.',
    },
    benefits: {
      en: [
        'Provides a calming, relaxing aroma.',
        'Offers soothing comfort when incorporated into a massage.',
        'Adds cleansing power to surface cleaners.',
      ],
      es: [
        'Proporciona un aroma calmante y relajante.',
        'Ofrece un confort relajante cuando se incorpora a un masaje.',
        'Aporta poder limpiador a los limpiadores de superficies.',
      ],
    },
    uses: {
      en: [
        'Diffuse as part of a study or work routine.',
        'Apply with a carrier oil as part of a soothing massage.',
        'Add to your favorite Italian dishes.',
      ],
      es: [
        'Difúndela como parte de tu rutina de estudio o trabajo.',
        'Aplícala con un aceite portador en un masaje calmante.',
        'Agrégala a tus platos italianos favoritos.',
      ],
    },
    directions: {
      en: [
        'Aromatic: three to four drops in the diffuser.',
        'Internal: one drop in four fluid ounces of liquid.',
        'Topical: one to two drops on the desired area, diluted with a carrier oil.',
      ],
      es: [
        'Aromático: de tres a cuatro gotas en el difusor.',
        'Interno: una gota en cuatro onzas líquidas.',
        'Tópico: una o dos gotas en el área deseada, diluidas con un aceite portador.',
      ],
    },
  },
  {
    slug: 'grapefruit-oil',
    name: { en: 'Grapefruit', es: 'Toronja' },
    tagline: { en: 'Uplifting and invigorating', es: 'Estimulante y vigorizante' },
    size: '15 mL',
    item: '30100001',
    retail: 26.67,
    wholesale: 20.0,
    image: '/products/grapefruit-oil.webp',
    description: {
      en: 'Known for its energizing and invigorating aroma, Grapefruit creates an uplifting environment when diffused or applied topically. It is also renowned for its cleansing properties and is frequently used in skincare for clear, healthy-looking skin.',
      es: 'Conocida por su aroma energizante y vigorizante, la Toronja crea un ambiente estimulante cuando se difunde o se aplica en la piel. También es apreciada por sus propiedades limpiadoras y se usa en el cuidado de la piel para un aspecto limpio y saludable.',
    },
    benefits: {
      en: [
        'Improves the appearance of blemishes.',
        'May support a healthy metabolism when used internally, according to preclinical research.*',
        'Creates an uplifting environment.',
      ],
      es: [
        'Mejora la apariencia de las imperfecciones.',
        'Puede favorecer un metabolismo saludable cuando se usa internamente, según investigaciones preclínicas.*',
        'Crea un ambiente estimulante.',
      ],
    },
    uses: {
      en: [
        'Combine with a carrier oil or lotion and rub on hands or feet for an invigorating massage.',
        'Diffuse for a motivating aroma.',
        'Add to water.*',
      ],
      es: [
        'Combínala con un aceite o loción portador y frótala en manos o pies para un masaje vigorizante.',
        'Difúndela para un aroma motivador.',
        'Agrégala al agua.*',
      ],
    },
    directions: {
      en: [
        'Aromatic: three to four drops in the diffuser.',
        'Internal: dilute one drop in four fluid ounces of liquid.',
        'Topical: one to two drops on the desired area, diluted with a carrier oil.',
      ],
      es: [
        'Aromático: de tres a cuatro gotas en el difusor.',
        'Interno: diluye una gota en cuatro onzas líquidas.',
        'Tópico: una o dos gotas en el área deseada, diluidas con un aceite portador.',
      ],
    },
    sunSensitive: true,
    fdaNote: true,
  },
  {
    slug: 'lavender-oil',
    name: { en: 'Lavender', es: 'Lavanda' },
    tagline: { en: 'Sweet, herbal, floral', es: 'Dulce, herbal, floral' },
    size: '15 mL',
    item: '30110001',
    retail: 38.67,
    wholesale: 29.0,
    image: '/products/lavender-oil.webp',
    description: {
      en: 'Steam distilled from the fresh flowering tops of Lavandula angustifolia, Lavender has a sweet, herbal, floral aroma and is naturally rich in linalool and linalyl acetate. Use it to create a peaceful environment, support restful sleep or soothe occasional skin discomfort.*',
      es: 'Destilada al vapor de las flores frescas de Lavandula angustifolia, la Lavanda tiene un aroma dulce, herbal y floral, naturalmente rica en linalol y acetato de linalilo. Úsala para crear un ambiente tranquilo, favorecer un sueño reparador o calmar molestias ocasionales de la piel.*',
    },
    benefits: {
      en: [
        'Provides a gentle, relaxing aroma that promotes a peaceful environment.',
        'When ingested, can calm and relax the mind during rest.*',
        'Can help soothe occasional skin discomfort.',
      ],
      es: [
        'Ofrece un aroma suave y relajante que promueve un ambiente tranquilo.',
        'Cuando se ingiere, puede calmar y relajar la mente durante el descanso.*',
        'Ayuda a calmar molestias ocasionales de la piel.',
      ],
    },
    uses: {
      en: [
        'Daytime: add one drop to four ounces of tea or water for a moment of calm.*',
        'Evening: add three to four drops to your diffuser.',
        'Everyday: apply one to two drops to areas of occasional skin discomfort.',
      ],
      es: [
        'De día: agrega una gota a cuatro onzas de té o agua para un momento de calma.*',
        'De noche: pon de tres a cuatro gotas en tu difusor.',
        'Cada día: aplica una o dos gotas en zonas con molestias ocasionales de la piel.',
      ],
    },
    directions: {
      en: ['Aromatic, internal and topical use.'],
      es: ['Uso aromático, interno y tópico.'],
    },
    fdaNote: true,
  },
]

export const findProduct = (slug: string) => products.find((p) => p.slug === slug)
