import { useForm } from 'react-hook-form';
import { Movimiento, crearMovimiento } from '../api/movimientos';
import { Button, MenuItem, TextField, Stack } from '@mui/material';

export default function FormMovimiento({ onSuccess }: { onSuccess: () => void }) {
  const { register, handleSubmit, reset } = useForm<Movimiento>();

  const onSubmit = async (data: Movimiento) => {
    await crearMovimiento(data);
    reset();
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField select label="Tipo" {...register('type')} required>
          <MenuItem value="ingreso">Ingreso</MenuItem>
          <MenuItem value="egreso">Egreso</MenuItem>
        </TextField>

        <TextField label="Monto" type="number" {...register('amount')} required />
        <TextField label="Descripción" {...register('description')} required />
        <TextField label="Fecha" type="date" {...register('date')} required InputLabelProps={{ shrink: true }} />

        <Button variant="contained" type="submit">Agregar Movimiento</Button>
      </Stack>
    </form>
  );
}
