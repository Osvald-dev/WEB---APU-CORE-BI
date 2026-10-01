import fotoAndres from "../assets/img/andres.webp"
import fotoOsvaldo from "../assets/img/osvaldo.webp"
import fotoRomina from "../assets/img/romina.webp"
import fotoRocio from "../assets/img/rocio.webp"

// Formulario previo al diagnóstico. Todos los CTA de la web apuntan acá:
// el hash abre FormularioDiagnostico.tsx en pantalla completa.
export const URL_FORMULARIO = "#diagnostico"

// Apps Script que recibe las respuestas y las guarda en la planilla.
export const URL_APPS_SCRIPT =
  "https://script.google.com/macros/s/AKfycbxq8Jk_f4eYBJkilDjjFbOM8DfzGjh5bt8BjmwBYT8LsY3X8HQ2QviTeLEO473MbSrrqw/exec"

// Las URL entre corchetes se consideran pendientes: la confirmación del
// formulario las reemplaza por el aviso de que coordinamos por WhatsApp.
// TODO: reemplazar por el link real del calendario.
export const URL_CALENDARIO = "[URL]"
// TODO: reemplazar por el link real de pago.
export const URL_PAGO = "[URL]"
// TODO: reemplazar por el link real (https://wa.me/549...).
export const WHATSAPP_CONTACTO = "[URL wa.me]"
// TODO: confirmar el monto antes de publicar.
export const PRECIO_DIAGNOSTICO = "$80.000"

