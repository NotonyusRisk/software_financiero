export interface Movimiento {
  id?: number;
  categoria: 'ingreso' | 'egreso';
  monto: number;
  descripcion: string;
  fecha: string;
}

export interface Meta {
  id?: number;
  nombre: string;
  montoObjetivo: number;
  fechaLimite: string;
}

export interface Presupuesto {
  id?: number;
  categoria: string;
  monto: number;
  mes: number;
  anio: number;
}

export interface Usuario {
  id?: number;
  nombre: string;
  email: string;
  password?: string;
}