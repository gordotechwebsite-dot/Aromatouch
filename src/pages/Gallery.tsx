import { useState } from 'react'
import { X } from 'lucide-react'
import { useLang } from '../i18n'
import { useContent } from '../content'
import PageHead from '../components/PageHead'

export default function Gallery() {
  const { t } = useLang()
  const { gallery } = useContent()
  const [open, setOpen] = useState<number | null>(null)
  const current = open === null ? null : gallery[open]

  return (
    <>
      <PageHead eyebrow={t({ en: 'Gallery', es: 'Galería' })} title={t({ en: 'Moments of calm', es: 'Momentos de calma' })} />
      <div className="wrap columns-2 gap-4 py-14 md:columns-3">
        {gallery.map((ph, i) => (
          <button key={i} onClick={() => setOpen(i)} className="mb-4 block w-full break-inside-avoid text-left">
            <img src={ph.src} alt={t(ph.caption)} className="w-full rounded-xl" loading="lazy" />
            {t(ph.caption) && <span className="mt-2 block text-sm text-ink/60">{t(ph.caption)}</span>}
          </button>
        ))}
      </div>
      {current && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4" onClick={() => setOpen(null)}>
          <button className="absolute right-5 top-5 text-cream" aria-label="Close">
            <X size={28} />
          </button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img src={current.src} alt={t(current.caption)} className="max-h-[80vh] w-auto" />
            <figcaption className="mt-3 text-center text-sm text-cream/80">{t(current.caption)}</figcaption>
          </figure>
        </div>
      )}
    </>
  )
}
