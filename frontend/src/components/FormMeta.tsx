import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { crearMeta } from '../api/metas';

interface MetaData {
  name: string;
  target_amount: number;
  current_amount: number;
  deadline: string;
}

export default function FormMeta() {
  const { register, handleSubmit, reset } = useForm<MetaData>();

  const onSubmit = async (data: MetaData) => {
    await crearMeta(data);
    alert('Meta registrada');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Nombre" fullWidth margin="normal" {...register('name')} />
      <TextField label="Meta total (COP)" type="number" fullWidth margin="normal" {...register('target_amount')} />
      <TextField label="Cantidad actual" type="number" fullWidth margin="normal" {...register('current_amount')} />
      <TextField
        label="Fecha límite"
        type="date"
        fullWidth
        margin="normal"
        InputLabelProps={{ shrink: true }}
        {...register('deadline')}
      />
      <Button fullWidth variant="contained" type="submit">Guardar</Button>
    </form>
  );
}