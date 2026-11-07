import { motion, useReducedMotion } from 'framer-motion'
import { contenido } from '../data/contenido'
import RichText from './RichText'
import CapturaPicture from './CapturaPicture'
import type { Captura as ArchivosCaptura } from '../data/capturas'

type Imagen = { archivos: ArchivosCaptura; alt: string }

// Captura enmarcada. Se abre a tamaño completo en otra pestaña para leer el detalle.
function Captura({ imagen }: { imagen: Imagen }) {
  return (
    <a
      href={imagen.archivos.escritorio.src}
      target="_blank"
      rel="noopener noreferrer"
      className="block border border-line bg-card p-1.5 transition-colors hover:border-bronze"
    >
      <CapturaPicture captura={imagen.archivos} alt={imagen.alt} />
    </a>
  )
}

function Subtitulo({ children }: { children: React.ReactNode }) {
  return <h3 className="font-serif-display text-2xl text-ink sm:text-[1.75rem]">{children}</h3>
}

function Sac() {
  const { sac } = contenido
  const shouldReduceMotion = useReducedMotion()

  const item = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }
  const reveal = {
    initial: 'hidden',
    whileInView: 'visible',
    viewport: { once: true, amount: 0.15 },
    variants: item,
  } as const

  return (
    <section id={sac.id} className="border-b border-line px-6 py-[78px]">
      <div className="mx-auto max-w-6xl">
        {/* 4.1 — La ronda */}
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{sac.eyebrow}</span>
        </div>

        <h2 className="mt-3 font-serif-display text-[clamp(1.85rem,4vw,2.7rem)] text-ink">
          {sac.titulo}
        </h2>

        <p className="mt-6 max-w-[62ch] font-sans text-slate">
          <RichText text={sac.lede} />
        </p>
        <p className="mt-4 max-w-[62ch] font-sans text-slate">{sac.rondaIntro}</p>

        <div className="mt-8 grid grid-cols-1 gap-px bg-line min-[760px]:grid-cols-3">
          {sac.roturas.map((r) => (
            <div key={r.titulo} className="bg-card px-[18px] py-5">
              <h4 className="font-sans text-[0.97rem] font-semibold text-ink">{r.titulo}</h4>
              <p className="mt-1 font-sans text-[0.9rem] text-slate">{r.texto}</p>
            </div>
          ))}
        </div>

        {/* 4.2 — Qué hace */}
        <div className="mt-20">
          <Subtitulo>{sac.queHace.titulo}</Subtitulo>
          <p className="mt-3 max-w-[62ch] font-sans text-slate">{sac.queHace.lede}</p>

          <div className="mt-10 flex flex-col gap-14">
            {sac.queHace.items.map((it, i) => (
              <motion.div
                key={it.titulo}
                {...reveal}
                className="grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12"
              >
                <div className={i % 2 === 1 ? 'lg:order-2' : ''}>
                  <span className="font-mono text-sm text-bronze">0{i + 1}</span>
                  <h4 className="mt-1 font-serif-display text-[1.45rem] text-ink">{it.titulo}</h4>
                  <p className="mt-2 font-sans text-[0.97rem] text-slate">
                    <RichText text={it.texto} />
                  </p>
                </div>
                <div className={i % 2 === 1 ? 'lg:order-1' : ''}>
                  <Captura imagen={it.imagen} />
                </div>
              </motion.div>
            ))}
          </div>

          <p className="mt-14 max-w-[40ch] font-serif-display text-[clamp(1.4rem,3vw,1.9rem)] leading-[1.2] text-ink">
            {sac.queHace.cierre}
          </p>
        </div>

        {/* 4.3 — El día */}
        <div className="mt-20 border-t border-line pt-16">
          <Subtitulo>{sac.dia.titulo}</Subtitulo>

          <ol className="mt-8 max-w-3xl">
            {sac.dia.pasos.map((paso, i) => (
              <li
                key={paso.hora}
                className={`grid grid-cols-[92px_1fr] gap-x-4 py-4 sm:grid-cols-[130px_1fr] sm:gap-x-6 ${
                  i === 0 ? '' : 'border-t border-line-soft'
                }`}
              >
                <span className="pt-0.5 font-mono text-sm text-bronze">{paso.hora}</span>
                <div>
                  <h4 className="font-sans text-[0.97rem] font-semibold text-ink">{paso.titulo}</h4>
                  <p className="mt-1 font-sans text-[0.93rem] text-slate">{paso.texto}</p>
                </div>
              </li>
            ))}
          </ol>

          <motion.div {...reveal} className="mt-10">
            <Captura imagen={sac.dia.imagen} />
          </motion.div>

          <p className="mt-10 max-w-[64ch] border-l-2 border-bronze pl-4 font-sans text-ink">
            {sac.dia.cierre}
          </p>
        </div>

        {/* 4.4 — El tiempo que te devuelve (versión sin datos de cliente) */}
        <div className="mt-20 border-t border-line pt-16">
          <Subtitulo>{sac.cuenta.titulo}</Subtitulo>

          <div className="mt-8 max-w-3xl border border-line bg-card p-6 sm:p-8">
            <p className="font-serif-display text-[clamp(1.4rem,3vw,1.9rem)] leading-[1.2] text-ink">
              {sac.cuenta.destacado}
            </p>
            <ol className="mt-5 flex flex-col gap-2">
              {sac.cuenta.lineas.map((linea, i) => (
                <li key={linea} className="flex items-baseline gap-3 font-sans text-ink">
                  <span className="w-5 flex-none font-mono text-sm text-bronze">{i === 0 ? '' : '×'}</span>
                  {linea}
                </li>
              ))}
            </ol>
            <p className="mt-6 border-t border-line-soft pt-5 font-sans text-slate">{sac.cuenta.cierre}</p>
          </div>
        </div>

        {/* 4.5 — Plazos conservadores */}
        <div className="mt-20 border-t border-line pt-16">
          <Subtitulo>{sac.plazos.titulo}</Subtitulo>

          <div className="mt-8 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
            {sac.plazos.puntos.map((p) => (
              <div key={p.titulo} className="bg-card px-[18px] py-5">
                <h4 className="font-sans text-[0.97rem] font-semibold text-ink">{p.titulo}</h4>
                <p className="mt-1 font-sans text-[0.9rem] text-slate">{p.texto}</p>
              </div>
            ))}
          </div>

          <p className="mt-8 max-w-[64ch] border-l-2 border-bronze pl-4 font-sans text-slate">
            <RichText text={sac.plazos.nota} />
          </p>
        </div>

        {/* 4.6 — Dónde funciona */}
        <div className="mt-20 border-t border-line pt-16">
          <Subtitulo>{sac.provincias.titulo}</Subtitulo>

          <div className="mt-8 grid grid-cols-1 gap-px bg-line sm:grid-cols-2">
            {sac.provincias.items.map((p) => (
              <div key={p.nombre} className="bg-card px-[18px] py-5">
                <span
                  className={`inline-flex items-center gap-2 font-mono text-xs ${p.activo ? 'text-teal' : 'text-slate'}`}
                >
                  <span
                    className={`h-2 w-2 rounded-full ${p.activo ? 'bg-teal' : 'border border-slate'}`}
                    aria-hidden="true"
                  />
                  {p.estado}
                </span>
                <h4 className="mt-2 font-sans text-[0.97rem] font-semibold text-ink">{p.nombre}</h4>
                <p className="mt-1 font-sans text-[0.9rem] text-slate">{p.texto}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 font-sans text-slate">{sac.provincias.aviso}</p>
        </div>

        {/* 4.7 — Qué no hace */}
        <div className="mt-20 border-t border-line pt-16">
          <Subtitulo>{sac.noHace.titulo}</Subtitulo>
          <p className="mt-3 max-w-[62ch] font-sans text-slate">{sac.noHace.lede}</p>

          <ul className="mt-8 max-w-3xl">
            {sac.noHace.puntos.map((p, i) => (
              <li
                key={p.titulo}
                className={`flex items-start gap-3 py-4 ${i === 0 ? '' : 'border-t border-line-soft'}`}
              >
                <span className="mt-[7px] h-3 w-3 flex-none rounded-full border border-slate" />
                <div>
                  <h4 className="font-sans text-[0.97rem] font-semibold text-ink">{p.titulo}</h4>
                  <p className="mt-1 font-sans text-[0.93rem] text-slate">{p.texto}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* 4.8 — Puesta en marcha */}
        <div className="mt-20 border-t border-line pt-16">
          <Subtitulo>{sac.puestaEnMarcha.titulo}</Subtitulo>
          <p className="mt-3 max-w-[62ch] font-sans text-slate">
            <RichText text={sac.puestaEnMarcha.lede} />
          </p>

          <div className="mt-8 grid grid-cols-1 gap-px bg-line min-[760px]:grid-cols-3">
            {sac.puestaEnMarcha.pasos.map((p) => (
              <div key={p.titulo} className="bg-card p-6">
                <span className="font-mono text-xs text-bronze">{p.numero}</span>
                <h4 className="mt-2 font-sans text-[0.97rem] font-semibold text-ink">{p.titulo}</h4>
                <p className="mt-1 font-sans text-[0.9rem] text-slate">
                  <RichText text={p.texto} />
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cierre: CTA del diagnóstico y en qué planes entra */}
        <div className="mt-16 flex flex-col items-start gap-5 border border-bronze bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-[34ch] font-serif-display text-[1.35rem] leading-snug text-ink">
            <RichText text={sac.cierre.planes} />
          </p>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <a
              href={sac.cierre.ctaHref}
              className="whitespace-nowrap border border-ink bg-ink px-5 py-3 font-sans text-sm text-paper transition-colors hover:bg-transparent hover:text-ink"
            >
              {sac.cierre.ctaLabel}
            </a>
            <span className="font-mono text-xs text-slate">{sac.cierre.notaCta}</span>
          </div>
        </div>

        <p className="mt-8 max-w-[62ch] font-sans text-xs text-slate">{sac.notaCapturas}</p>
      </div>
    </section>
  )
}

export default Sac
