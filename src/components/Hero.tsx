import { contenido } from '../data/contenido'
import HeroRotativo from './HeroRotativo'
import RichText from './RichText'

function Hero() {
  const { hero } = contenido

  return (
    <section className="border-b border-line px-6 pb-[76px] pt-[88px]">
      <div className="mx-auto max-w-6xl">
        <h1 className="max-w-[15ch] font-serif-display text-[clamp(2.4rem,5vw,4.1rem)] leading-[1.05] text-ink">
          {hero.titulo}
        </h1>

        <p className="mt-6 max-w-[56ch] font-sans text-[1.1rem] text-slate">
          <RichText text={hero.lede} />
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={hero.ctaPrimario.href}
            className="border border-ink bg-ink px-5 py-3 font-sans text-sm text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            {hero.ctaPrimario.label}
          </a>
          <a
            href={hero.ctaSecundario.href}
            className="border border-ink bg-transparent px-5 py-3 font-sans text-sm text-ink transition-colors hover:bg-ink hover:text-paper"
          >
            {hero.ctaSecundario.label}
          </a>
        </div>

        <p className="mt-4 font-sans text-sm text-slate">{hero.publico}</p>

        <div className="mt-16">
          <HeroRotativo />
        </div>
      </div>
    </section>
  )
}

export default Hero
