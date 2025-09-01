import { useEffect, useState } from 'react';
import { Box, Typography, Divider, Select, MenuItem, FormControl, InputLabel, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { obtenerMovimientos } from '../api/movimientos';
import Sidebar from '../components/Sidebar';
import {Movimiento} from '../types';

const meses = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

export default function Reportes() {
  const [movimientos, setMovimientos] = useState<Movimiento[]>([]);
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [anio, setAnio] = useState<number>(new Date().getFullYear());

  const filtrar = async () => {
    const data = await obtenerMovimientos();
    const filtrados = data.filter((m: Movimiento) => {
      const fecha = new Date(m.fecha);
      return fecha.getMonth() + 1 === mes && fecha.getFullYear() === anio;
    });
    setMovimientos(filtrados);
  };

  useEffect(() => {
    filtrar();
  }, [mes, anio]);

  const total = (tipo: 'ingreso' | 'egreso') =>
    movimientos.filter(m => m.categoria === tipo).reduce((acc, cur) => acc + cur.monto, 0);

  return (
    <Box display="flex">
      <Sidebar />
      <Box component="main" p={3} flexGrow={1}>
        <Typography variant="h4">Reportes Mensuales</Typography>
        <Divider sx={{ my: 2 }} />
        <Box display="flex" gap={2} mb={3}>
          <FormControl>
            <InputLabel>Mes</InputLabel>
            <Select value={mes} label="Mes" onChange={e => setMes(Number(e.target.value))}>
              {meses.map((m, i) => (
                <MenuItem key={i} value={i + 1}>{m}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel>Año</InputLabel>
            <Select value={anio} label="Año" onChange={e => setAnio(Number(e.target.value))}>
              {[2023, 2024, 2025].map(y => (
                <MenuItem key={y} value={y}>{y}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Fecha</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Categoría</TableCell>
                <TableCell>Monto</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {movimientos.map((mov, index) => (
                <TableRow key={index}>
                  <TableCell>{new Date(mov.fecha).toLocaleDateString()}</TableCell>
                  <TableCell>{mov.descripcion}</TableCell>
                  <TableCell>{mov.categoria}</TableCell>
                  <TableCell>${mov.monto.toLocaleString('es-CO')}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box mt={3}>
          <Typography>💰 Total Ingresos: ${total('ingreso').toLocaleString('es-CO')}</Typography>
          <Typography>💸 Total Egresos: ${total('egreso').toLocaleString('es-CO')}</Typography>
          <Typography variant="h6">📉 Balance: ${(total('ingreso') - total('egreso')).toLocaleString('es-CO')}</Typography>
        </Box>
      </Box>
    </Box>
  );
}