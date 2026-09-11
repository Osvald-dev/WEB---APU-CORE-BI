import { motion, useReducedMotion } from 'framer-motion'
import { contenido } from '../data/contenido'
import RichText from './RichText'

const container = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
})

function ComoEmpezamos() {
  const { comoEmpezamos } = contenido
  const shouldReduceMotion = useReducedMotion()

  const item = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id={comoEmpezamos.id} className="border-b border-line px-6 py-[78px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{comoEmpezamos.eyebrow}</span>
        </div>

        <h2 className="mt-3 font-serif-display text-[clamp(1.85rem,4vw,2.7rem)] text-ink">
          {comoEmpezamos.titulo}
        </h2>

        <p className="mt-6 max-w-[62ch] font-sans text-slate">{comoEmpezamos.lede}</p>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-px bg-line min-[520px]:grid-cols-2 min-[860px]:grid-cols-4"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container(shouldReduceMotion ? 0 : 0.1)}
        >
          {comoEmpezamos.pasos.map((paso) => (
            <motion.div key={paso.numero} variants={item} className="bg-card px-6 py-7">
              <span className="font-mono text-xs text-bronze">{paso.numero}</span>
              <h3 className="mt-3 font-sans text-base font-semibold text-ink">{paso.titulo}</h3>
              <p className="mt-2 font-sans text-[0.88rem] text-slate">
                <RichText text={paso.texto} />
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default ComoEmpezamos
