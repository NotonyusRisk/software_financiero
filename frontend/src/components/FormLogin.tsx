import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

interface LoginData {
  email: string;
  password: string;
}

export default function FormLogin() {
  const { register, handleSubmit } = useForm<LoginData>();
  const navigate = useNavigate();

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await loginUser(data.email, data.password);
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch {
      alert('Credenciales incorrectas');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField fullWidth label="Correo" margin="normal" {...register('email')} />
      <TextField fullWidth label="Contraseña" type="password" margin="normal" {...register('password')} />
      <Button fullWidth variant="contained" type="submit">Ingresar</Button>
    </form>
  );
}