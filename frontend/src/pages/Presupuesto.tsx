import { useEffect, useState } from 'react';
import { Presupuesto, obtenerPresupuestos } from '../api/presupuestos';
import FormPresupuesto from '../components/FormPresupuesto';
import { Typography, Divider } from '@mui/material';

export default function VistaPresupuesto() {
  const [presupuestos, setPresupuestos] = useState<Presupuesto[]>([]);

  const cargar = async () => {
    const res = await obtenerPresupuestos();
    setPresupuestos(res);
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Presupuesto mensual</Typography>
      <FormPresupuesto onSuccess={cargar} />
      <Divider sx={{ my: 3 }} />
      {presupuestos.map((p) => (
        <p key={p.id}>
          {p.month}/{p.year}: ${p.amount}
        </p>
      ))}
    </div>
  );
}
