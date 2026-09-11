import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { contenido } from '../data/contenido'
import { casos } from '../data/casos'
import type { CasoResultado } from '../data/casos'
import RichText from './RichText'

function CasoMedia({
  caso,
  emptyTitulo,
  emptyTexto,
}: {
  caso: CasoResultado
  emptyTitulo: string
  emptyTexto: string
}) {
  if (caso.media.length === 0) {
    return (
      <div
        className="flex aspect-[16/10] flex-col items-center justify-center gap-2 bg-card px-6 text-center"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, var(--line) 0px, var(--line) 1px, transparent 1px, transparent 16px)',
        }}
      >
        <p className="font-serif-display text-xl text-ink">{emptyTitulo}</p>
        <p className="max-w-[38ch] font-sans text-sm text-slate">{emptyTexto}</p>
      </div>
    )
  }

  const media = caso.media[0]

  if (media.type === 'image') {
    return (
      <div className="aspect-[16/10] overflow-hidden bg-card">
        <img src={media.src} alt={media.alt} className="h-full w-full object-cover" />
      </div>
    )
  }

  return (
    <div className="aspect-[16/10] overflow-hidden bg-card">
      <video
        src={media.src}
        poster={media.poster}
        controls
        aria-label={media.alt}
        className="h-full w-full object-cover"
      />
    </div>
  )
}

function CasoCard({
  caso,
  emptyTitulo,
  emptyTexto,
}: {
  caso: CasoResultado
  emptyTitulo: string
  emptyTexto: string
}) {
  return (
    <div className="border border-line bg-card">
      <div className="border-b border-line px-5 py-3">
        <span className="font-mono text-xs text-bronze">{caso.fuero}</span>
      </div>

      <CasoMedia caso={caso} emptyTitulo={emptyTitulo} emptyTexto={emptyTexto} />

      {(caso.metricas.length > 0 || caso.cita) && (
        <div className="px-5 py-5">
          {caso.metricas.length > 0 && (
            <table className="w-full border border-line text-sm">
              <tbody>
                {caso.metricas.map((m) => (
                  <tr key={m.label} className="border-t border-line first:border-t-0">
                    <td className="border-r border-line px-3 py-2 font-sans text-slate">
                      {m.label}
                    </td>
                    <td className="px-3 py-2 font-mono text-ink">
                      {m.antes} → {m.despues}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {caso.cita && (
            <blockquote className={caso.metricas.length > 0 ? 'mt-5' : ''}>
              <p className="font-serif-display text-lg italic text-ink">
                “<RichText text={caso.cita} />”
              </p>
              {caso.autorNombre && (
                <footer className="mt-2 font-sans text-sm not-italic text-slate">
                  — {caso.autorNombre}
                </footer>
              )}
            </blockquote>
          )}
        </div>
      )}
    </div>
  )
}

function CasosResultados() {
  const { casosResultados } = contenido
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start' })
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [canScrollPrev, setCanScrollPrev] = useState(false)
  const [canScrollNext, setCanScrollNext] = useState(false)

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
    setCanScrollPrev(emblaApi.canScrollPrev())
    setCanScrollNext(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section id={casosResultados.id} className="border-b border-line px-6 py-[78px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{casosResultados.eyebrow}</span>
        </div>

        <h2 className="mt-3 font-serif-display text-[clamp(1.85rem,4vw,2.7rem)] text-ink">
          {casosResultados.titulo}
        </h2>

        <p className="mt-6 max-w-[62ch] font-sans text-slate">{casosResultados.lede}</p>

        <div className="mt-12">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {casos.map((caso) => (
                <div key={caso.id} className="min-w-0 flex-[0_0_100%] lg:flex-[0_0_80%]">
                  <CasoCard
                    caso={caso}
                    emptyTitulo={casosResultados.emptyState.titulo}
                    emptyTexto={casosResultados.emptyState.texto}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              disabled={!canScrollPrev}
              aria-label="Caso anterior"
              className="text-ink transition-opacity disabled:opacity-30"
            >
              <ChevronLeft size={22} strokeWidth={1.5} />
            </button>

            <span className="font-mono text-sm text-slate">
              {String(selectedIndex + 1).padStart(2, '0')} / {String(casos.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              disabled={!canScrollNext}
              aria-label="Caso siguiente"
              className="text-ink transition-opacity disabled:opacity-30"
            >
              <ChevronRight size={22} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CasosResultados
