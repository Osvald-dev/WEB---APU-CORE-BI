import { useCallback, useEffect, useRef, useState } from 'react'
import type { KeyboardEvent, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import {
  contenido,
  PRECIO_DIAGNOSTICO,
  URL_APPS_SCRIPT,
  URL_CALENDARIO,
  URL_FORMULARIO,
  URL_PAGO,
  WHATSAPP_CONTACTO,
} from '../data/contenido'
import logoApu from '../assets/logoapu.png'

const { formulario } = contenido
const { preguntas, contacto } = formulario

type Respuestas = {
  anios_ejercicio: string
  abogados: string
  apoyo: string
  fueros: string[]
  fueros_otros: string
  consultas_mes: string
  canales: string[]
  quien_contesta: string
  donde_anota: string
  costo_cliente: string
  un_anio: string
  nombre: string
  estudio: string
  email: string
  whatsapp: string
}

type ClaveContacto = (typeof contacto.campos)[number]['clave']

const VACIAS: Respuestas = {
  anios_ejercicio: '',
  abogados: '',
  apoyo: '',
  fueros: [],
  fueros_otros: '',
  consultas_mes: '',
  canales: [],
  quien_contesta: '',
  donde_anota: '',
  costo_cliente: '',
  un_anio: '',
  nombre: '',
  estudio: '',
  email: '',
  whatsapp: '',
}

// Pasos: 0 inicio, 1..8 preguntas, 9 contacto, 10 confirmación.
const TOTAL_PREGUNTAS = preguntas.length
const PASO_CONTACTO = TOTAL_PREGUNTAS + 1
const PASO_CONFIRMACION = TOTAL_PREGUNTAS + 2

const HASH = URL_FORMULARIO
const STORAGE_KEY = 'apu-diagnostico'
const TIMEOUT_MS = 20000

// Paso donde vive cada clave, para volver ahí si el servidor la rechaza.
const PASO_POR_CLAVE: Record<string, number> = {}
preguntas.forEach((pregunta, i) => {
  if (pregunta.tipo === 'numeros') pregunta.campos.forEach((c) => (PASO_POR_CLAVE[c.clave] = i + 1))
  else PASO_POR_CLAVE[pregunta.clave] = i + 1
  if (pregunta.tipo === 'multiple' && 'otros' in pregunta) PASO_POR_CLAVE[pregunta.otros.clave] = i + 1
})
contacto.campos.forEach((c) => (PASO_POR_CLAVE[c.clave] = PASO_CONTACTO))

const esPendiente = (url: string) => !url || url.startsWith('[')

const completar = (texto: string, valores: Record<string, string | number>) =>
  texto.replace(/\{(\w+)\}/g, (_, k: string) => String(valores[k] ?? ''))

function errorNumero(valor: string, min: number, max: number) {
  if (valor === '') return ''
  const n = Number(valor)
  return n >= min && n <= max ? '' : completar(formulario.errorRango, { min, max })
}

function errorContacto(clave: ClaveContacto, valor: string) {
  const v = valor.trim()
  if (!v) return contacto.errorRequerido
  if (clave === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return contacto.errorEmail
  if (clave === 'whatsapp' && v.replace(/\D/g, '').length < 8) return contacto.errorWhatsapp
  return ''
}

function pasoValido(paso: number, r: Respuestas) {
  if (paso === PASO_CONTACTO) return contacto.campos.every((c) => !errorContacto(c.clave, r[c.clave]))
  const pregunta = preguntas[paso - 1]
  if (!pregunta) return true
  switch (pregunta.tipo) {
    case 'numeros':
      return pregunta.campos.every((c) => r[c.clave] !== '' && !errorNumero(r[c.clave], c.min, c.max))
    case 'multiple':
      return r[pregunta.clave].length > 0
    case 'unica':
    case 'texto':
      return r[pregunta.clave].trim() !== ''
  }
}

function calcularOrigen() {
  try {
    const params = new URLSearchParams(window.location.search)
    const utm = ['utm_source', 'utm_medium', 'utm_campaign']
      .map((k) => params.get(k)?.trim())
      .filter(Boolean)
    if (utm.length) return utm.join(' / ')
    if (document.referrer) return new URL(document.referrer).hostname
  } catch {
    // Si la URL o el referrer no se pueden leer, cuenta como directo.
  }
  return 'directo'
}

type Guardado = { paso: number; respuestas: Respuestas; inicio: number | null }

function leerGuardado(): Guardado | null {
  try {
    const crudo = sessionStorage.getItem(STORAGE_KEY)
    if (!crudo) return null
    const datos = JSON.parse(crudo) as Partial<Guardado>
    const paso = typeof datos.paso === 'number' && datos.paso >= 0 && datos.paso <= PASO_CONTACTO ? datos.paso : 0
    return {
      paso,
      respuestas: { ...VACIAS, ...datos.respuestas },
      inicio: typeof datos.inicio === 'number' ? datos.inicio : null,
    }
  } catch {
    return null
  }
}

function escribirGuardado(datos: Guardado | null) {
  try {
    if (datos) sessionStorage.setItem(STORAGE_KEY, JSON.stringify(datos))
    else sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // Sin sessionStorage el formulario funciona igual, sólo no sobrevive a un refresh.
  }
}

const BOTON_PRIMARIO =
  'inline-flex min-h-11 items-center justify-center border border-ink bg-ink px-5 py-3 font-sans text-sm text-paper transition-colors hover:bg-transparent hover:text-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-ink disabled:hover:text-paper'
const BOTON_SECUNDARIO =
  'inline-flex min-h-11 items-center justify-center border border-ink bg-transparent px-5 py-3 font-sans text-sm text-ink transition-colors hover:bg-ink hover:text-paper'
const INPUT =
  'min-h-11 w-full border border-line bg-card px-4 py-3 font-sans text-base text-ink focus:border-bronze focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bronze aria-[invalid=true]:border-error'
const TITULO = 'font-serif-display text-[clamp(1.6rem,4.5vw,2.4rem)] leading-[1.15] text-ink focus:outline-none'
const ERROR = 'font-sans text-sm text-error empty:hidden'

function Opcion({
  tipo,
  name,
  valor,
  marcada,
  onChange,
}: {
  tipo: 'radio' | 'checkbox'
  name: string
  valor: string
  marcada: boolean
  onChange: () => void
}) {
  return (
    <label
      className={`flex min-h-11 cursor-pointer items-center gap-3 border bg-card px-4 py-3 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-bronze ${
        marcada ? 'border-bronze outline outline-1 outline-bronze' : 'border-line hover:border-slate'
      }`}
    >
      <input
        type={tipo}
        name={name}
        value={valor}
        checked={marcada}
        onChange={onChange}
        className="h-5 w-5 flex-none accent-[var(--bronze)]"
      />
      <span className="font-sans text-base text-ink">{valor}</span>
    </label>
  )
}

function FormularioDiagnostico() {
  const [guardado] = useState(leerGuardado)
  const [abierto, setAbierto] = useState(() => window.location.hash === HASH)
  const [paso, setPaso] = useState(guardado?.paso ?? 0)
  const [respuestas, setRespuestas] = useState<Respuestas>(guardado?.respuestas ?? VACIAS)
  const [inicio, setInicio] = useState<number | null>(guardado?.inicio ?? null)
  const [origen] = useState(calcularOrigen)
  const [sitioWeb, setSitioWeb] = useState('')
  const [tocados, setTocados] = useState<Partial<Record<ClaveContacto, boolean>>>({})
  const [enviando, setEnviando] = useState(false)
  const [errorEnvio, setErrorEnvio] = useState(false)
  const [camposServidor, setCamposServidor] = useState<string[]>([])
  const [nombreConfirmado, setNombreConfirmado] = useState('')
  const [confirmandoCierre, setConfirmandoCierre] = useState(false)

  const tituloRef = useRef<HTMLHeadingElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const seguirRef = useRef<HTMLButtonElement>(null)
  const focoPrevio = useRef<HTMLElement | null>(null)

  const tieneRespuestas = Object.values(respuestas).some((v) => v.length > 0)

  // Apertura por hash: el link #diagnostico se puede compartir directo.
  useEffect(() => {
    const sincronizar = () => setAbierto(window.location.hash === HASH)
    window.addEventListener('hashchange', sincronizar)
    return () => window.removeEventListener('hashchange', sincronizar)
  }, [])

  // Mientras está abierto: sin scroll de fondo y la página queda inerte.
  useEffect(() => {
    if (!abierto) return
    focoPrevio.current = document.activeElement as HTMLElement | null
    const root = document.getElementById('root')
    const overflowPrevio = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    root?.setAttribute('inert', '')
    return () => {
      document.body.style.overflow = overflowPrevio
      root?.removeAttribute('inert')
      focoPrevio.current?.focus?.()
    }
  }, [abierto])

  useEffect(() => {
    if (paso === PASO_CONFIRMACION) return
    escribirGuardado(paso > 0 || tieneRespuestas ? { paso, respuestas, inicio } : null)
  }, [paso, respuestas, inicio, tieneRespuestas])

  // Al cambiar de pantalla, arriba de todo y con el foco en el título.
  useEffect(() => {
    if (!abierto) return
    scrollRef.current?.scrollTo(0, 0)
    tituloRef.current?.focus()
  }, [paso, abierto])

  useEffect(() => {
    if (confirmandoCierre) seguirRef.current?.focus()
  }, [confirmandoCierre])

  const cerrar = useCallback(() => {
    setConfirmandoCierre(false)
    history.replaceState(null, '', window.location.pathname + window.location.search)
    setAbierto(false)
  }, [])

  const descartarYCerrar = useCallback(() => {
    setRespuestas(VACIAS)
    setPaso(0)
    setInicio(null)
    setTocados({})
    setErrorEnvio(false)
    setCamposServidor([])
    escribirGuardado(null)
    cerrar()
  }, [cerrar])

  const pedirCierre = useCallback(() => {
    if (paso === PASO_CONFIRMACION) {
      setPaso(0)
      cerrar()
    } else if (tieneRespuestas) {
      setConfirmandoCierre(true)
    } else {
      cerrar()
    }
  }, [paso, tieneRespuestas, cerrar])

  useEffect(() => {
    if (!abierto) return
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key !== 'Escape') return
      e.preventDefault()
      if (confirmandoCierre) setConfirmandoCierre(false)
      else if (!enviando) pedirCierre()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [abierto, confirmandoCierre, enviando, pedirCierre])

  const setCampo = <K extends keyof Respuestas>(clave: K, valor: Respuestas[K]) => {
    setRespuestas((r) => ({ ...r, [clave]: valor }))
    setCamposServidor((c) => c.filter((x) => x !== clave))
  }

  const alternar = (clave: 'fueros' | 'canales', opcion: string) => {
    const actual = respuestas[clave]
    setCampo(clave, actual.includes(opcion) ? actual.filter((o) => o !== opcion) : [...actual, opcion])
  }

  const empezar = () => {
    if (inicio === null) setInicio(Date.now())
    setPaso(1)
  }

  const valido = pasoValido(paso, respuestas)

  const enviar = async () => {
    if (enviando || !pasoValido(PASO_CONTACTO, respuestas)) return
    setEnviando(true)
    setErrorEnvio(false)

    const r = respuestas
    const datos = {
      anios_ejercicio: Number(r.anios_ejercicio),
      abogados: Number(r.abogados),
      apoyo: Number(r.apoyo),
      fueros: r.fueros,
      fueros_otros: r.fueros.includes('Otros') ? r.fueros_otros.trim() : '',
      consultas_mes: r.consultas_mes,
      canales: r.canales,
      quien_contesta: r.quien_contesta,
      donde_anota: r.donde_anota,
      costo_cliente: r.costo_cliente,
      un_anio: r.un_anio.trim(),
      nombre: r.nombre.trim(),
      estudio: r.estudio.trim(),
      email: r.email.trim(),
      whatsapp: r.whatsapp.trim(),
      origen,
      tiempo_segundos: inicio === null ? 0 : Math.round((Date.now() - inicio) / 1000),
      sitio_web: sitioWeb,
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS)
    try {
      // text/plain a propósito: evita el preflight de CORS contra Apps Script.
      const res = await fetch(URL_APPS_SCRIPT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(datos),
        signal: controller.signal,
      })
      const json = (await res.json()) as { ok?: boolean; error?: string; campos?: string[] }
      if (!json.ok) {
        const campos = Array.isArray(json.campos) ? json.campos : []
        setErrorEnvio(true)
        setCamposServidor(campos)
        const pasos = campos.map((c) => PASO_POR_CLAVE[c]).filter((p): p is number => p !== undefined)
        if (pasos.length) setPaso(Math.min(...pasos))
        return
      }
      setNombreConfirmado(datos.nombre)
      setRespuestas(VACIAS)
      setInicio(null)
      setTocados({})
      setCamposServidor([])
      escribirGuardado(null)
      setPaso(PASO_CONFIRMACION)
    } catch {
      setErrorEnvio(true)
    } finally {
      clearTimeout(timer)
      setEnviando(false)
    }
  }

  const avanzar = () => {
    if (!valido) return
    if (paso === PASO_CONTACTO) void enviar()
    else setPaso((p) => p + 1)
  }

  // Enter avanza; en la pregunta de tres números pasa al campo siguiente.
  const manejarEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Enter') return
    const destino = e.target as HTMLElement
    if (['TEXTAREA', 'BUTTON', 'A'].includes(destino.tagName)) return
    e.preventDefault()
    const numeros = Array.from(e.currentTarget.querySelectorAll<HTMLInputElement>('input[data-numero]'))
    const i = numeros.indexOf(destino as HTMLInputElement)
    if (i >= 0 && i < numeros.length - 1) {
      numeros[i + 1].focus()
      return
    }
    avanzar()
  }

  if (!abierto) return null

  const avisoServidor = (claves: string[]) =>
    errorEnvio && claves.some((c) => camposServidor.includes(c)) ? formulario.errorServidor : ''

  const tituloPregunta = (id: string, texto: string) => (
    <h2 id={id} ref={tituloRef} tabIndex={-1} className={TITULO}>
      {texto}
    </h2>
  )

  let pantalla: ReactNode
  if (paso === 0) {
    pantalla = (
      <div>
        <div className="flex items-center gap-3">
          <span className="h-px w-[26px] bg-bronze" />
          <span className="font-mono text-xs text-slate">{formulario.etiqueta}</span>
        </div>
        <h2 ref={tituloRef} tabIndex={-1} className={`mt-3 ${TITULO}`}>
          {formulario.inicio.titulo}
        </h2>
        <p className="mt-6 max-w-[52ch] font-sans text-[1.1rem] text-slate">{formulario.inicio.texto}</p>
        <button type="button" onClick={empezar} className={`mt-8 ${BOTON_PRIMARIO}`}>
          {formulario.inicio.boton}
        </button>
      </div>
    )
  } else if (paso <= TOTAL_PREGUNTAS) {
    const pregunta = preguntas[paso - 1]
    const idTitulo = `diag-titulo-${paso}`
    let cuerpo: ReactNode

    if (pregunta.tipo === 'numeros') {
      cuerpo = (
        <div className="flex flex-col gap-5">
          {pregunta.campos.map((campo) => {
            const error = errorNumero(respuestas[campo.clave], campo.min, campo.max) || avisoServidor([campo.clave])
            return (
              <div key={campo.clave}>
                <label htmlFor={`diag-${campo.clave}`} className="block font-sans text-[0.97rem] text-ink">
                  {campo.label}
                </label>
                {'ayuda' in campo && (
                  <p id={`diag-${campo.clave}-ayuda`} className="mt-1 font-sans text-sm text-slate">
                    {campo.ayuda}
                  </p>
                )}
                <input
                  id={`diag-${campo.clave}`}
                  data-numero
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  autoComplete="off"
                  value={respuestas[campo.clave]}
                  onChange={(e) => setCampo(campo.clave, e.target.value.replace(/\D/g, '').slice(0, 3))}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={`${'ayuda' in campo ? `diag-${campo.clave}-ayuda ` : ''}diag-${campo.clave}-error`}
                  className={`mt-2 max-w-[10rem] ${INPUT}`}
                />
                <p id={`diag-${campo.clave}-error`} aria-live="polite" className={`mt-2 ${ERROR}`}>
                  {error}
                </p>
              </div>
            )
          })}
        </div>
      )
    } else if (pregunta.tipo === 'multiple' || pregunta.tipo === 'unica') {
      const clave = pregunta.clave
      const otros = pregunta.tipo === 'multiple' && 'otros' in pregunta ? pregunta.otros : null
      cuerpo = (
        <>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {pregunta.opciones.map((opcion) =>
              pregunta.tipo === 'multiple' ? (
                <Opcion
                  key={opcion}
                  tipo="checkbox"
                  name={clave}
                  valor={opcion}
                  marcada={respuestas[pregunta.clave].includes(opcion)}
                  onChange={() => alternar(pregunta.clave, opcion)}
                />
              ) : (
                <Opcion
                  key={opcion}
                  tipo="radio"
                  name={clave}
                  valor={opcion}
                  marcada={respuestas[pregunta.clave] === opcion}
                  onChange={() => setCampo(pregunta.clave, opcion)}
                />
              ),
            )}
          </div>
          {otros && respuestas.fueros.includes(otros.opcion) && (
            <div className="mt-5">
              <label htmlFor={`diag-${otros.clave}`} className="block font-sans text-[0.97rem] text-ink">
                {otros.label}
              </label>
              <input
                id={`diag-${otros.clave}`}
                type="text"
                value={respuestas[otros.clave]}
                onChange={(e) => setCampo(otros.clave, e.target.value)}
                className={`mt-2 ${INPUT}`}
              />
            </div>
          )}
          <p aria-live="polite" className={`mt-4 ${ERROR}`}>
            {avisoServidor(otros ? [clave, otros.clave] : [clave])}
          </p>
        </>
      )
    } else {
      cuerpo = (
        <>
          <textarea
            id={`diag-${pregunta.clave}`}
            rows={4}
            value={respuestas[pregunta.clave]}
            onChange={(e) => setCampo(pregunta.clave, e.target.value)}
            aria-labelledby={idTitulo}
            aria-describedby={`diag-${pregunta.clave}-error`}
            className={`block resize-y ${INPUT}`}
          />
          <p id={`diag-${pregunta.clave}-error`} aria-live="polite" className={`mt-2 ${ERROR}`}>
            {avisoServidor([pregunta.clave])}
          </p>
        </>
      )
    }

    pantalla = (
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="w-full p-0">
          <span className="mb-3 block font-mono text-xs text-bronze">
            {completar(formulario.indicador, { n: paso, total: TOTAL_PREGUNTAS })}
          </span>
          {tituloPregunta(idTitulo, pregunta.titulo)}
        </legend>
        <div className="mt-8">{cuerpo}</div>
      </fieldset>
    )
  } else if (paso === PASO_CONTACTO) {
    pantalla = (
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="w-full p-0">{tituloPregunta('diag-titulo-contacto', contacto.titulo)}</legend>
        <div className="mt-8 flex flex-col gap-5">
          {contacto.campos.map((campo) => {
            const valor = respuestas[campo.clave]
            const error = (tocados[campo.clave] ? errorContacto(campo.clave, valor) : '') || avisoServidor([campo.clave])
            return (
              <div key={campo.clave}>
                <label htmlFor={`diag-${campo.clave}`} className="block font-sans text-[0.97rem] text-ink">
                  {campo.label}
                </label>
                <input
                  id={`diag-${campo.clave}`}
                  name={campo.clave}
                  type={campo.type}
                  inputMode={campo.inputMode}
                  autoComplete={campo.autoComplete}
                  required
                  value={valor}
                  onChange={(e) => setCampo(campo.clave, e.target.value)}
                  onBlur={() => setTocados((t) => ({ ...t, [campo.clave]: true }))}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={`diag-${campo.clave}-error`}
                  className={`mt-2 ${INPUT}`}
                />
                <p id={`diag-${campo.clave}-error`} aria-live="polite" className={`mt-2 ${ERROR}`}>
                  {error}
                </p>
              </div>
            )
          })}

          {/* Honeypot: invisible para personas, lo completan los bots. */}
          <div className="sr-only" aria-hidden="true">
            <label htmlFor="diag-sitio_web">{contacto.honeypotLabel}</label>
            <input
              id="diag-sitio_web"
              name="sitio_web"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              value={sitioWeb}
              onChange={(e) => setSitioWeb(e.target.value)}
            />
          </div>
        </div>

        <div role="alert" className="mt-6 empty:hidden">
          {errorEnvio && (
            <div className="border-l-2 border-error pl-4">
              <p className="font-sans text-ink">{contacto.errorEnvio}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <button type="button" onClick={() => void enviar()} disabled={enviando} className={BOTON_SECUNDARIO}>
                  {contacto.reintentar}
                </button>
                {!esPendiente(WHATSAPP_CONTACTO) && (
                  <a
                    href={WHATSAPP_CONTACTO}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center font-sans text-sm text-bronze underline underline-offset-4"
                  >
                    {contacto.whatsapp}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </fieldset>
    )
  } else {
    const { confirmacion } = formulario
    const pasos: ReactNode[] = []
    const pendientes = [URL_CALENDARIO, URL_PAGO].filter(esPendiente).length
    const linkPaso = (texto: string, href: string, boton: string) => (
      <>
        <p className="font-sans text-base font-semibold text-ink">{texto}</p>
        <a href={href} target="_blank" rel="noopener noreferrer" className={`mt-4 ${BOTON_PRIMARIO}`}>
          {boton}
        </a>
      </>
    )
    const pendiente = <p className="font-sans text-base text-ink">{confirmacion.pendiente}</p>

    if (!esPendiente(URL_CALENDARIO)) {
      pasos.push(linkPaso(confirmacion.calendario.texto, URL_CALENDARIO, confirmacion.calendario.boton))
    }
    // Si faltan los dos links, el aviso de WhatsApp aparece una sola vez.
    if (pendientes > 0) pasos.push(pendiente)
    if (!esPendiente(URL_PAGO)) {
      pasos.push(
        linkPaso(completar(confirmacion.pago.texto, { precio: PRECIO_DIAGNOSTICO }), URL_PAGO, confirmacion.pago.boton),
      )
    }

    pantalla = (
      <div>
        <h2 ref={tituloRef} tabIndex={-1} className={TITULO}>
          {completar(confirmacion.titulo, { nombre: nombreConfirmado })}
        </h2>
        <ol className="mt-10 grid grid-cols-1 gap-px bg-line">
          {pasos.map((contenidoPaso, i) => (
            <li key={i} className="flex flex-col items-start bg-card px-6 py-7">
              <span className="mb-3 font-mono text-xs text-bronze">{i + 1}</span>
              {contenidoPaso}
            </li>
          ))}
        </ol>
        <button type="button" onClick={pedirCierre} className={`mt-10 ${BOTON_SECUNDARIO}`}>
          {confirmacion.volver}
        </button>
      </div>
    )
  }

  const enPregunta = paso >= 1 && paso <= PASO_CONTACTO
  const progreso = paso === PASO_CONTACTO ? 100 : (Math.min(paso, TOTAL_PREGUNTAS) / TOTAL_PREGUNTAS) * 100

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={formulario.etiqueta}
      className="fixed inset-x-0 top-0 z-[60] flex h-dvh flex-col bg-paper text-ink"
    >
      <div inert={confirmandoCierre} className="flex min-h-0 flex-1 flex-col">
        <header className="flex-none border-b border-line-soft">
          <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-6">
            <img src={logoApu} alt={contenido.nav.marca} className="h-16 w-auto" />
            <button
              type="button"
              onClick={pedirCierre}
              aria-label={formulario.cerrar}
              className="-mr-2.5 inline-flex h-11 w-11 items-center justify-center text-ink transition-colors hover:text-bronze"
            >
              <X size={22} strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
          <div aria-hidden="true" className={`h-[3px] bg-line-soft ${enPregunta ? '' : 'invisible'}`}>
            <div className="h-full bg-bronze transition-[width] duration-300" style={{ width: `${progreso}%` }} />
          </div>
        </header>

        <div ref={scrollRef} className="min-h-0 flex-1 overflow-y-auto" onKeyDown={manejarEnter}>
          <div className="mx-auto w-full max-w-2xl px-6 py-10 sm:py-16">{pantalla}</div>
        </div>

        {enPregunta && (
          <div className="flex-none border-t border-line bg-paper px-6 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setPaso((p) => p - 1)}
                disabled={enviando}
                className={BOTON_SECUNDARIO}
              >
                {formulario.anterior}
              </button>
              <button
                type="button"
                onClick={avanzar}
                disabled={!valido || enviando}
                className={`flex-1 sm:flex-none ${BOTON_PRIMARIO}`}
              >
                {paso === PASO_CONTACTO ? (enviando ? contacto.enviando : contacto.enviar) : formulario.siguiente}
              </button>
            </div>
          </div>
        )}
      </div>

      {confirmandoCierre && (
        <div className="absolute inset-0 flex items-end justify-center bg-black/50 p-4 sm:items-center">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="diag-cierre-titulo"
            aria-describedby="diag-cierre-texto"
            className="w-full max-w-md border border-line bg-card p-6"
          >
            <h2 id="diag-cierre-titulo" className="font-serif-display text-2xl text-ink">
              {formulario.confirmarCierre.titulo}
            </h2>
            <p id="diag-cierre-texto" className="mt-2 font-sans text-slate">
              {formulario.confirmarCierre.texto}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button
                ref={seguirRef}
                type="button"
                onClick={() => setConfirmandoCierre(false)}
                className={BOTON_PRIMARIO}
              >
                {formulario.confirmarCierre.seguir}
              </button>
              <button type="button" onClick={descartarYCerrar} className={BOTON_SECUNDARIO}>
                {formulario.confirmarCierre.cerrar}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>,
    document.body,
  )
}

export default FormularioDiagnostico
