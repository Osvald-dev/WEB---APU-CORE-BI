import { motion, useReducedMotion } from 'framer-motion'
import { contenido } from '../data/contenido'
import RichText from './RichText'

function ComoTrabajamos() {
  const { comoTrabajamos } = contenido
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.section
      id={comoTrabajamos.id}
      className="bg-[#1A2024] px-6 py-[78px] text-[#EDF0F0]"
      initial={shouldReduceMotion ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7 }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze-br" />
          <span className="font-mono text-xs text-[#C8D1D3]">{comoTrabajamos.eyebrow}</span>
        </div>

        <h2 className="mt-3 max-w-[26ch] font-serif-display text-[clamp(1.85rem,4vw,2.7rem)] text-[#EDF0F0]">
          {comoTrabajamos.titulo}
        </h2>

        <p className="mt-6 max-w-[62ch] font-sans text-[#C8D1D3]">{comoTrabajamos.lede}</p>

        <div className="mt-12 grid grid-cols-1 gap-x-12 gap-y-10 min-[760px]:grid-cols-2">
          <div>
            <h3 className="font-sans text-sm font-semibold text-bronze-br">Lo que hacemos</h3>
            <ul className="mt-5">
              {comoTrabajamos.hacemos.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 py-4 ${
                    i === 0 ? '' : 'border-t border-white/[0.11]'
                  }`}
                >
                  <span className="mt-[11px] h-px w-3.5 flex-none bg-bronze-br" />
                  <span className="font-sans text-[0.97rem] text-[#EDF0F0]">
                    <RichText text={item} strongClassName="font-semibold text-bronze-br" />
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-semibold text-bronze-br">Lo que no hacemos</h3>
            <ul className="mt-5">
              {comoTrabajamos.noHacemos.map((item, i) => (
                <li
                  key={item}
                  className={`flex items-start gap-3 py-4 ${
                    i === 0 ? '' : 'border-t border-white/[0.11]'
                  }`}
                >
                  <span className="mt-[5px] h-3 w-3 flex-none rounded-full border border-[#6E7B80]" />
                  <span className="font-sans text-[0.97rem] text-[#EDF0F0]">
                    <RichText text={item} strongClassName="font-semibold text-bronze-br" />
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default ComoTrabajamos
