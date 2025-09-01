import { Box, Typography, Paper } from '@mui/material';
import FormLogin from '../components/FormLogin';

export default function Login() {
  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>Iniciar Sesión</Typography>
        <FormLogin />
      </Paper>
    </Box>
  );
}