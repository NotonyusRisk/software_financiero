import api from './axios';

export interface Meta {
  id?: number;
  name: string;
  target_amount: number;
  current_amount?: number;
  deadline: string;
}

export const crearMeta = async (data: Meta) => {
  const res = await api.post('/goals', data);
  return res.data;
};

export const obtenerMetas = async () => {
  const res = await api.get('/goals');
  return res.data;
};
