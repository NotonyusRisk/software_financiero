import { Button, MenuItem, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { crearMovimiento } from '../api/movimientos';

interface MovimientoData {
  type: 'ingreso' | 'egreso';
  category: string;
  amount: number;
  date: string;
  description: string;
}

export default function FormMovimiento() {
  const { register, handleSubmit, reset } = useForm<MovimientoData>();

  const onSubmit = async (data: MovimientoData) => {
    await crearMovimiento(data);
    alert('Movimiento registrado');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField select label="Tipo" fullWidth margin="normal" {...register('type')}>
        <MenuItem value="ingreso">Ingreso</MenuItem>
        <MenuItem value="egreso">Egreso</MenuItem>
      </TextField>
      <TextField label="Categoría" fullWidth margin="normal" {...register('category')} />
      <TextField label="Monto" type="number" fullWidth margin="normal" {...register('amount')} />
      <TextField label="Fecha" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} {...register('date')} />
      <TextField label="Descripción" fullWidth margin="normal" {...register('description')} />
      <Button fullWidth type="submit" variant="contained">Guardar</Button>
    </form>
  );
}