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
            {part}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  )
}

export default RichText
