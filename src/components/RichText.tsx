// Formato mínimo para los textos de contenido.ts:
// **negrita** y [texto](#ancla). Un enlace puede ir dentro de una negrita.
const LINK = /\[([^\]]+)\]\(([^)\s]+)\)/g

function conEnlaces(text: string, keyBase: string) {
  const parts = text.split(LINK)
  if (parts.length === 1) return text

  const out: React.ReactNode[] = []
  for (let i = 0; i < parts.length; i += 3) {
    if (parts[i]) out.push(parts[i])
    if (i + 2 < parts.length) {
      out.push(
        <a
          key={`${keyBase}-${i}`}
          href={parts[i + 2]}
          className="underline decoration-bronze decoration-1 underline-offset-4 transition-colors hover:text-bronze"
        >
          {parts[i + 1]}
        </a>,
      )
    }
  }
  return out
}

function RichText({
  text,
  strongClassName = 'font-semibold text-ink',
}: {
  text: string
  strongClassName?: string
}) {
  const parts = text.split(/\*\*([^*]+)\*\*/g)

  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className={strongClassName}>
            {conEnlaces(part, String(i))}
          </strong>
        ) : (
          <span key={i}>{conEnlaces(part, String(i))}</span>
        ),
      )}
    </>
  )
}

export default RichText
