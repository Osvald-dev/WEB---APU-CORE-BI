import { contenido } from '../data/contenido'
import RichText from './RichText'

function Preguntas() {
  const { preguntas } = contenido

  return (
    <section id={preguntas.id} className="border-b border-line px-6 py-[78px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{preguntas.eyebrow}</span>
        </div>

        <h2 className="mt-3 max-w-[24ch] font-serif-display text-[clamp(1.85rem,4vw,2.7rem)] text-ink">
          {preguntas.titulo}
        </h2>

        <div className="mt-12 max-w-3xl border-b border-line">
          {preguntas.items.map((item) => (
            <details key={item.pregunta} className="group border-t border-line">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-5 font-sans text-[1.02rem] font-semibold text-ink transition-colors hover:text-bronze [&::-webkit-details-marker]:hidden">
                {item.pregunta}
                <span
                  aria-hidden="true"
                  className="mt-0.5 flex-none font-mono text-lg leading-none text-bronze transition-transform group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="max-w-[62ch] pb-6 font-sans text-[0.97rem] text-slate">
                <RichText text={item.respuesta} />
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Preguntas
