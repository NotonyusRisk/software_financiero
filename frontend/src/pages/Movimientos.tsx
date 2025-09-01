import { Box, Typography, Divider } from '@mui/material';
import FormMovimiento from '../components/FormMovimiento';
import Sidebar from '../components/Sidebar';

export default function Movimiento() {
  return (
    <Box p={3}>
      <Sidebar />
      <Typography variant="h4">Registrar Movimiento</Typography>
      <Divider sx={{ my: 2 }} />
      <FormMovimiento />
    </Box>
  );
}