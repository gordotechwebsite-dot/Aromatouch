import { useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check, ChevronDown } from 'lucide-react'
import { useLang } from '../i18n'
import { prettyPhone, useContent, waLink } from '../content'
import { slots, time12 } from '../lib/time'
import PageHead from '../components/PageHead'

const inputCls =
  'w-full border-0 border-b border-line bg-transparent px-0 py-3 text-base text-ink placeholder:text-ink/35 focus:border-ink focus:outline-none'

const isoDate = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

const fromIso = (s: string) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function Step({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <section className="border-t border-line pt-8 first:border-t-0 first:pt-0">
      <div className="flex items-baseline gap-4">
        <span className="font-serif text-2xl text-gold">{n}</span>
        <h2 className="text-3xl">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function Field({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-xs uppercase tracking-widest text-ink/50">{label}</span>
      {children}
    </label>
  )
}

export default function Book() {
  const { t, lang } = useLang()
  const { therapies, serviceAreas, business, promo } = useContent()
  const [params] = useSearchParams()
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    therapy: params.get('therapy') || therapies[0]?.id || '',
    date: '',
    time: '',
    city: serviceAreas[0] || '',
    address: '',
    notes: '',
  })
  const [status, setStatus] = useState<'idle' | 'sending' | 'done'>('idle')
  const set = (k: keyof typeof form) => (e: { target: { value: string } }) => setForm({ ...form, [k]: e.target.value })
  const pick = (k: keyof typeof form, v: string) => setForm({ ...form, [k]: v })

  const days = useMemo(() => {
    const start = new Date()
    start.setHours(0, 0, 0, 0)
    return Array.from({ length: 21 }, (_, i) => new Date(start.getFullYear(), start.getMonth(), start.getDate() + i))
  }, [])

  const times = slots.map(([h, m]) => ({ h, v: time12(h, m, lang) }))
  const morning = times.filter((x) => x.h < 12)
  const afternoon = times.filter((x) => x.h >= 12)

  const therapy = therapies.find((x) => x.id === form.therapy)
  const prettyDate = form.date
    ? fromIso(form.date).toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })
    : ''
  const ready = Boolean(form.therapy && form.date && form.time)

  const message = [
    t({ en: 'Hi Nayibe, I would like to book:', es: 'Hola Nayibe, quiero reservar:' }),
    therapy ? t(therapy.name) : '',
    `${prettyDate} ${form.time}`,
    `${form.address}, ${form.city}`,
    form.name,
    form.notes,
  ]
    .filter((x) => x.trim())
    .join('\n')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (!ready) return
    setStatus('sending')
    try {
      const r = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, therapy: therapy ? t(therapy.name) : form.therapy, lang }),
      })
      if (!r.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('idle')
      if (business.whatsapp) window.open(waLink(business.whatsapp, message), '_blank')
    }
  }

  const chip = (selected: boolean) =>
    `border py-2.5 text-sm transition-colors ${
      selected ? 'border-ink bg-ink text-cream' : 'border-line bg-white text-ink hover:border-ink/50'
    }`

  const summary = [
    { k: t({ en: 'Therapy', es: 'Terapia' }), v: therapy ? t(therapy.name) : '' },
    { k: t({ en: 'Date', es: 'Fecha' }), v: prettyDate },
    { k: t({ en: 'Time', es: 'Hora' }), v: form.time },
    { k: t({ en: 'Place', es: 'Lugar' }), v: [form.address, form.city].filter(Boolean).join(', ') },
  ]

  if (status === 'done') {
    return (
      <>
        <PageHead eyebrow={t(promo.title)} title={t(promo.cta)} />
        <div className="wrap py-16">
          <div className="max-w-xl border-t border-ink pt-8">
            <Check className="text-teal" size={32} />
            <h2 className="mt-4 text-4xl">{t({ en: 'Request received', es: 'Solicitud recibida' })}</h2>
            <p className="mt-3 text-ink/70">
              {t({
                en: 'Nayibe will contact you shortly to confirm your appointment. To speed it up, send her the details on WhatsApp.',
                es: 'Nayibe te contactará pronto para confirmar tu cita. Si quieres agilizarlo, envíale los datos por WhatsApp.',
              })}
            </p>
            {business.whatsapp && (
              <a href={waLink(business.whatsapp, message)} target="_blank" rel="noreferrer" className="btn mt-6">
                WhatsApp
              </a>
            )}
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <PageHead eyebrow={t(promo.title)} title={t(promo.cta)} intro={t(promo.text)} />
      <div className="wrap grid items-start gap-12 py-14 md:grid-cols-[1.6fr_1fr] md:gap-16">
        <form id="booking" onSubmit={submit} className="min-w-0 space-y-12">
          <Step n="01" title={t({ en: 'Choose your therapy', es: 'Elige tu terapia' })}>
            <div className="divide-y divide-line border-y border-line">
              {therapies.map((th) => {
                const sel = form.therapy === th.id
                return (
                  <label key={th.id} className="flex cursor-pointer items-center gap-4 py-4">
                    <input
                      type="radio"
                      name="therapy"
                      className="sr-only"
                      checked={sel}
                      onChange={() => pick('therapy', th.id)}
                    />
                    <span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${sel ? 'border-ink' : 'border-line'}`}>
                      {sel && <span className="h-2.5 w-2.5 bg-ink" />}
                    </span>
                    <span className="flex-1">
                      <span className={`block text-lg ${sel ? 'text-ink' : 'text-ink/80'}`}>{t(th.name)}</span>
                      {th.duration && <span className="block text-sm text-ink/50">{th.duration}</span>}
                    </span>
                    {th.price && <span className="font-serif text-2xl text-gold">{th.price}</span>}
                  </label>
                )
              })}
            </div>
          </Step>

          <Step n="02" title={t({ en: 'Date and time', es: 'Fecha y hora' })}>
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-7 md:overflow-visible md:px-0 [&::-webkit-scrollbar]:hidden">
              {days.map((d) => {
                const v = isoDate(d)
                const sel = form.date === v
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() => pick('date', v)}
                    className={`w-16 shrink-0 border py-3 text-center transition-colors md:w-auto ${
                      sel ? 'border-ink bg-ink text-cream' : 'border-line bg-white hover:border-ink/50'
                    }`}
                  >
                    <span className={`block text-xs uppercase tracking-wider ${sel ? 'text-cream/70' : 'text-ink/50'}`}>
                      {d.toLocaleDateString('es', { weekday: 'short' }).replace('.', '')}
                    </span>
                    <span className="mt-1 block font-serif text-2xl leading-none">{d.getDate()}</span>
                    <span className={`mt-1 block text-xs ${sel ? 'text-cream/70' : 'text-ink/50'}`}>
                      {d.toLocaleDateString('es', { month: 'short' }).replace('.', '')}
                    </span>
                  </button>
                )
              })}
            </div>
            {[
              { label: t({ en: 'Morning', es: 'Mañana' }), list: morning },
              { label: t({ en: 'Afternoon', es: 'Tarde' }), list: afternoon },
            ].map((g) => (
              <div key={g.label} className="mt-6">
                <p className="text-xs uppercase tracking-widest text-ink/50">{g.label}</p>
                <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
                  {g.list.map((x) => (
                    <button key={x.v} type="button" onClick={() => pick('time', x.v)} className={chip(form.time === x.v)}>
                      {x.v}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </Step>

          <Step n="03" title={t({ en: 'Where', es: 'Dónde' })}>
            <p className="-mt-2 mb-6 text-sm text-ink/60">
              {t({
                en: 'Sessions are at your home. Nayibe brings everything needed.',
                es: 'Las sesiones son en tu casa. Nayibe lleva todo lo necesario.',
              })}
            </p>
            <div className="grid gap-8 sm:grid-cols-[1fr_1.6fr]">
              <Field label={t({ en: 'City', es: 'Ciudad' })}>
                <span className="relative block">
                  <select className={`${inputCls} cursor-pointer appearance-none pr-8`} value={form.city} onChange={set('city')}>
                    {serviceAreas.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                  <ChevronDown size={16} className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-ink/50" />
                </span>
              </Field>
              <Field label={t({ en: 'Address', es: 'Dirección' })}>
                <input
                  required
                  className={inputCls}
                  placeholder={t({ en: 'Street, number, apt', es: 'Calle, número, apto.' })}
                  value={form.address}
                  onChange={set('address')}
                />
              </Field>
            </div>
          </Step>

          <Step n="04" title={t({ en: 'Your details', es: 'Tus datos' })}>
            <div className="grid gap-8 sm:grid-cols-2">
              <Field label={t({ en: 'Full name', es: 'Nombre completo' })}>
                <input required className={inputCls} autoComplete="name" value={form.name} onChange={set('name')} />
              </Field>
              <Field label={t({ en: 'Phone', es: 'Teléfono' })}>
                <input required type="tel" className={inputCls} autoComplete="tel" value={form.phone} onChange={set('phone')} />
              </Field>
              <Field label={t({ en: 'Email (optional)', es: 'Correo (opcional)' })} className="sm:col-span-2">
                <input type="email" className={inputCls} autoComplete="email" value={form.email} onChange={set('email')} />
              </Field>
              <Field label={t({ en: 'Comments (optional)', es: 'Comentarios (opcional)' })} className="sm:col-span-2">
                <textarea
                  rows={3}
                  className={`${inputCls} resize-none`}
                  placeholder={t({ en: 'Areas of tension, allergies, access to your home…', es: 'Zonas de tensión, alergias, acceso a tu casa…' })}
                  value={form.notes}
                  onChange={set('notes')}
                />
              </Field>
            </div>
          </Step>
        </form>

        <aside className="space-y-10 md:sticky md:top-28">
          <div className="border border-line bg-white p-6">
            <p className="eyebrow">{t({ en: 'Your booking', es: 'Tu reserva' })}</p>
            <dl className="mt-4 divide-y divide-line text-sm">
              {summary.map((s) => (
                <div key={s.k} className="flex justify-between gap-4 py-3">
                  <dt className="text-ink/50">{s.k}</dt>
                  <dd className="text-right first-letter:uppercase">{s.v || '—'}</dd>
                </div>
              ))}
            </dl>
            {therapy?.price && (
              <div className="flex items-baseline justify-between border-t border-ink pt-4">
                <span className="text-sm">{t({ en: 'Total', es: 'Total' })}</span>
                <span className="font-serif text-4xl">{therapy.price}</span>
              </div>
            )}
            <button
              type="submit"
              form="booking"
              disabled={!ready || status === 'sending'}
              className="btn mt-6 w-full disabled:cursor-not-allowed disabled:bg-ink/30"
            >
              {status === 'sending' ? t({ en: 'Sending…', es: 'Enviando…' }) : t({ en: 'Request appointment', es: 'Solicitar cita' })}
            </button>
            <p className="mt-3 text-center text-xs text-ink/50">
              {ready
                ? t({ en: 'Nayibe will contact you to confirm.', es: 'Nayibe te contactará para confirmar la cita.' })
                : t({ en: 'Choose a date and time to continue.', es: 'Elige fecha y hora para continuar.' })}
            </p>
          </div>
          {business.phone && (
            <div className="text-sm">
              <p className="eyebrow">{t({ en: 'Prefer to call?', es: '¿Prefieres llamar?' })}</p>
              <a href={`tel:+${business.phone.replace(/\D/g, '')}`} className="link mt-2 block font-serif text-3xl">
                {prettyPhone(business.phone)}
              </a>
              {business.whatsapp && (
                <a href={waLink(business.whatsapp, message)} target="_blank" rel="noreferrer" className="link mt-1 block">
                  WhatsApp
                </a>
              )}
            </div>
          )}
        </aside>
      </div>
    </>
  )
}
