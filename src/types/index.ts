export interface WeightRecord {
  id?: number;
  usuario: string;
  ejercicio: string;
  peso_discos_lb: number;
  peso_discos_kg?: number;
  nrepeticiones: number;
  fecha?: string;
  hora?: string;
  rm?: number;
  rm_lb?: number;
  rm_kg?: number;
  peso_barra?: number;
}

export interface ApiError {
  message: string;
  status?: number;
}