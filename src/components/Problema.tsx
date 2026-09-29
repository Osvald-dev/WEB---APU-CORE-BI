import { motion, useReducedMotion } from 'framer-motion'
import { contenido } from '../data/contenido'
import RichText from './RichText'

const container = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
})

function Problema() {
  const { problema } = contenido
  const shouldReduceMotion = useReducedMotion()

  const item = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id={problema.id} className="border-b border-line px-6 py-[78px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{problema.eyebrow}</span>
        </div>

        <h2 className="mt-3 font-serif-display text-[clamp(1.85rem,4vw,2.7rem)] text-ink">
          {problema.titulo}
        </h2>

        <div className="mt-6 flex max-w-[62ch] flex-col gap-4 font-sans text-slate">
          {problema.parrafos.map((parrafo, i) => (
            <p key={i}>
              <RichText text={parrafo} />
            </p>
          ))}
        </div>

        <motion.div
          className="mt-12 grid grid-cols-1 gap-px bg-line sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container(shouldReduceMotion ? 0 : 0.08)}
        >
          {problema.areas.map((area) => (
            <motion.div key={area.titulo} className="bg-card px-[18px] py-5" variants={item}>
              <h3 className="font-sans text-[0.97rem] font-semibold text-ink">{area.titulo}</h3>
              <p className="mt-1 font-sans text-[0.9rem] text-slate">{area.texto}</p>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-16">
          <h3 className="font-serif-display text-2xl text-ink">{problema.estrategia.titulo}</h3>
          <p className="mt-3 max-w-[62ch] font-sans text-slate">{problema.estrategia.texto}</p>

          <div className="mt-8 grid grid-cols-1 gap-px bg-line min-[760px]:grid-cols-2">
            {problema.estrategia.contraste.map((texto, i) => (
              <div
                key={texto}
                className={`flex items-start gap-3 bg-card p-8 ${
                  i === 1 ? 'outline outline-2 outline-offset-[-2px] outline-bronze' : ''
                }`}
              >
                {i === 0 ? (
                  <span className="mt-[7px] h-3 w-3 flex-none rounded-full border border-slate" />
                ) : (
                  <span className="mt-[12px] h-px w-3.5 flex-none bg-bronze" />
                )}
                <p className={`font-sans ${i === 0 ? 'text-slate' : 'text-ink'}`}>{texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Problema
