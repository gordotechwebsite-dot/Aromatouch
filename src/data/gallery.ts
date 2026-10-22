import type { T } from '../i18n'

export type Photo = { src: string; caption: T }

// Reemplazar o ampliar con fotos propias (public/gallery/...).
export const gallery: Photo[] = []
