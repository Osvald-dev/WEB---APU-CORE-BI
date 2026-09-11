import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { contenido } from '../data/contenido'

function iniciales(nombre: string) {
  const partes = nombre.trim().split(/\s+/)
  const primera = partes[0]?.[0] ?? ''
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : ''
  return (primera + ultima).toUpperCase()
}

function PersonaFoto({ nombre, foto }: { nombre: string; foto: string }) {
  const [error, setError] = useState(false)

  if (error) {
    return (
      <div className="flex h-[132px] w-[132px] flex-none items-center justify-center rounded-full bg-line-soft">
        <span className="font-serif-display text-2xl text-ink">{iniciales(nombre)}</span>
      </div>
    )
  }

  return (
    <img
      src={foto}
      alt={nombre}
      onError={() => setError(true)}
      className="h-[132px] w-[132px] flex-none rounded-full object-cover grayscale-[0.25]"
    />
  )
}

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

        <motion.div
          className="mt-12 grid grid-cols-1 gap-[34px] min-[760px]:grid-cols-2 min-[760px]:gap-11"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={container(shouldReduceMotion ? 0 : 0.12)}
        >
          {equipo.personas.map((persona) => (
            <motion.div key={persona.nombre} variants={item}>
              <PersonaFoto nombre={persona.nombre} foto={persona.foto} />

              <h3 className="mt-5 font-serif-display text-xl text-ink">{persona.nombre}</h3>
              <p className="mt-1 font-sans text-sm text-bronze">{persona.rol}</p>
              <p className="mt-3 font-sans text-[0.95rem] text-slate">{persona.bio}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Equipo
