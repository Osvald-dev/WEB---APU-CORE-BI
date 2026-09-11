import { motion, useReducedMotion } from 'framer-motion'
import { contenido } from '../data/contenido'

const container = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
})

function Planes() {
  const { planes } = contenido
  const shouldReduceMotion = useReducedMotion()

  const item = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id={planes.id} className="border-b border-line px-6 py-[78px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{planes.eyebrow}</span>
        </div>

        <h2 className="mt-3 font-serif-display text-[clamp(1.85rem,4vw,2.7rem)] text-ink">
          {planes.titulo}
        </h2>

        <p className="mt-6 max-w-[62ch] font-sans text-slate">{planes.lede}</p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-px bg-line min-[860px]:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container(shouldReduceMotion ? 0 : 0.1)}
        >
          {planes.items.map((plan) => (
            <motion.div
              key={plan.id}
              variants={item}
              className={`relative flex flex-col bg-card p-8 ${
                plan.destacado ? 'outline outline-2 outline-offset-[-2px] outline-bronze' : ''
              }`}
            >
              {plan.destacado && plan.etiquetaDestacado && (
                <span className="absolute right-0 top-0 bg-bronze px-2.5 py-1 font-sans text-[0.72rem] text-white">
                  {plan.etiquetaDestacado}
                </span>
              )}

              <h3 className="font-serif-display text-2xl text-ink">{plan.nombre}</h3>
              <p className="mt-1 font-sans text-sm text-bronze">{plan.quien}</p>

              <ul className="mt-6">
                {plan.features.map((feature, i) => (
                  <li
                    key={feature}
                    className={`flex items-start gap-3 py-3 ${
                      i === 0 ? '' : 'border-t border-line-soft'
                    }`}
                  >
                    <span className="mt-[10px] h-px w-3.5 flex-none bg-ink" />
                    <span className="font-sans text-sm text-ink">{feature}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#contacto"
                className="mt-auto self-start border border-ink bg-ink px-5 py-3 font-sans text-sm text-paper transition-colors hover:bg-transparent hover:text-ink"
              >
                {plan.ctaLabel}
              </a>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 gap-px border-t border-line-soft bg-line min-[760px]:grid-cols-2">
          {planes.complementos.map((complemento) => (
            <div key={complemento.nombre} className="bg-card p-8">
              <h3 className="font-serif-display text-[1.1rem] text-ink">{complemento.nombre}</h3>
              <p className="mt-1 font-sans text-sm text-bronze">{complemento.aplicaA}</p>
              <p className="mt-3 font-sans text-slate">{complemento.texto}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-[64ch] border-l-2 border-bronze pl-4 font-sans text-slate">
          {planes.notaPrecios}
        </p>
      </div>
    </section>
  )
}

export default Planes
