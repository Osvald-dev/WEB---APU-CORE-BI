// Todas las capturas del CRM que usa la web, en un solo lugar.
//
// Cada captura tiene una versión de escritorio (horizontal, ≥ 640 px) y, si
// existe, una de celular (vertical, sacada desde la vista móvil del CRM). Los
// componentes las sirven con un único <picture>, así el navegador descarga solo
// la que corresponde.
//
// ── Pasar a modo oscuro (ajuste 4 de NOTAS-WEB-SAC.md) ──────────────────────
// Hoy son todas del tema claro y desentonan con la web, que es oscura.
//   1. En el CRM: menú lateral → «Pasar a oscuro». Usar la vitrina, con datos
//      de ejemplo.
//   2. Sacar cada pantalla de la lista de abajo, en escritorio y en celular.
//   3. Exportarlas como .webp (ancho 1600 en escritorio, 780 en celular) y
//      guardarlas en src/assets/img/ con el MISMO nombre de archivo, pisando
//      las claras.
//   4. Actualizar acá `ancho` y `alto` si cambiaron: reservan el espacio
//      antes de que cargue la imagen y evitan que la página salte.
// No hace falta tocar ningún componente. Las capturas claras siguen sirviendo
// para el reel 4, que es de estilo claro a propósito: viven en
// C:\OSVALDO\reel4\public\imagenes y no se tocan.
//
// Faltan las versiones de celular de la ronda, plazos, inicio y mails: mientras
// no existan, el celular muestra la de escritorio. La única vertical que hay
// (08-sac-celular) muestra lo que corre plazo pero no la ronda del día, así que
// va solo en el hero.

import rondaEscritorio from '../assets/img/sac-ronda.webp'
import heroMovil from '../assets/img/sac-hero-movil.webp'
import plazosEscritorio from '../assets/img/sac-plazos.webp'
import inicioEscritorio from '../assets/img/sac-inicio.webp'
import mailsEscritorio from '../assets/img/sac-mails.webp'

export type Archivo = { src: string; ancho: number; alto: number }
export type Captura = { escritorio: Archivo; movil?: Archivo }

export const capturas = {
  // Pantalla del SAC en el hero. En celular, la vista móvil: lo que corre plazo.
  hero: {
    escritorio: { src: rondaEscritorio, ancho: 1600, alto: 790 },
    movil: { src: heroMovil, ancho: 780, alto: 1688 },
  },
  // La misma pantalla en 4.2 (01), donde tiene que verse la ronda del día.
  // Falta la vertical: una vista móvil con la ronda y sus botones.
  ronda: {
    escritorio: { src: rondaEscritorio, ancho: 1600, alto: 790 },
  },
  // Tareas con los plazos del juzgado primero. 4.2 (02).
  plazos: {
    escritorio: { src: plazosEscritorio, ancho: 1600, alto: 1000 },
  },
  // Inicio con los plazos arriba de todo. 4.2 (03).
  inicio: {
    escritorio: { src: inicioEscritorio, ancho: 1600, alto: 1319 },
  },
  // Los dos mails del día, uno al lado del otro. 4.3.
  mails: {
    escritorio: { src: mailsEscritorio, ancho: 1600, alto: 875 },
  },
} satisfies Record<string, Captura>
