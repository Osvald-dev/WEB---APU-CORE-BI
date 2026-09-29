import { motion, useReducedMotion } from 'framer-motion'
import { contenido } from '../data/contenido'
import RichText from './RichText'

const container = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
})

function Sistema() {
  const { sistema } = contenido
  const shouldReduceMotion = useReducedMotion()

  const step = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id={sistema.id} className="border-b border-line px-6 py-[78px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{sistema.eyebrow}</span>
        </div>

        <h2 className="mt-3 font-serif-display text-[clamp(1.85rem,4vw,2.7rem)] text-ink">
          {sistema.titulo}
        </h2>

        <p className="mt-6 max-w-[62ch] font-sans text-slate">{sistema.lede}</p>

        <div className="mt-12">
          {sistema.etapas.map((etapa, i) => (
            <motion.div
              key={etapa.numero}
              className={`grid grid-cols-[38px_1fr] gap-x-3 py-8 sm:grid-cols-[52px_1fr] sm:gap-x-6 ${
                i === 0 ? '' : 'border-t border-line'
              }`}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={step}
            >
              <span className="pt-1 font-mono text-sm text-bronze">{etapa.numero}</span>

              <div>
                <h3 className="font-serif-display text-[1.28rem] text-ink">{etapa.titulo}</h3>
                <p className="mt-2 max-w-[60ch] font-sans text-[0.97rem] text-slate">
                  <RichText text={etapa.texto} />
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {etapa.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-teal px-2.5 py-1 font-sans text-[0.79rem] text-teal"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 border-t border-line pt-12">
          <h3 className="font-serif-display text-2xl text-ink">{sistema.embudo.titulo}</h3>

          <motion.div
            className="mt-8 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={container(shouldReduceMotion ? 0 : 0.08)}
          >
            {sistema.embudo.puntos.map((punto) => (
              <motion.div key={punto.sintoma} className="bg-card px-[18px] py-5" variants={step}>
                <h4 className="font-sans text-[0.97rem] font-semibold text-ink">{punto.sintoma}</h4>
                <p className="mt-1 font-sans text-sm text-bronze">{punto.diagnostico}</p>
                <p className="mt-2 font-sans text-[0.9rem] text-slate">{punto.texto}</p>
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-10 max-w-[64ch] border-l-2 border-bronze pl-4 font-sans text-slate">
            <RichText text={sistema.embudo.cierre} />
          </p>
        </div>
      </div>
    </section>
  )
}

export default Sistema
