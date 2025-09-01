// src/hooks/useDashboard.ts
import { useEffect, useState } from 'react';
import { obtenerMovimientos } from '../api/movimientos';
import { obtenerMetas } from '../api/metas';
import { obtenerPresupuestos } from '../api/presupuestos';

export const useDashboard = () => {
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [presupuesto, setPresupuesto] = useState(0);
  const [ahorrado, setAhorrado] = useState(0);

  useEffect(() => {
    const cargar = async () => {
      const currentDate = new Date();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0');
      const year = String(currentDate.getFullYear());

      const movimientos = await obtenerMovimientos({ month, year });
      setIngresos(movimientos.filter(m => m.type === 'ingreso').reduce((a, b) => a + b.amount, 0));
      setEgresos(movimientos.filter(m => m.type === 'egreso').reduce((a, b) => a + b.amount, 0));

      const presupuestos = await obtenerPresupuestos();
      const actual = presupuestos.find(p => p.month === +month && p.year === +year);
      setPresupuesto(actual?.amount || 0);

      const metas = await obtenerMetas();
      setAhorrado(metas.reduce((acc, m) => acc + (m.current_amount || 0), 0));
    };

    cargar();
  }, []);

  return { ingresos, egresos, presupuesto, ahorrado };
};
