import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../api/auth';
import { TextField, Button, Stack, Typography } from '@mui/material';

interface LoginData {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await loginUser(data.email, data.password);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error desconocido');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} width="300px" margin="auto" mt={8}>
        <Typography variant="h5">Iniciar sesión</Typography>
        <TextField label="Email" {...register('email')} required />
        <TextField label="Contraseña" type="password" {...register('password')} required />
        <Button variant="contained" type="submit">Entrar</Button>
        <Button onClick={() => navigate('/register')}>Registrarse</Button>
      </Stack>
    </form>
  );
}
