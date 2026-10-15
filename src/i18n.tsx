import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'es'
export type T = { en: string; es: string }
export type TList = { en: string[]; es: string[] }

type Ctx = {
  lang: Lang
  setLang: (l: Lang) => void
  t: (v: T) => string
  tl: (v: TList) => string[]
}

const LangContext = createContext<Ctx | null>(null)

function initialLang(): Lang {
  return 'es'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const setLang = (l: Lang) => {
    localStorage.setItem('lang', l)
    setLangState(l)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: (v) => v[lang], tl: (v) => v[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used inside LangProvider')
  return ctx
}
