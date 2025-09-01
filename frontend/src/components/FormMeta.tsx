import { useForm } from 'react-hook-form';
import { Meta, crearMeta } from '../api/metas';
import { Button, Stack, TextField } from '@mui/material';

export default function FormMeta({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset } = useForm<Meta>();

  const onSubmit = async (data: Meta) => {
    await crearMeta(data);
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField label="Nombre" {...register('name')} required />
        <TextField label="Monto objetivo" type="number" {...register('target_amount')} required />
        <TextField label="Fecha límite" type="date" {...register('deadline')} required InputLabelProps={{ shrink: true }} />

        <Button variant="contained" type="submit">Guardar Meta</Button>
      </Stack>
    </form>
  );
}
