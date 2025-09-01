import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  return (
    <Box display="flex" minHeight="100vh">
      <Sidebar />
      <Box component="main" flexGrow={1} p={3}>
        <Outlet />
      </Box>
    </Box>
  );
}
