import { useForm } from 'react-hook-form';
import { Presupuesto, crearPresupuesto } from '../api/presupuestos';
import { Button, Stack, TextField } from '@mui/material';

export default function FormPresupuesto({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset } = useForm<Presupuesto>();

  const onSubmit = async (data: Presupuesto) => {
    await crearPresupuesto(data);
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField label="Monto mensual" type="number" {...register('amount')} required />
        <TextField label="Mes" type="number" {...register('month')} required inputProps={{ min: 1, max: 12 }} />
        <TextField label="Año" type="number" {...register('year')} required />

        <Button variant="contained" type="submit">Guardar Presupuesto</Button>
      </Stack>
    </form>
  );
}
