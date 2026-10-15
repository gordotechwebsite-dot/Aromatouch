import { useEffect, useState, type ReactNode } from 'react'
import { ArrowDown, ArrowUp, ChevronDown, ChevronRight, LogOut, Plus, Trash2 } from 'lucide-react'
import type { T, TList } from '../i18n'
import { defaultContent, prettyPhone, type SiteContent } from '../content'
import type { Product } from '../data/products'
import type { Therapy } from '../data/therapies'
import type { Tip } from '../data/tips'
import type { Photo } from '../data/gallery'

type Booking = Record<string, string>
const TOKEN_KEY = 'admin_token'
const emptyT = (): T => ({ en: '', es: '' })
const emptyTL = (): TList => ({ en: [], es: [] })

function api(path: string, token: string, init: RequestInit = {}) {
  return fetch(path, {
    ...init,
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}`, ...(init.headers || {}) },
  })
}

function Label({ text, children }: { text: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs font-medium uppercase tracking-wider text-ink/60">{text}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}

function Text({ label, value, onChange, type = 'text' }: { label: string; value: string; onChange: (v: string) => void; type?: string }) {
  return (
    <Label text={label}>
      <input type={type} className="field" value={value} onChange={(e) => onChange(e.target.value)} />
    </Label>
  )
}

function Num({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <Label text={label}>
      <input type="number" step="0.01" className="field" value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </Label>
  )
}

function Bilingual({ label, value, onChange, area }: { label: string; value: T; onChange: (v: T) => void; area?: boolean }) {
  const v = value || emptyT()
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {(['es', 'en'] as const).map((l) => (
        <Label key={l} text={`${label} (${l === 'es' ? 'español' : 'inglés'})`}>
          {area ? (
            <textarea rows={4} className="field" value={v[l]} onChange={(e) => onChange({ ...v, [l]: e.target.value })} />
          ) : (
            <input className="field" value={v[l]} onChange={(e) => onChange({ ...v, [l]: e.target.value })} />
          )}
        </Label>
      ))}
    </div>
  )
}

function BilingualList({ label, value, onChange }: { label: string; value?: TList; onChange: (v: TList) => void }) {
  const v = value || emptyTL()
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {(['es', 'en'] as const).map((l) => (
        <Label key={l} text={`${label} (${l === 'es' ? 'español' : 'inglés'}) · uno por línea`}>
          <textarea
            rows={5}
            className="field"
            value={v[l].join('\n')}
            onChange={(e) => onChange({ ...v, [l]: e.target.value.split('\n') })}
            onBlur={() => onChange({ ...v, [l]: v[l].map((x) => x.trim()).filter(Boolean) })}
          />
        </Label>
      ))}
    </div>
  )
}

async function toWebp(file: File): Promise<string> {
  const img = await createImageBitmap(file)
  const scale = Math.min(1, 1600 / Math.max(img.width, img.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(img.width * scale)
  canvas.height = Math.round(img.height * scale)
  canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height)
  const blob: Blob = await new Promise((r) => canvas.toBlob((b) => r(b!), 'image/webp', 0.85))
  const buf = new Uint8Array(await blob.arrayBuffer())
  let bin = ''
  for (let i = 0; i < buf.length; i += 0x8000) bin += String.fromCharCode(...buf.subarray(i, i + 0x8000))
  return btoa(bin)
}

function ImageField({ label, value, onChange, token }: { label: string; value: string; onChange: (v: string) => void; token: string }) {
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')
  const upload = async (file?: File) => {
    if (!file) return
    setBusy(true)
    setErr('')
    try {
      const r = await api('/api/admin/upload', token, { method: 'POST', body: JSON.stringify({ data: await toWebp(file) }) })
      if (!r.ok) throw new Error()
      onChange((await r.json()).url)
    } catch {
      setErr('No se pudo subir la imagen.')
    }
    setBusy(false)
  }
  return (
    <Label text={label}>
      <div className="flex gap-4">
        <div className="h-24 w-24 shrink-0 overflow-hidden border border-line bg-sand">
          {value && <img src={value} alt="" className="h-full w-full object-cover" />}
        </div>
        <div className="flex-1 space-y-2">
          <input className="field" value={value} onChange={(e) => onChange(e.target.value)} placeholder="URL de la imagen" />
          <div className="flex items-center gap-3 text-sm">
            <input type="file" accept="image/*" disabled={busy} onChange={(e) => upload(e.target.files?.[0])} />
            {busy && <span className="text-ink/60">Subiendo…</span>}
            {value && (
              <button type="button" className="text-red-700" onClick={() => onChange('')}>
                Quitar
              </button>
            )}
          </div>
          {err && <p className="text-sm text-red-700">{err}</p>}
        </div>
      </div>
    </Label>
  )
}

function ListEditor<I>({
  items,
  onChange,
  title,
  blank,
  render,
  addLabel,
}: {
  items: I[]
  onChange: (v: I[]) => void
  title: (i: I) => string
  blank: () => I
  render: (i: I, set: (v: I) => void) => ReactNode
  addLabel: string
}) {
  const [open, setOpen] = useState<number | null>(null)
  const move = (i: number, d: number) => {
    const j = i + d
    if (j < 0 || j >= items.length) return
    const next = [...items]
    ;[next[i], next[j]] = [next[j], next[i]]
    onChange(next)
    setOpen(open === i ? j : open)
  }
  return (
    <div>
      <div className="divide-y divide-line border border-line bg-white">
        {items.map((it, i) => (
          <div key={i}>
            <div className="flex items-center gap-2 px-4 py-3">
              <button type="button" className="flex flex-1 items-center gap-2 text-left" onClick={() => setOpen(open === i ? null : i)}>
                {open === i ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                <span className="font-medium">{title(it) || '(sin título)'}</span>
              </button>
              <button type="button" onClick={() => move(i, -1)} aria-label="Subir"><ArrowUp size={16} /></button>
              <button type="button" onClick={() => move(i, 1)} aria-label="Bajar"><ArrowDown size={16} /></button>
              <button
                type="button"
                className="text-red-700"
                aria-label="Eliminar"
                onClick={() => confirm('¿Eliminar este elemento?') && onChange(items.filter((_, j) => j !== i))}
              >
                <Trash2 size={16} />
              </button>
            </div>
            {open === i && (
              <div className="space-y-4 border-t border-line bg-cream/50 p-4">
                {render(it, (v) => onChange(items.map((x, j) => (j === i ? v : x))))}
              </div>
            )}
          </div>
        ))}
      </div>
      <button
        type="button"
        className="btn-line mt-4"
        onClick={() => {
          onChange([...items, blank()])
          setOpen(items.length)
        }}
      >
        <Plus size={16} /> {addLabel}
      </button>
    </div>
  )
}

const slugify = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')

function Login({ onToken }: { onToken: (t: string) => void }) {
  const [password, setPassword] = useState('')
  const [err, setErr] = useState('')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErr('')
    const r = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    }).catch(() => null)
    if (r?.ok) onToken((await r.json()).token)
    else setErr('Contraseña incorrecta.')
  }
  return (
    <div className="flex min-h-screen items-center justify-center p-5">
      <form onSubmit={submit} className="w-full max-w-sm border border-line bg-white p-8">
        <img src="/logo.png" alt="AromaTouch by Nayibe A" className="mx-auto h-28" />
        <h1 className="mt-4 text-center text-3xl">Panel de administración</h1>
        <div className="mt-6">
          <Text label="Contraseña" type="password" value={password} onChange={setPassword} />
        </div>
        {err && <p className="mt-3 text-sm text-red-700">{err}</p>}
        <button className="btn mt-6 w-full">Entrar</button>
      </form>
    </div>
  )
}

function Bookings({ token }: { token: string }) {
  const [items, setItems] = useState<Booking[] | null>(null)
  const load = () =>
    api('/api/admin/bookings', token)
      .then((r) => (r.ok ? r.json() : []))
      .then(setItems)
      .catch(() => setItems([]))
  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const remove = async (id: string) => {
    if (!confirm('¿Eliminar esta reserva?')) return
    await api(`/api/admin/bookings?id=${id}`, token, { method: 'DELETE' })
    load()
  }
  if (!items) return <p className="text-ink/60">Cargando…</p>
  if (!items.length) return <p className="text-ink/60">Todavía no hay solicitudes de reserva.</p>
  return (
    <div className="space-y-4">
      {items.map((b) => (
        <div key={b.id} className="border border-line bg-white p-5 text-sm">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-serif text-2xl">{b.name}</p>
              <p className="text-ink/60">
                Recibida el {new Date(b.createdAt).toLocaleString('es-CO', { timeZone: 'America/Phoenix', dateStyle: 'medium', timeStyle: 'short' })} (hora de Arizona)
              </p>
            </div>
            <button className="text-red-700" onClick={() => remove(b.id)} aria-label="Eliminar">
              <Trash2 size={16} />
            </button>
          </div>
          <dl className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
            <div><dt className="inline text-ink/50">Terapia: </dt><dd className="inline">{b.therapy}</dd></div>
            <div><dt className="inline text-ink/50">Fecha: </dt><dd className="inline">{b.date} · {b.time}</dd></div>
            <div><dt className="inline text-ink/50">Teléfono: </dt><dd className="inline"><a className="link" href={`tel:${b.phone}`}>{b.phone}</a> · <a className="link" href={`https://wa.me/${b.phone.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">WhatsApp</a></dd></div>
            {b.email && <div><dt className="inline text-ink/50">Email: </dt><dd className="inline"><a className="link" href={`mailto:${b.email}`}>{b.email}</a></dd></div>}
            <div className="sm:col-span-2"><dt className="inline text-ink/50">Dirección: </dt><dd className="inline">{b.address}, {b.city}</dd></div>
            {b.notes && <div className="sm:col-span-2"><dt className="inline text-ink/50">Comentarios: </dt><dd className="inline">{b.notes}</dd></div>}
          </dl>
        </div>
      ))}
    </div>
  )
}

