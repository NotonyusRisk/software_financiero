// src/router/index.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';
import Movimientos from '../pages/Movimientos';
import Metas from '../pages/Metas';
import Presupuesto from '../pages/Presupuesto';
import Reportes from '../pages/Reportes';
import NotFound from '../pages/NotFound';

export default function AppRouter() {
  const isAuthenticated = !!localStorage.getItem('token'); // Temporal

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {isAuthenticated ? (
          <>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movimientos" element={<Movimientos />} />
            <Route path="/metas" element={<Metas />} />
            <Route path="/presupuesto" element={<Presupuesto />} />
            <Route path="/reportes" element={<Reportes />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
