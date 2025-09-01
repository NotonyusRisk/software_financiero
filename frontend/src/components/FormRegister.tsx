import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { registerUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default function FormRegister() {
  const { register, handleSubmit } = useForm<RegisterData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterData) => {
    try {
      const res = await registerUser(data.name, data.email, data.password);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch {
      alert('Error al registrar');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField fullWidth label="Nombre" margin="normal" {...register('name')} />
      <TextField fullWidth label="Correo" margin="normal" {...register('email')} />
      <TextField fullWidth label="Contraseña" type="password" margin="normal" {...register('password')} />
      <Button fullWidth variant="contained" type="submit">Registrarse</Button>
    </form>
  );
}