const tabs = ['Negocio', 'Inicio', 'Terapias', 'Productos', 'Consejos', 'Galería', 'Reservas'] as const

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(TOKEN_KEY) || '')
  const [c, setC] = useState<SiteContent | null>(null)
  const [tab, setTab] = useState<(typeof tabs)[number]>('Negocio')
  const [status, setStatus] = useState('')
  const [dirty, setDirty] = useState(false)

  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setC(d ? { ...defaultContent, ...d } : defaultContent))
      .catch(() => setC(defaultContent))
  }, [])

  useEffect(() => {
    const warn = (e: BeforeUnloadEvent) => dirty && e.preventDefault()
    window.addEventListener('beforeunload', warn)
    return () => window.removeEventListener('beforeunload', warn)
  }, [dirty])

  const login = (t: string) => {
    localStorage.setItem(TOKEN_KEY, t)
    setToken(t)
  }
  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    setToken('')
  }

  if (!token) return <Login onToken={login} />
  if (!c) return <p className="p-10">Cargando…</p>

  const update = (patch: Partial<SiteContent>) => {
    setC({ ...c, ...patch })
    setDirty(true)
    setStatus('')
  }

  const save = async () => {
    setStatus('Guardando…')
    const r = await api('/api/admin/content', token, { method: 'PUT', body: JSON.stringify(c) }).catch(() => null)
    if (r?.status === 401) {
      logout()
      return
    }
    if (r?.ok) {
      setDirty(false)
      setStatus('Cambios publicados.')
    } else setStatus('No se pudo guardar. Intenta de nuevo.')
  }

  const b = c.business
  const setB = (k: keyof typeof b) => (v: string) => update({ business: { ...b, [k]: v } })

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-line bg-cream">
        <div className="wrap flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src="/logo-mark.png" alt="" className="h-10 w-10" />
            <span className="font-serif text-xl">Panel AromaTouch</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden text-ink/60 sm:inline">{status || (dirty ? 'Cambios sin guardar' : '')}</span>
            <a href="/" target="_blank" className="link hidden sm:inline">Ver sitio</a>
            <button className="btn" disabled={!dirty} onClick={save}>Guardar y publicar</button>
            <button onClick={logout} aria-label="Salir"><LogOut size={18} /></button>
          </div>
        </div>
        <nav className="wrap flex gap-6 overflow-x-auto text-sm">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={`border-b-2 py-3 ${tab === t ? 'border-ink' : 'border-transparent text-ink/60'}`}>
              {t}
            </button>
          ))}
        </nav>
      </header>

      <main className="wrap max-w-4xl space-y-5 py-8">
        {status && <p className="text-sm text-ink/60 sm:hidden">{status}</p>}

        {tab === 'Negocio' && (
          <>
            <div className="grid gap-4 md:grid-cols-2">
              <Text label="Nombre del negocio" value={b.name} onChange={setB('name')} />
              <Text label="Terapeuta" value={b.owner} onChange={setB('owner')} />
              <Text label="Ciudad" value={b.city} onChange={setB('city')} />
              <Text label="OwnerID de doTERRA" value={b.doterraOwnerId} onChange={setB('doterraOwnerId')} />
              <Text label={`Teléfono (solo dígitos) ${b.phone ? '· ' + prettyPhone(b.phone) : ''}`} value={b.phone} onChange={setB('phone')} />
              <Text label="WhatsApp (solo dígitos)" value={b.whatsapp} onChange={setB('whatsapp')} />
              <Text label="Email" value={b.email} onChange={setB('email')} />
              <Text label="Instagram (URL)" value={b.instagram} onChange={setB('instagram')} />
              <Text label="Facebook (URL)" value={b.facebook} onChange={setB('facebook')} />
            </div>
            <Label text="Zonas que atiende · una por línea">
              <textarea
                rows={8}
                className="field"
                value={c.serviceAreas.join('\n')}
                onChange={(e) => update({ serviceAreas: e.target.value.split('\n') })}
                onBlur={() => update({ serviceAreas: c.serviceAreas.map((x) => x.trim()).filter(Boolean) })}
              />
            </Label>
          </>
        )}

        {tab === 'Inicio' && (
          <>
            <h2 className="text-2xl">Portada</h2>
            <Bilingual label="Texto superior" value={c.hero.eyebrow} onChange={(v) => update({ hero: { ...c.hero, eyebrow: v } })} />
            <Bilingual label="Título" value={c.hero.title} onChange={(v) => update({ hero: { ...c.hero, title: v } })} area />
            <Bilingual label="Subtítulo" value={c.hero.subtitle} onChange={(v) => update({ hero: { ...c.hero, subtitle: v } })} area />
            <ImageField label="Imagen de portada" token={token} value={c.hero.image} onChange={(v) => update({ hero: { ...c.hero, image: v } })} />
            <h2 className="pt-6 text-2xl">Promoción (domicilio)</h2>
            <Bilingual label="Título" value={c.promo.title} onChange={(v) => update({ promo: { ...c.promo, title: v } })} />
            <Bilingual label="Texto" value={c.promo.text} onChange={(v) => update({ promo: { ...c.promo, text: v } })} area />
            <Bilingual label="Botón de reserva" value={c.promo.cta} onChange={(v) => update({ promo: { ...c.promo, cta: v } })} />
            <h2 className="pt-6 text-2xl">Conoce a Nayibe</h2>
            <Bilingual label="Título" value={c.about.title} onChange={(v) => update({ about: { ...c.about, title: v } })} />
            <BilingualList label="Párrafos" value={c.about.body} onChange={(v) => update({ about: { ...c.about, body: v } })} />
            <ImageField label="Foto de Nayibe (si está vacía se muestra el logo)" token={token} value={c.about.photo} onChange={(v) => update({ about: { ...c.about, photo: v } })} />
          </>
        )}

        {tab === 'Terapias' && (
          <ListEditor<Therapy>
            items={c.therapies}
            onChange={(v) => update({ therapies: v })}
            title={(x) => x.name.es}
            addLabel="Agregar terapia"
            blank={() => ({ id: `terapia-${Date.now()}`, name: emptyT(), summary: emptyT(), details: emptyTL() })}
            render={(x, set) => (
              <>
                <Bilingual label="Nombre" value={x.name} onChange={(v) => set({ ...x, name: v })} />
                <div className="grid gap-4 md:grid-cols-2">
                  <Text label="Precio (ej. $77)" value={x.price || ''} onChange={(v) => set({ ...x, price: v })} />
                  <Text label="Duración (ej. 60 min)" value={x.duration || ''} onChange={(v) => set({ ...x, duration: v })} />
                </div>
                <Bilingual label="Resumen" value={x.summary} onChange={(v) => set({ ...x, summary: v })} area />
                <BilingualList label="Beneficios" value={x.benefits} onChange={(v) => set({ ...x, benefits: v })} />
                <BilingualList label="Detalles" value={x.details} onChange={(v) => set({ ...x, details: v })} />
                <ImageField label="Foto" token={token} value={x.image || ''} onChange={(v) => set({ ...x, image: v })} />
              </>
            )}
          />
        )}

        {tab === 'Productos' && (
          <ListEditor<Product>
            items={c.products}
            onChange={(v) => update({ products: v })}
            title={(x) => `${x.name.es} · $${x.retail}`}
            addLabel="Agregar producto"
            blank={() => ({
              slug: '',
              name: emptyT(),
              tagline: emptyT(),
              size: '15 mL',
              item: '',
              retail: 0,
              wholesale: 0,
              image: '',
              description: emptyT(),
              benefits: emptyTL(),
              uses: emptyTL(),
              directions: emptyTL(),
            })}
            render={(x, set) => (
              <>
                <Bilingual
                  label="Nombre"
                  value={x.name}
                  onChange={(v) => set({ ...x, name: v, slug: x.slug || slugify(v.en || v.es) })}
                />
                <Bilingual label="Subtítulo" value={x.tagline} onChange={(v) => set({ ...x, tagline: v })} />
                <div className="grid gap-4 md:grid-cols-4">
                  <Num label="Precio regular (USD)" value={x.retail} onChange={(v) => set({ ...x, retail: v })} />
                  <Num label="Precio mayorista (USD)" value={x.wholesale} onChange={(v) => set({ ...x, wholesale: v })} />
                  <Text label="Tamaño" value={x.size} onChange={(v) => set({ ...x, size: v })} />
                  <Text label="N.º de artículo" value={x.item} onChange={(v) => set({ ...x, item: v })} />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <Text label="Slug de doTERRA (URL)" value={x.slug} onChange={(v) => set({ ...x, slug: slugify(v) })} />
                  <Text label="Link de compra (opcional, reemplaza el de doTERRA)" value={x.buyUrl || ''} onChange={(v) => set({ ...x, buyUrl: v })} />
                </div>
                <ImageField label="Foto" token={token} value={x.image} onChange={(v) => set({ ...x, image: v })} />
                <Bilingual label="Descripción" value={x.description} onChange={(v) => set({ ...x, description: v })} area />
                <BilingualList label="Beneficios" value={x.benefits} onChange={(v) => set({ ...x, benefits: v })} />
                <BilingualList label="Usos" value={x.uses} onChange={(v) => set({ ...x, uses: v })} />
                <BilingualList label="Instrucciones" value={x.directions} onChange={(v) => set({ ...x, directions: v })} />
                <div className="flex flex-wrap gap-6 text-sm">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={!!x.sunSensitive} onChange={(e) => set({ ...x, sunSensitive: e.target.checked })} />
                    Advertencia de sol (12 horas)
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" checked={!!x.fdaNote} onChange={(e) => set({ ...x, fdaNote: e.target.checked })} />
                    Nota de la FDA
                  </label>
                </div>
              </>
            )}
          />
        )}

        {tab === 'Consejos' && (
          <ListEditor<Tip>
            items={c.tips}
            onChange={(v) => update({ tips: v })}
            title={(x) => x.title.es}
            addLabel="Agregar consejo"
            blank={() => ({ title: emptyT(), body: emptyT() })}
            render={(x, set) => (
              <>
                <Bilingual label="Título" value={x.title} onChange={(v) => set({ ...x, title: v })} />
                <Bilingual label="Texto" value={x.body} onChange={(v) => set({ ...x, body: v })} area />
                <Label text="Producto relacionado">
                  <select className="field" value={x.product || ''} onChange={(e) => set({ ...x, product: e.target.value || undefined })}>
                    <option value="">Ninguno</option>
                    {c.products.map((p) => (
                      <option key={p.slug} value={p.slug}>{p.name.es}</option>
                    ))}
                  </select>
                </Label>
              </>
            )}
          />
        )}

        {tab === 'Galería' && (
          <ListEditor<Photo>
            items={c.gallery}
            onChange={(v) => update({ gallery: v })}
            title={(x) => x.caption.es || x.src}
            addLabel="Agregar foto"
            blank={() => ({ src: '', caption: emptyT() })}
            render={(x, set) => (
              <>
                <ImageField label="Foto" token={token} value={x.src} onChange={(v) => set({ ...x, src: v })} />
                <Bilingual label="Descripción" value={x.caption} onChange={(v) => set({ ...x, caption: v })} />
              </>
            )}
          />
        )}

        {tab === 'Reservas' && <Bookings token={token} />}
      </main>
    </div>
  )
}
