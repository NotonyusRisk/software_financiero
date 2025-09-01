import { useEffect, useState } from 'react';
import { Meta, obtenerMetas } from '../api/metas';
import FormMeta from '../components/FormMeta';
import { Typography, Divider } from '@mui/material';

export default function Metas() {
  const [metas, setMetas] = useState<Meta[]>([]);

  const cargar = async () => {
    const res = await obtenerMetas();
    setMetas(res);
  };

  useEffect(() => { cargar(); }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>Metas de Ahorro</Typography>
      <FormMeta onSuccess={cargar} />
      <Divider sx={{ my: 3 }} />
      {metas.map((m) => (
        <p key={m.id}>
          {m.name} → ${m.current_amount} / ${m.target_amount} hasta {m.deadline}
        </p>
      ))}
    </div>
  );
}
