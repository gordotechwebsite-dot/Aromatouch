import { useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useLang } from '../i18n'
import { prettyPhone, useContent, waLink } from '../content'
import { slots, time12 } from '../lib/time'
import PageHead from '../components/PageHead'

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

  const therapyName = therapies.find((x) => x.id === form.therapy)
  const message = [
    t({ en: 'Hi Nayibe, I would like to book:', es: 'Hola Nayibe, quiero reservar:' }),
    therapyName ? t(therapyName.name) : '',
    `${form.date} ${form.time}`,
    `${form.address}, ${form.city}`,
    form.name,
    form.notes,
  ]
    .filter((x) => x.trim())
    .join('\n')

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    try {
      const r = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, therapy: therapyName ? t(therapyName.name) : form.therapy, lang }),
      })
      if (!r.ok) throw new Error()
      setStatus('done')
    } catch {
      setStatus('idle')
      if (business.whatsapp) window.open(waLink(business.whatsapp, message), '_blank')
    }
  }

  const today = new Date().toISOString().slice(0, 10)

  return (
    <>
      <PageHead eyebrow={t(promo.title)} title={t(promo.cta)} intro={t(promo.text)} />
      <div className="wrap grid gap-12 py-14 md:grid-cols-[1.4fr_1fr]">
        {status === 'done' ? (
          <div className="border border-line bg-white p-8">
            <Check className="text-teal" size={32} />
            <h2 className="mt-4 text-3xl">{t({ en: 'Request received', es: 'Solicitud recibida' })}</h2>
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
        ) : (
          <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="text-sm">{t({ en: 'Therapy', es: 'Terapia' })}</span>
              <select className="field mt-1" value={form.therapy} onChange={set('therapy')}>
                {therapies.map((th) => (
                  <option key={th.id} value={th.id}>
                    {t(th.name)}
                    {th.price ? ` · ${th.price}` : ''}
                  </option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm">{t({ en: 'Full name', es: 'Nombre completo' })}</span>
              <input required className="field mt-1" value={form.name} onChange={set('name')} />
            </label>
            <label>
              <span className="text-sm">{t({ en: 'Phone', es: 'Teléfono' })}</span>
              <input required type="tel" className="field mt-1" value={form.phone} onChange={set('phone')} />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm">Email</span>
              <input type="email" className="field mt-1" value={form.email} onChange={set('email')} />
            </label>
            <label>
              <span className="text-sm">{t({ en: 'Date', es: 'Fecha' })}</span>
              <input required type="date" min={today} className="field mt-1" value={form.date} onChange={set('date')} />
            </label>
            <label>
              <span className="text-sm">{t({ en: 'Preferred time', es: 'Hora preferida' })}</span>
              <select required className="field mt-1" value={form.time} onChange={set('time')}>
                <option value="">—</option>
                {slots.map(([h, m]) => {
                  const v = time12(h, m, lang)
                  return (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  )
                })}
              </select>
            </label>
            <label>
              <span className="text-sm">{t({ en: 'City', es: 'Ciudad' })}</span>
              <select className="field mt-1" value={form.city} onChange={set('city')}>
                {serviceAreas.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label>
              <span className="text-sm">{t({ en: 'Address', es: 'Dirección' })}</span>
              <input required className="field mt-1" value={form.address} onChange={set('address')} />
            </label>
            <label className="sm:col-span-2">
              <span className="text-sm">{t({ en: 'Notes', es: 'Comentarios' })}</span>
              <textarea rows={4} className="field mt-1" value={form.notes} onChange={set('notes')} />
            </label>
            <div className="sm:col-span-2">
              <button disabled={status === 'sending'} className="btn w-full sm:w-auto">
                {status === 'sending' ? t({ en: 'Sending…', es: 'Enviando…' }) : t({ en: 'Request appointment', es: 'Solicitar cita' })}
              </button>
            </div>
          </form>
        )}
        <aside className="space-y-6 border-t border-line pt-6 text-sm md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <div>
            <p className="eyebrow">{t(promo.title)}</p>
            <p className="mt-2 text-ink/70">
              {t({
                en: 'Sessions are at your home. Nayibe brings everything needed.',
                es: 'Las sesiones son en tu casa. Nayibe lleva todo lo necesario.',
              })}
            </p>
          </div>
          {business.phone && (
            <div>
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
