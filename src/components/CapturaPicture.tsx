import type { Captura } from '../data/capturas'

// Un solo <picture> por captura: en celular (< 640 px) baja la versión vertical
// si existe; si no, la de escritorio. Nunca descarga las dos.
function CapturaPicture({
  captura,
  alt,
  prioridad = false,
  className = '',
}: {
  captura: Captura
  alt: string
  prioridad?: boolean
  className?: string
}) {
  const { escritorio, movil } = captura

  return (
    <picture>
      {movil && (
        <source media="(max-width: 639px)" srcSet={movil.src} width={movil.ancho} height={movil.alto} />
      )}
      <img
        src={escritorio.src}
        width={escritorio.ancho}
        height={escritorio.alto}
        alt={alt}
        loading={prioridad ? 'eager' : 'lazy'}
        fetchPriority={prioridad ? 'high' : undefined}
        decoding="async"
        className={`block h-auto w-full ${className}`}
      />
    </picture>
  )
}

export default CapturaPicture
