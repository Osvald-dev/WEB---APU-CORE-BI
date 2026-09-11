import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { contenido } from '../data/contenido'

const WORD_SIZE = 'text-[clamp(1.4rem,4vw,2rem)] font-serif-display'

function HeroRotativo() {
  const { heroRotativo } = contenido
  const { palabras } = heroRotativo
  const shouldReduceMotion = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (shouldReduceMotion) return

    const isLast = index === palabras.length - 1
    const duration = isLast ? 2800 : 1800

    const timer = setTimeout(() => {
      setIndex((prev) => (prev + 1) % palabras.length)
    }, duration)

    return () => clearTimeout(timer)
  }, [index, shouldReduceMotion, palabras.length])

  const palabraActual = shouldReduceMotion ? palabras[palabras.length - 1] : palabras[index]

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <span className={`${WORD_SIZE} text-ink`}>{heroRotativo.prefijo}</span>

        <span className="relative inline-grid overflow-hidden align-bottom">
          {palabras.map((palabra) => (
            <span
              key={palabra}
              aria-hidden="true"
              className={`invisible col-start-1 row-start-1 whitespace-nowrap ${WORD_SIZE}`}
            >
              {palabra}
            </span>
          ))}

          <AnimatePresence initial={false}>
            <motion.span
              key={shouldReduceMotion ? 'static' : index}
              initial={shouldReduceMotion ? false : { y: '100%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { y: '-100%', opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className={`col-start-1 row-start-1 whitespace-nowrap ${WORD_SIZE} text-bronze`}
            >
              {palabraActual}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>

      <p className="mt-4 font-mono text-xs text-slate">{heroRotativo.cierre}</p>
    </div>
  )
}

export default HeroRotativo
