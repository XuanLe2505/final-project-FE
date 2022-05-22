import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import AdminHeader from "./AdminHeader";

function AdminLayout() {
  return (
    <Stack sx={{ minHeight: "100vh" }}>
      <AlertMsg/>
      <AdminHeader />
      <Outlet />
      <Box sx={{ flexGrow: 1 }} />
    </Stack>
  );
}

export default AdminLayout;
