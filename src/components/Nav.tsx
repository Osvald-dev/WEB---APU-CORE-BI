import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { contenido } from '../data/contenido'
import logoApu from '../assets/logoapu.png'

function Nav() {
  const { nav } = contenido
  const [abierto, setAbierto] = useState(false)

  // Cierra el menú móvil con Escape o al pasar a pantalla grande.
  useEffect(() => {
    if (!abierto) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setAbierto(false)
    }
    const mq = window.matchMedia('(min-width: 840px)')
    const onMq = () => {
      if (mq.matches) setAbierto(false)
    }
    window.addEventListener('keydown', onKey)
    mq.addEventListener('change', onMq)
    return () => {
      window.removeEventListener('keydown', onKey)
      mq.removeEventListener('change', onMq)
    }
  }, [abierto])

  const cerrar = () => setAbierto(false)

  return (
    <header className="sticky top-0 z-50 h-[68px] border-b border-line-soft bg-paper/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a href="#" className="flex shrink-0 items-center gap-2" onClick={cerrar}>
          <img src={logoApu} alt={nav.marca} className="h-12 w-auto sm:h-16" />
        </a>

        <div className="flex items-center gap-3 min-[840px]:gap-8">
          <nav className="hidden items-center gap-6 min-[840px]:flex">
            {nav.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-sans text-sm text-ink transition-colors hover:text-bronze"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={nav.appHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden border border-ink px-4 py-2 font-sans text-sm text-ink transition-colors hover:bg-ink hover:text-paper min-[840px]:inline-block"
            >
              {nav.appLabel}
            </a>

            <a
              href={nav.ctaHref}
              onClick={cerrar}
              className="whitespace-nowrap border border-ink bg-ink px-3 py-2 font-sans text-sm text-paper transition-colors hover:bg-transparent hover:text-ink sm:px-4"
            >
              {nav.ctaLabel}
            </a>

            <button
              type="button"
              onClick={() => setAbierto((v) => !v)}
              aria-expanded={abierto}
              aria-controls="menu-movil"
              aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
              className="flex h-10 w-10 items-center justify-center border border-ink text-ink transition-colors hover:bg-ink hover:text-paper min-[840px]:hidden"
            >
              {abierto ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {abierto && (
        <nav
          id="menu-movil"
          className="absolute inset-x-0 top-full border-b border-line-soft bg-paper shadow-sm min-[840px]:hidden"
        >
          <ul className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {nav.links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={cerrar}
                  className="block border-b border-line-soft py-3 font-sans text-base text-ink transition-colors hover:text-bronze"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="py-3">
              <a
                href={nav.appHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={cerrar}
                className="block border border-ink px-4 py-3 text-center font-sans text-base text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                {nav.appLabel}
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Nav
