import { contenido } from '../data/contenido'
import logoApu from '../assets/logoapu.png'

function Nav() {
  const { nav } = contenido

  return (
    <header className="sticky top-0 z-50 h-[68px] border-b border-line-soft bg-paper/80 backdrop-blur">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <a href="#" className="flex items-center gap-2">
          <img src={logoApu} alt={nav.marca} className="h-16 w-auto" />
        </a>

        <div className="flex items-center gap-8">
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

          <a
            href={nav.ctaHref}
            className="border border-ink bg-ink px-4 py-2 font-sans text-sm text-paper transition-colors hover:bg-transparent hover:text-ink"
          >
            {nav.ctaLabel}
          </a>
        </div>
      </div>
    </header>
  )
}

export default Nav
