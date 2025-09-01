import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Movimiento from "../pages/Movimientos";
import Meta from "../pages/Metas";
import Presupuesto from "../pages/Presupuesto";
import Reportes from "../pages/Reportes";
import ProtectedRoute from "./ProtectedRoute";
import AppLayout from "../components/AppLayout";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/movimiento" element={<Movimiento />} />
            <Route path="/meta" element={<Meta />} />
            <Route path="/presupuesto" element={<Presupuesto />} />
            <Route path="/reportes" element={<Reportes />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
