import { Box, Typography, Paper } from '@mui/material';
import FormRegister from '../components/FormRegister';

export default function Register() {
  return (
    <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Paper elevation={3} sx={{ padding: 4, width: 400 }}>
        <Typography variant="h5" mb={2}>Registrarse</Typography>
        <FormRegister />
      </Paper>
    </Box>
  );
}