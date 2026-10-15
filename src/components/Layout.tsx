import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useLang } from '../i18n'
import { prettyPhone, useContent, waLink } from '../content'

const nav = [
  { to: '/therapies', en: 'Therapies', es: 'Terapias' },
  { to: '/shop', en: 'Shop', es: 'Tienda' },
  { to: '/wellness', en: 'Wellness tips', es: 'Consejos' },
  { to: '/gallery', en: 'Gallery', es: 'Galería' },
]

function LangSwitch() {
  const { lang, setLang } = useLang()
  return (
    <div className="flex text-xs tracking-widest">
      {(['en', 'es'] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          className={`px-2 py-1 uppercase ${lang === l ? 'text-ink' : 'text-ink/40 hover:text-ink'}`}
        >
          {l}
        </button>
      ))}
    </div>
  )
}

export default function Layout() {
  const { t } = useLang()
  const { business, serviceAreas } = useContent()
  const [open, setOpen] = useState(false)

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 border-b border-line bg-cream/95">
        <div className="wrap flex h-20 items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src="/logo-mark.png" alt="" className="h-12 w-12 object-contain" />
            <span className="leading-tight">
              <span className="block font-serif text-xl">AromaTouch</span>
              <span className="block text-[11px] uppercase tracking-[0.25em] text-gold">by Nayibe A</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-7 text-sm lg:flex">
            {nav.map((n) => (
              <NavLink
                key={n.to}
                to={n.to}
                className={({ isActive }) => (isActive ? 'text-teal' : 'text-ink/80 hover:text-ink')}
              >
                {t(n)}
              </NavLink>
            ))}
          </nav>
          <div className="hidden items-center gap-4 lg:flex">
            <LangSwitch />
            <Link to="/book" className="btn">
              {t({ en: 'Book a session', es: 'Reservar' })}
            </Link>
          </div>
          <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {open && (
          <div className="border-t border-line lg:hidden">
            <div className="wrap flex flex-col py-4">
              {nav.map((n) => (
                <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} className="border-b border-line py-3">
                  {t(n)}
                </NavLink>
              ))}
              <div className="flex items-center justify-between pt-4">
                <LangSwitch />
                <Link to="/book" className="btn" onClick={() => setOpen(false)}>
                  {t({ en: 'Book a session', es: 'Reservar' })}
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-24 bg-ink text-cream/80">
        <div className="wrap grid gap-10 py-14 md:grid-cols-3">
          <div>
            <img src="/logo.png" alt="AromaTouch by Nayibe A" className="h-28 w-auto" />
            <p className="mt-4 max-w-xs text-sm">
              {t({
                en: `Essential oil therapy by ${business.owner} in ${business.city}.`,
                es: `Terapia con aceites esenciales por ${business.owner} en ${business.city}.`,
              })}
            </p>
          </div>
          <div className="text-sm">
            <p className="eyebrow text-gold-light">{t({ en: 'Contact', es: 'Contacto' })}</p>
            <ul className="mt-4 space-y-2">
              {business.phone && (
                <li>
                  <a className="text-sky-300 hover:text-sky-200" href={`tel:+${business.phone.replace(/\D/g, '')}`}>
                    {prettyPhone(business.phone)}
                  </a>
                </li>
              )}
              {business.whatsapp && (
                <li>
                  <a
                    className="text-sky-300 hover:text-sky-200"
                    href={waLink(business.whatsapp, t({ en: 'Hi Nayibe, ', es: 'Hola Nayibe, ' }))}
                    target="_blank"
                    rel="noreferrer"
                  >
                    WhatsApp
                  </a>
                </li>
              )}
              {business.email && (
                <li>
                  <a className="text-sky-300 hover:text-sky-200" href={`mailto:${business.email}`}>
                    {business.email}
                  </a>
                </li>
              )}
              {business.instagram && (
                <li>
                  <a className="text-sky-300 hover:text-sky-200" href={business.instagram} target="_blank" rel="noreferrer">
                    Instagram
                  </a>
                </li>
              )}
              {business.facebook && (
                <li>
                  <a className="text-sky-300 hover:text-sky-200" href={business.facebook} target="_blank" rel="noreferrer">
                    Facebook
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div className="text-sm">
            <p className="eyebrow text-gold-light">{t({ en: 'Serving', es: 'Atendemos' })}</p>
            <p className="mt-4 leading-relaxed">{serviceAreas.join(' · ')}</p>
          </div>
        </div>
        <div className="border-t border-cream/10">
          <div className="wrap py-6 text-xs leading-relaxed text-cream/50">
            {t({
              en: 'Independent doTERRA Wellness Advocate. These statements have not been evaluated by the Food and Drug Administration. Products are not intended to diagnose, treat, cure or prevent any disease.',
              es: 'Wellness Advocate independiente de doTERRA. Estas declaraciones no han sido evaluadas por la FDA. Los productos no pretenden diagnosticar, tratar, curar ni prevenir ninguna enfermedad.',
            })}
          </div>
        </div>
      </footer>
    </div>
  )
}
