export default function PageHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro?: string }) {
  return (
    <section className="border-b border-line">
      <div className="wrap py-14 md:py-20">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="mt-3 max-w-3xl text-4xl leading-tight md:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-ink/70">{intro}</p>}
      </div>
    </section>
  )
}
