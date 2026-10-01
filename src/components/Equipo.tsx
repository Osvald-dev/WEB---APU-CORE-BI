import { motion, useReducedMotion } from 'framer-motion'
import { contenido } from '../data/contenido'

const container = (stagger: number) => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger } },
})

function Equipo() {
  const { equipo } = contenido
  const shouldReduceMotion = useReducedMotion()

  const item = {
    hidden: shouldReduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section id={equipo.id} className="border-b border-line px-6 py-[78px]">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{equipo.eyebrow}</span>
        </div>

        <h2 className="mt-3 font-serif-display text-[clamp(1.85rem,4vw,2.7rem)] text-ink">
          {equipo.titulo}
        </h2>

        <p className="mt-6 max-w-[62ch] font-sans text-slate">{equipo.lede}</p>

        <motion.ul
          className="mt-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container(shouldReduceMotion ? 0 : 0.12)}
        >
          {equipo.personas.map((persona) => (
            // Desktop: foto | nombre | descripción. Mobile: foto | nombre, descripción abajo a todo el ancho.
            <motion.li
              key={persona.nombre}
              variants={item}
              className="grid grid-cols-[56px_minmax(0,1fr)] items-center gap-x-4 gap-y-3 border-t border-line py-6 min-[641px]:grid-cols-[72px_minmax(0,1fr)_minmax(0,1.6fr)] min-[641px]:gap-6"
            >
              <img
                src={persona.foto}
                alt={persona.nombre}
                width={72}
                height={72}
                loading="lazy"
                className="h-14 w-14 rounded-full object-cover object-[center_top] min-[641px]:h-[72px] min-[641px]:w-[72px]"
              />
              <h3 className="font-serif-display text-xl text-ink">{persona.nombre}</h3>
              <p className="col-span-full font-sans text-[0.95rem] text-slate min-[641px]:col-span-1">
                {persona.descripcion}
              </p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

export default Equipo
