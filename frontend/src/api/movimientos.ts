import api from './axios';

export interface Movimiento {
  id?: number;
  type: 'ingreso' | 'egreso';
  amount: number;
  description: string;
  date: string;
}

export const crearMovimiento = async (data: Movimiento) => {
  const res = await api.post('/movements', data);
  return res.data;
};

export const obtenerMovimientos = async (params?: {
  type?: string;
  month?: string;
  year?: string;
}) => {
  const res = await api.get('/movements', { params });
  return res.data;
};
