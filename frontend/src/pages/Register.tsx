import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../api/auth';
import { TextField, Button, Stack, Typography } from '@mui/material';

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export default function Register() {
  const { register, handleSubmit } = useForm<RegisterData>();
  const navigate = useNavigate();

  const onSubmit = async (data: RegisterData) => {
    try {
      await registerUser(data);
      alert('Registro exitoso. Ahora inicia sesión.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || 'Error desconocido');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width="300px" margin="auto" mt={8}>
        <Typography variant="h5">Crear cuenta</Typography>
        <TextField label="Nombre" {...register('name')} required />
        <TextField label="Email" {...register('email')} required />
        <TextField label="Contraseña" type="password" {...register('password')} required />
        <Button variant="contained" type="submit">Registrarse</Button>
        <Button onClick={() => navigate('/login')}>Ya tengo cuenta</Button>
      </Stack>
    </form>
  );
}
