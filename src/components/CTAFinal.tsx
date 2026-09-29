import { contenido } from '../data/contenido'
import RichText from './RichText'

function CTAFinal() {
  const { ctaFinal } = contenido

  return (
    <section className="px-6 py-[84px]">
      <div className="mx-auto max-w-6xl">
        <p className="mb-10 max-w-[52ch] border-l-2 border-bronze pl-4 font-serif-display text-[clamp(1.2rem,2.4vw,1.5rem)] italic leading-[1.3] text-slate">
          {ctaFinal.cierre}
        </p>

        <h2 className="max-w-[19ch] font-serif-display text-[clamp(2.1rem,4.5vw,3.6rem)] leading-[1.08] text-ink">
          {ctaFinal.titulo}
        </h2>

        <p className="mt-6 max-w-[52ch] font-sans text-slate">
          <RichText text={ctaFinal.nota} />
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={ctaFinal.ctaHref}
            className="inline-block border border-ink bg-ink px-5 py-3 font-sans text-sm text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            {ctaFinal.ctaLabel}
          </a>
          <span className="font-mono text-xs text-slate">{ctaFinal.notaCta}</span>
        </div>

        <p className="mt-6 font-sans text-sm text-slate">{ctaFinal.ubicacion}</p>
      </div>
    </section>
  )
}

export default CTAFinal
