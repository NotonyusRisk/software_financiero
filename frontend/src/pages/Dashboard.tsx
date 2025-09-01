import { useEffect, useState } from 'react';
import { Box, Grid, Typography, Card, CardContent } from '@mui/material';
import { obtenerMovimientos, Movimiento } from '../api/movimientos';
import { obtenerMetas, Meta } from '../api/metas';
import { obtenerPresupuestos, Presupuesto } from '../api/presupuestos';

const currentDate = new Date();
const currentMonth = String(currentDate.getMonth() + 1).padStart(2, '0');
const currentYear = String(currentDate.getFullYear());

export default function Dashboard() {
  const [ingresos, setIngresos] = useState(0);
  const [egresos, setEgresos] = useState(0);
  const [presupuesto, setPresupuesto] = useState(0);
  const [ahorrado, setAhorrado] = useState(0);

  useEffect(() => {
    const cargar = async () => {
      // Movimientos
      const movimientos: Movimiento[] = await obtenerMovimientos({
        month: currentMonth,
        year: currentYear
      });

      const totalIngresos = movimientos
        .filter((m) => m.type === 'ingreso')
        .reduce((acc, curr) => acc + curr.amount, 0);

      const totalEgresos = movimientos
        .filter((m) => m.type === 'egreso')
        .reduce((acc, curr) => acc + curr.amount, 0);

      setIngresos(totalIngresos);
      setEgresos(totalEgresos);

      // Presupuesto
      const presupuestos: Presupuesto[] = await obtenerPresupuestos();
      const actual = presupuestos.find((p) => p.month === Number(currentMonth) && p.year === Number(currentYear));
      setPresupuesto(actual?.amount || 0);

      // Metas
      const metas: Meta[] = await obtenerMetas();
      const totalAhorrado = metas.reduce((acc, m) => acc + (m.current_amount || 0), 0);
      setAhorrado(totalAhorrado);
    };

    cargar();
  }, []);

  const items = [
    { label: 'Ingresos del mes', value: ingresos },
    { label: 'Egresos del mes', value: egresos },
    { label: 'Presupuesto mensual', value: presupuesto },
    { label: 'Ahorrado en metas', value: ahorrado }
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>Resumen financiero</Typography>
      <Grid container spacing={3}>
        {items.map((item, index) => (
          <Grid item xs={12} md={6} lg={3} key={index}>
            <Card elevation={3}>
              <CardContent>
                <Typography color="textSecondary" gutterBottom>
                  {item.label}
                </Typography>
                <Typography variant="h5">${item.value.toLocaleString('es-CO')}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
