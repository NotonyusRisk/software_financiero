import api from './axios';

export interface Presupuesto {
  id?: number;
  amount: number;
  month: number;
  year: number;
}

export const crearPresupuesto = async (data: Presupuesto) => {
  const res = await api.post('/budgets', data);
  return res.data;
};

export const obtenerPresupuestos = async () => {
  const res = await api.get('/budgets');
  return res.data;
};
