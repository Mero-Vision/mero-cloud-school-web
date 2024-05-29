import { Box } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

const RedirectLayoutPos = () => {
  return (
    <Box sx={{ minWidth: "1200px" }}>
      <Outlet />
    </Box>
  );
};

export default RedirectLayoutPos;
