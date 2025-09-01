import { Box, Typography, Divider } from '@mui/material';
import FormPresupuesto from '../components/FormPresupuesto';
import Sidebar from '../components/Sidebar';

export default function Presupuesto() {
  return (
    <Box p={3}>
      <Sidebar />
      <Typography variant="h4">Registrar Presupuesto</Typography>
      <Divider sx={{ my: 2 }} />
      <FormPresupuesto />
    </Box>
  );
}