export const contenido = {
  nav: {
    marca: "APU Core BI",
    links: [
      { label: "El problema", href: "#problema" },
      { label: "El sistema", href: "#sistema" },
      { label: "Planes", href: "#planes" },
      { label: "Quiénes somos", href: "#equipo" },
    ],
    ctaLabel: "Agendar diagnóstico",
    ctaHref: URL_FORMULARIO,
  },
  hero: {
    titulo: "Estudiaste años para ejercer el derecho. Terminaste administrando una pyme entera.",
    lede: "Secretaría, agenda, cobranzas, publicidad, atención al cliente, números. Todo eso lo llevás vos, entre audiencia y audiencia. **Ordenamos esas áreas una por una para que el estudio crezca sin que vos sumes horas.**",
    publico: "Para abogados que trabajan solos y estudios de hasta cinco personas.",
    ctaPrimario: { label: "Agendar diagnóstico", href: URL_FORMULARIO },
    ctaSecundario: { label: "Ver cómo trabajamos", href: "#sistema" },
    // La palabra rotativa "hoy sos..." se maneja como componente aparte
    // (HeroRotativo.tsx), no como parte del texto
  },
  heroRotativo: {
    prefijo: "Hoy sos",
    palabras: [
      "Secretaría",
      "Agenda",
      "Cobranza",
      "Atención al cliente",
      "Creador de contenido",
      "Capacitador",
      "Administrador",
      "Dirección y números",
    ],
    cierre: "Ocho responsabilidades, una sola persona.",
  },
  problema: {
    id: "problema",
    eyebrow: "El problema",
    titulo: "El estudio no deja de crecer por falta de trabajo",
    parrafos: [
      "Deja de crecer porque **cada área funciona de memoria**. La consulta que entró el martes quedó en un chat sin responder. El seguimiento de un cliente vive en la cabeza de alguien. **Nadie sabe cuánto costó conseguir el último caso, ni qué fuero deja plata y cuál sólo deja horas.**",
      "Un estudio que factura bien y opera a mano tiene un techo bajo: crece hasta donde llega tu aguante. **Nuestro trabajo es correr ese techo poniendo cada área en su lugar**, con un procedimiento que se puede delegar, medir y revisar.",
    ],
    areas: [
      { titulo: "Captación", texto: "De dónde vienen las consultas y a qué costo." },
      { titulo: "Respuesta", texto: "Quién contesta, en cuánto tiempo y con qué criterio." },
      { titulo: "Gestión de casos", texto: "Dónde vive cada expediente, cada plazo y cada tarea." },
      { titulo: "Equipo", texto: "Qué hace cada persona y qué se le puede delegar." },
      { titulo: "Cobranzas", texto: "Planes de pago, vencimientos, quién debe qué." },
      { titulo: "Números", texto: "Costo por consulta, costo por cliente, rentabilidad por fuero." },
    ],
    estrategia: {
      titulo: "Primero la estrategia, después el marketing",
      texto: "Una agencia arranca en marketing. Nosotros arrancamos en estrategia: antes de gastar un peso decidimos a quién conviene buscar, según qué fuero deja más por hora trabajada y qué cliente puede pagar. Después salimos a buscar exactamente a ese cliente.",
      contraste: [
        "Treinta clientes nuevos de un fuero que no paga: más audiencias, más fricción, cobranzas que no cierran. El estudio factura menos y trabaja el doble.",
        "Diez clientes que encajan con lo que el estudio sabe hacer, que pueden pagar y que dejan margen. Menos volumen, más rentabilidad y un estudio que sigue siendo vivible.",
      ],
    },
  },
  sistema: {
    id: "sistema",
    eyebrow: "El sistema",
    titulo: "El circuito completo, de la primera consulta al número final",
    lede: "Cinco etapas encadenadas. Podés contratarlas por tramos o completas, pero funcionan porque se alimentan entre sí: lo que aprendemos al final del circuito corrige lo que hacemos al principio.",
    etapas: [
      {
        numero: "01",
        titulo: "Estrategia",
        texto: "Antes de gastar un peso en publicidad definimos a quién le hablás y qué tipo de caso conviene buscar, y fijamos por escrito un objetivo de cuántas consultas esperamos y de qué fueros. **Analizamos tus fueros por rentabilidad real, no por volumen**: cuánto tiempo consume cada uno, cuánto deja y si el que paga tiene con qué pagar.",
        tags: ["Análisis de cartera", "Definición de público", "Propuesta de valor", "Objetivo mensual"],
      },
      {
        numero: "02",
        titulo: "Captación",
        texto: "Producimos el contenido y lo ponemos a trabajar. Guion, grabación, edición, publicación y campañas pagas en Meta con seguimiento de conversiones, segmentadas al cliente que definimos en la etapa 01. **Sin promesas de viralidad: campañas medidas, con reglas claras de qué se escala y qué se corta.**",
        tags: ["Guion y grabación", "Edición", "Meta Ads", "Seguimiento de conversiones"],
      },
      {
        numero: "03",
        titulo: "Recepción",
        texto: "**La mayoría de las consultas se pierden acá, no en la publicidad.** Ordenamos la mensajería en un solo lugar y clasificamos cada consulta que entra: de qué se trata, si es un caso viable y qué urgencia tiene. Tu secretaria trabaja sobre una lista ordenada, no sobre un chat desbordado. Capacitamos a quien atiende y medimos cuántas consultas entran contra cuántas se convierten en clientes.",
        tags: [
          "WhatsApp centralizado",
          "Clasificación de consultas",
          "Capacitación de quien atiende",
          "Consultas recibidas vs. captadas",
        ],
      },
      {
        numero: "04",
        titulo: "Gestión",
        texto: "Un sistema propio donde viven clientes, casos, citas, seguimientos y tareas del equipo. Se abre con un link y el mail de cada persona, con los permisos que corresponden. **Incluye la carga de novedades del portal judicial y el reparto diario de tareas entre abogados y secretaría.**",
        tags: ["Clientes y casos", "Citas y seguimientos", "Tareas por persona", "Planes de pago"],
      },
      {
        numero: "05",
        titulo: "Control",
        texto: "Al cierre de cada mes, un informe con los números que importan: cuánto costó cada consulta, cuánto cada cliente nuevo, qué fuero rindió, qué campaña conviene sostener y cuál cortar. **Ese informe vuelve a la etapa 01 y ajusta la estrategia del mes siguiente.**",
        tags: ["Costo por consulta", "Costo por cliente", "Rendimiento por fuero", "Informe mensual"],
      },
    ],
    embudo: {
      titulo: "Los cuatro lugares donde se rompe un embudo",
      puntos: [
        {
          sintoma: "Nadie vio el aviso",
          diagnostico: "Problema de pauta o de segmentación.",
          texto: "Se ajusta el presupuesto o el público.",
        },
        {
          sintoma: "Vieron pero no escribieron",
          diagnostico: "Problema de mensaje.",
          texto: "El aviso no le habla a nadie en particular.",
        },
        {
          sintoma: "Escribieron pero no les contestaron a tiempo",
          diagnostico: "Problema de recepción.",
          texto: "Se ordena la mensajería y se capacita a quien atiende.",
        },
        {
          sintoma: "Contestaron pero no firmaron",
          diagnostico: "Problema de estrategia.",
          texto: "Se está atrayendo al cliente equivocado y el circuito vuelve a la etapa 01.",
        },
      ],
      cierre: "Medir sirve para saber cuál de los cuatro está roto este mes. **Cada uno se arregla distinto, y confundirlos cuesta meses.**",
    },
  },
  comoTrabajamos: {
    id: "como-trabajamos",
    eyebrow: "Cómo trabajamos, y qué no vas a encontrar acá",
    titulo: "Todo lo que ofrecemos lo construimos primero para un estudio jurídico propio, y lo seguimos operando todos los días",
    lede: "No es un método aprendido en un curso: es la forma en que trabajamos nosotros.",
    hacemos: [
      "**Te mostramos el sistema funcionando antes de que contrates nada.**",
      "Dejamos **por escrito el alcance, los plazos y quién hace cada cosa**.",
      "Medimos **con números de tu negocio: consultas, casos, costos, cobranza**.",
      "Capacitamos a tu equipo para que **el sistema no dependa de nosotros**.",
      "Revisamos los números con vos **una vez por mes, con el informe en la mano**.",
      "Cambiamos **una sola cosa por mes, decidida con vos**, para saber qué funcionó.",
    ],
    noHacemos: [
      "Prometer **una cantidad de clientes que nadie puede garantizar**.",
      "Vender \"presencia digital\" **sin explicar qué hace cada pieza**.",
      "Reportar alcance y seguidores **como si fueran resultados**.",
      "Dejarte un informe de recomendaciones **y desaparecer**.",
      "Empezar a producir contenido **sin antes definir a quién le estamos hablando**.",
    ],
  },
  casosResultados: {
    id: "casos",
    eyebrow: "Resultados",
    titulo: "Así se ve un estudio ordenado, desde adentro",
    lede: "Capturas y números reales de los estudios que ya operan con el sistema. No maquetas, no diseños de referencia: la pantalla que usan todos los días.",
    emptyState: {
      titulo: "Casos en documentación",
      texto: "Estamos armando el material audiovisual de los estudios que ya operan con el sistema. Esta sección se actualiza en las próximas semanas.",
    },
  },
  planes: {
    id: "planes",
    eyebrow: "Planes",
    titulo: "Tres formas de empezar",
    lede: "Los tres incluyen estrategia, marketing y sistema de gestión. Cada uno agrega profundidad, no más volumen de trabajo. Se puede subir de plan sin rehacer nada.",
    items: [
      {
        id: "captacion",
        nombre: "Captación",
        destacado: false,
        quien: "Para el estudio que necesita que entren consultas, y que entren las correctas.",
        features: [
          "Análisis de cartera y definición del cliente a buscar",
          "Plan de contenido, grabación y edición",
          "Campañas en Meta con seguimiento de conversiones",
          "Sistema de gestión: clientes, casos, citas, tareas y cobranza",
          "Reporte mensual de captación",
        ],
        ctaLabel: "Pedir presupuesto",
        ctaHref: URL_FORMULARIO,
      },
      {
        id: "operacion",
        nombre: "Operación",
        destacado: true,
        etiquetaDestacado: "Recomendado",
        quien: "Para el estudio que ya recibe consultas y las pierde en el camino.",
        features: [
          "Todo lo del plan Captación",
          "WhatsApp del estudio centralizado",
          "Clasificación y filtrado de cada consulta",
          "Capacitación de quien atiende",
          "Medición de consultas recibidas contra captadas",
        ],
        ctaLabel: "Pedir presupuesto",
        ctaHref: URL_FORMULARIO,
      },
      {
        id: "direccion",
        nombre: "Dirección",
        destacado: false,
        quien: "Para el estudio que quiere decidir con números si ampliarse, sumar un fuero o cambiar de rumbo.",
        features: [
          "Todo lo del plan Operación",
          "Informe mensual: costo por consulta, costo por cliente y rendimiento por fuero",
          "Comparación contra el objetivo y detección del cuello de botella del mes",
          "Ajuste de la estrategia mes a mes, decidido en una reunión con vos",
          "Rentabilidad por fuero y evaluación de crecimiento",
        ],
        ctaLabel: "Pedir presupuesto",
        ctaHref: URL_FORMULARIO,
      },
    ],
    resumen: "El primero te trae los clientes correctos. El segundo, además, se asegura de que no se te pierdan por el camino. El tercero, además, te dice mes a mes dónde está el problema y qué conviene cambiar.",
    notaGestion: "**¿Por qué el sistema de gestión va en los tres?** Porque sin registrar qué consultas terminan siendo clientes, la publicidad aprende a conseguir clics, no clientes.",
    notaPrecios: "Los tres planes se cotizan después del diagnóstico. Trabajamos con un pago de implementación por única vez, que se puede dividir en dos meses sin recargo, y un abono mensual fijo. La inversión en publicidad la pagás directo a Meta y nunca pasa por nosotros. Sin costos ocultos ni permanencia mínima.",
  },
  equipo: {
    id: "equipo",
    eyebrow: "Quiénes somos",
    titulo: "Somos dos",
    lede: "No tercerizamos: el que te atiende en la videollamada es el que después hace el trabajo.",
    personas: [
      {
        nombre: "Andrés Royón",
        foto: fotoAndres,
        descripcion: "Lic. en Administración. El sistema y el análisis de los números.",
      },
      {
        nombre: "Osvaldo Casabella",
        foto: fotoOsvaldo,
        descripcion: "Especialista en comunicaciones. Marketing, contenido y campañas en Meta.",
      },
      {
        nombre: "Dra. Romina Ayelén Ludueña",
        foto: fotoRomina,
        descripcion: "Abogada. La mirada del ejercicio, todos los días.",
      },
      {
        nombre: "Florencia Mikaela",
        foto: fotoRocio,
        descripcion: "Especialista en recepción y secretaría jurídica. Nos dice cómo filtrar.",
      },
    ],
  },
  comoEmpezamos: {
    id: "como-empezamos",
    eyebrow: "Cómo empezamos",
    titulo: "El diagnóstico tiene un costo, y se descuenta íntegro del primer mes si decidís avanzar",
    lede: "Cobramos esa primera instancia porque es trabajo real: relevamos tu operación y te entregamos un documento, avancemos o no.",
    pasos: [
      {
        numero: "Paso 1",
        titulo: "Formulario",
        texto: "**Ocho preguntas, tres minutos.** Al terminar nos comunicamos con vos para coordinar la videollamada.",
      },
      {
        numero: "Paso 2",
        titulo: "Videollamada",
        texto: "Una hora. Te devolvemos lo que vemos en tus respuestas y **te mostramos el sistema funcionando**.",
      },
      {
        numero: "Paso 3",
        titulo: "Propuesta escrita",
        texto: "En 48 horas, un solo plan recomendado con alcance, plazos y **precio cerrado. Sin letra chica.**",
      },
      {
        numero: "Paso 4",
        titulo: "Implementación y operación",
        texto: "Armamos el sistema, capacitamos al equipo y **cada mes revisamos los números juntos**.",
      },
    ],
  },
  ctaFinal: {
    cierre: "La profesión es para disfrutarla, no para vivir sobre ella. Nuestro trabajo es que el estudio rinda más sin que vos sumes horas.",
    titulo: "Contanos cómo funciona tu estudio hoy",
    nota: "Si en la videollamada concluimos que no te podemos ayudar, **te lo decimos ahí mismo y no te cobramos el diagnóstico**.",
    ctaLabel: "Agendar la videollamada",
    ctaHref: URL_FORMULARIO,
    notaCta: "Ocho preguntas, tres minutos.",
    ubicacion: "Córdoba, Argentina. Trabajamos con estudios de todo el país por videollamada.",
  },
  // Las opciones de las preguntas se copian tal cual: el Apps Script las valida.
  formulario: {
    etiqueta: "Diagnóstico",
    cerrar: "Cerrar formulario",
    inicio: {
      titulo: "Contanos cómo funciona tu estudio hoy",
      texto: "Ocho preguntas, tres minutos. Al terminar nos comunicamos con vos para coordinar la videollamada.",
      boton: "Empezar",
    },
    indicador: "Pregunta {n} de {total}",
    anterior: "Anterior",
    siguiente: "Siguiente",
    errorServidor: "Revisá esta respuesta y volvé a enviar.",
    preguntas: [
      {
        tipo: "chips",
        titulo: "¿Hace cuánto ejercés y cómo está formado el estudio hoy?",
        grupos: [
          {
            clave: "anios_ejercicio",
            label: "Años de ejercicio",
            opciones: ["1", "2", "3", "4", "5", "6 a 10", "Más de 10"],
          },
          {
            clave: "abogados",
            label: "Cantidad de abogados, contándote",
            opciones: ["1", "2", "3", "4", "5", "Más de 5"],
          },
          {
            clave: "apoyo",
            label: "Cantidad de personas de apoyo",
            ayuda: "Secretaría, administración, cadetería.",
            opciones: ["Ninguna", "1", "2", "3", "4", "5", "Más de 5"],
          },
        ],
      },
      {
        tipo: "multiple",
        clave: "fueros",
        titulo: "¿Qué fueros trabajás?",
        opciones: ["Laboral", "Civil", "Familia", "Comercial", "Penal", "Previsional", "Otros"],
        otros: { opcion: "Otros", clave: "fueros_otros", label: "¿Cuáles? (opcional)" },
      },
      {
        tipo: "unica",
        clave: "consultas_mes",
        titulo: "¿Cuántas consultas nuevas recibís por mes, aproximadamente?",
        opciones: ["Menos de 10", "Entre 10 y 30", "Más de 30", "No lo sé con precisión"],
      },
      {
        tipo: "multiple",
        clave: "canales",
        titulo: "¿Por dónde te llegan? Marcá todas las que apliquen.",
        opciones: [
          "Recomendación",
          "WhatsApp",
          "Instagram",
          "Google",
          "Colegas",
          "Teléfono",
          "No sabría decir cuál trae más",
        ],
      },
      {
        tipo: "unica",
        clave: "quien_contesta",
        titulo: "¿Quién contesta la primera consulta y en cuánto tiempo, en promedio?",
        opciones: [
          "Yo mismo, en el día",
          "Yo mismo, cuando puedo",
          "Secretaría, en el día",
          "Secretaría, cuando puede",
          "Depende, no hay una regla",
        ],
      },
      {
        tipo: "unica",
        clave: "donde_anota",
        titulo: "¿Dónde anotás hoy los casos, los plazos y los seguimientos?",
        opciones: [
          "Un software de gestión",
          "Planillas de Excel o Sheets",
          "Agenda de papel",
          "Drive con carpetas",
          "Varias de estas a la vez",
        ],
      },
      {
        tipo: "unica",
        clave: "costo_cliente",
        titulo: "¿Sabés cuánto te costó conseguir el último cliente que firmó?",
        opciones: ["Sí, lo tengo calculado", "Tengo una idea aproximada", "No, nunca lo medí"],
      },
      {
        tipo: "texto",
        clave: "un_anio",
        titulo: "Si dentro de un año el estudio estuviera mejor, ¿qué habría cambiado?",
      },
    ],
    contacto: {
      titulo: "Último paso: ¿a quién le escribimos?",
      campos: [
        { clave: "nombre", label: "Tu nombre", type: "text", inputMode: "text", autoComplete: "name" },
        { clave: "estudio", label: "Nombre del estudio", type: "text", inputMode: "text", autoComplete: "organization" },
        { clave: "email", label: "Email", type: "email", inputMode: "email", autoComplete: "email" },
        { clave: "whatsapp", label: "WhatsApp", type: "tel", inputMode: "tel", autoComplete: "tel" },
      ],
      honeypotLabel: "Sitio web",
      errorRequerido: "Completá este campo.",
      errorEmail: "Revisá el email: parece incompleto.",
      errorWhatsapp: "Ingresá el número con código de área, al menos 8 dígitos.",
      enviar: "Enviar para que se comuniquen",
      enviando: "Enviando…",
      errorEnvio: "No pudimos enviar el formulario. Probá de nuevo o escribinos por WhatsApp",
      reintentar: "Reintentar",
      whatsapp: "Escribir por WhatsApp",
    },
    confirmacion: {
      titulo: "Listo, {nombre}. Recibimos tus respuestas.",
      calendario: { texto: "Elegí el horario de la videollamada", boton: "Elegir horario" },
      pago: { texto: "Aboná el diagnóstico ({precio}). Se descuenta íntegro si avanzás", boton: "Ir al pago" },
      pendiente: "Te escribimos por WhatsApp en menos de 24 horas para coordinar",
      volver: "Volver a la web",
    },
    confirmarCierre: {
      titulo: "¿Cerrar el formulario?",
      texto: "Si cerrás ahora se borran las respuestas que cargaste.",
      seguir: "Seguir completando",
      cerrar: "Cerrar y borrar",
    },
  } as const,
  footer: {
    marca: "APU Core BI — Consultoría de crecimiento",
    links: [
      { label: "LinkedIn", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "WhatsApp", href: "#" },
    ],
  },
}
