import { Box, Typography, Divider } from '@mui/material';
import FormMeta from '../components/FormMeta';
import Sidebar from '../components/Sidebar';

export default function Meta() {
  return (
    <Box p={3}>
      <Sidebar />
      <Typography variant="h4">Registrar Meta</Typography>
      <Divider sx={{ my: 2 }} />
      <FormMeta />
    </Box>
  );
}