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
    media: [],
    metricas: [],
  },
  {
    id: "caso-2",
    estudio: "Estudio jurídico B",
    fuero: "Familia y civil",
    media: [],
    metricas: [],
  },
];
