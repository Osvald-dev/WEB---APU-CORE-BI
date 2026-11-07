import { contenido } from '../data/contenido'
import CapturaPicture from './CapturaPicture'
import HeroRotativo from './HeroRotativo'
import RichText from './RichText'

function Hero() {
  const { hero } = contenido

  return (
    <section className="border-b border-line px-6 pb-[76px] pt-8 sm:pt-14 lg:pt-[88px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{hero.etiqueta}</span>
        </div>

        <h1 className="mt-4 max-w-[15ch] font-serif-display text-[clamp(2.4rem,5vw,4.1rem)] leading-[1.05] text-ink">
          {hero.titulo}
        </h1>

        <p className="mt-6 max-w-[58ch] font-sans text-[1.1rem] text-slate">
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

        <p className="mt-3 font-mono text-xs text-slate">{hero.notaCta}</p>

        {/* Captura del SAC: en escritorio, en marco de navegador; en celular, la vista móvil sin marco */}
        <figure className="mt-14">
          <div className="overflow-hidden border border-line bg-card shadow-[0_18px_50px_-24px_rgba(0,0,0,0.35)]">
            <div className="hidden items-center gap-1.5 border-b border-line px-3 py-2.5 sm:flex" aria-hidden="true">
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
              <span className="h-2.5 w-2.5 rounded-full bg-line" />
            </div>
            {/* En celular se recorta arriba (3:4): lo que corre plazo y su tarea, sin ocupar dos pantallas. */}
            <CapturaPicture
              captura={hero.captura.archivos}
              alt={hero.captura.alt}
              prioridad
              className="max-sm:aspect-[3/4] max-sm:object-cover max-sm:object-top"
            />
          </div>
          <figcaption className="mt-3 font-sans text-xs text-slate">{hero.captura.pie}</figcaption>
        </figure>

        <p className="mt-10 max-w-[64ch] border-l-2 border-bronze pl-4 font-sans text-ink">{hero.confianza}</p>

        <div className="mt-16">
          <HeroRotativo />
        </div>
      </div>
    </section>
  )
}

export default Hero
