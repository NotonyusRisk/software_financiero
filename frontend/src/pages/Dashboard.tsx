import { useEffect, useState } from 'react';
import { Box, Card, CardContent, Typography, Grid, Divider, Table, TableHead, TableRow, TableCell, TableBody, Paper, TableContainer } from '@mui/material';
import { useDashboard } from '../hooks/useDashboard';
import { obtenerMovimientos } from '../api/movimientos';
import {Movimiento} from '../types';

export default function Dashboard() {
  const { ingresos, egresos, presupuesto, ahorrado } = useDashboard();
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);

  useEffect(() => {
    const cargarMovimientos = async () => {
      const data = await obtenerMovimientos();
      console.log('📦 Movimientos recibidos:', data);
      setMovimientos(data);
    };
    cargarMovimientos();
  }, []);

  const Item = ({ title, value }: { title: string; value: number }) => (
    <Card>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h5">${value.toLocaleString('es-CO')}</Typography>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      <Typography variant="h4" mb={3}>Dashboard</Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={3}><Item title="Ingresos" value={ingresos} /></Grid>
        <Grid item xs={12} md={3}><Item title="Egresos" value={egresos} /></Grid>
        <Grid item xs={12} md={3}><Item title="Presupuesto" value={presupuesto} /></Grid>
        <Grid item xs={12} md={3}><Item title="Ahorrado" value={ahorrado} /></Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />

      <Typography variant="h6" gutterBottom>Últimos movimientos</Typography>
      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Fecha</TableCell>
              <TableCell>Descripción</TableCell>
              <TableCell>Categoría</TableCell>
              <TableCell>Monto</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {movimientos.slice(0, 5).map((mov, i) => (
              <TableRow key={i}>
                <TableCell>{mov.fecha ? new Date(mov.fecha).toLocaleDateString() : 'Sin fecha'}</TableCell>
                <TableCell>{mov.descripcion}</TableCell>
                <TableCell>{mov.categoria}</TableCell>
                <TableCell>${(mov.monto ?? 0).toLocaleString('es-CO')}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}