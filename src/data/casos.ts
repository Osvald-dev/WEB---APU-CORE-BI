import apucore1 from "../assets/img/apucore1.webp";
import apucore2 from "../assets/img/apucore2.webp";
import apucore3 from "../assets/img/apucore3.webp";

export type MediaItem =
  | { type: "image"; src: string; alt: string }
  | { type: "video"; src: string; poster?: string; alt: string };

export interface CasoResultado {
  id: string;
  estudio: string;
  fuero: string;
  media: MediaItem[];
  metricas: { label: string; antes: string; despues: string }[];
  cita?: string;
  autorNombre?: string;
}

export const casos: CasoResultado[] = [
  {
    id: "caso-1",
    estudio: "Estudio jurídico A",
    fuero: "Laboral",
    media: [
      {
        type: "image",
        src: apucore1,
        alt: "Panel de equipo y seguimiento de videos con métricas de campañas en el sistema APU Core BI",
      },
    ],
    metricas: [],
  },
  {
    id: "caso-2",
    estudio: "Estudio jurídico B",
    fuero: "Familia y civil",
    media: [
      {
        type: "image",
        src: apucore2,
        alt: "Plazos del juzgado, expedientes a mover y conversaciones del día en el sistema APU Core BI",
      },
    ],
    metricas: [],
  },
  {
    id: "caso-3",
    estudio: "Sistema APU Core BI",
    fuero: "Sistema",
    media: [
      {
        type: "image",
        src: apucore3,
        alt: "Tablero general del estudio con objetivos del mes, cobros y alertas en el sistema APU Core BI",
      },
    ],
    metricas: [],
  },
];
