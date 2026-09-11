import { contenido } from '../data/contenido'

function Footer() {
  const { footer } = contenido

  return (
    <footer className="bg-ink px-6 py-[44px] text-[#93A0A4]">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 font-sans text-[0.88rem] sm:flex-row sm:items-center sm:justify-between">
        <span>{footer.marca}</span>

        <div className="flex flex-wrap items-center gap-2">
          {footer.links.map((link, i) => (
            <span key={link.label} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden="true">·</span>}
              <a
                href={link.href}
                className="border-b border-white/25 text-paper/90 transition-colors hover:border-white/50"
              >
                {link.label}
              </a>
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
