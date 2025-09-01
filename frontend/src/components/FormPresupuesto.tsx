import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { crearPresupuesto } from '../api/presupuestos';

interface PresupuestoData {
  month: number;
  year: number;
  amount: number;
}

export default function FormPresupuesto() {
  const { register, handleSubmit, reset } = useForm<PresupuestoData>();

  const onSubmit = async (data: PresupuestoData) => {
    await crearPresupuesto(data);
    alert('Presupuesto creado');
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField label="Mes (número)" type="number" fullWidth margin="normal" {...register('month')} />
      <TextField label="Año" type="number" fullWidth margin="normal" {...register('year')} />
      <TextField label="Presupuesto (COP)" type="number" fullWidth margin="normal" {...register('amount')} />
      <Button fullWidth variant="contained" type="submit">Guardar</Button>
    </form>
  );
}