import { contenido } from '../data/contenido'
import RichText from './RichText'

function CTAFinal() {
  const { ctaFinal } = contenido

  return (
    <section className="px-6 py-[84px]">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-[19ch] font-serif-display text-[clamp(2.1rem,4.5vw,3.6rem)] leading-[1.08] text-ink">
          {ctaFinal.titulo}
        </h2>

        <p className="mt-6 max-w-[52ch] font-sans text-slate">
          <RichText text={ctaFinal.nota} />
        </p>

        <a
          href={ctaFinal.ctaHref}
          className="mt-8 inline-block border border-ink bg-ink px-5 py-3 font-sans text-sm text-paper transition-colors hover:bg-transparent hover:text-ink"
        >
          {ctaFinal.ctaLabel}
        </a>

        <p className="mt-6 font-sans text-sm text-slate">{ctaFinal.ubicacion}</p>
      </div>
    </section>
  )
}

export default CTAFinal
