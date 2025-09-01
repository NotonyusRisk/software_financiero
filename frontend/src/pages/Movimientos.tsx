import { useEffect, useState } from 'react';
import { Movimiento, obtenerMovimientos } from '../api/movimientos';
import FormMovimiento from '../components/FormMovimiento';
import { Typography, Divider } from '@mui/material';

export default function Movimientos() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  const cargar = async () => {
    const res = await obtenerMovimientos();
    setMovimientos(res);
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Movimientos</Typography>
      <FormMovimiento onSuccess={cargar} />
      <Divider sx={{ my: 3 }} />
      {movimientos.map((m) => (
        <p key={m.id}>
          {m.date} - {m.type.toUpperCase()} - ${m.amount} - {m.description}
        </p>
      ))}
    </div>
  );
}
