import { Box, Divider } from "@mui/material";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../navbar";
import FirmDashboardSideBar from "../sidebar/firmDashboardSideBar";
import useStyles from "../styles";

const FirmLayout = () => {
  const classes = useStyles();
  useEffect(() => {
    localStorage.removeItem("is_company");
  }, []);
  return (
    <>
      <Box className={classes.root}>
        {/* <Sidebar /> */}
        <FirmDashboardSideBar />
        <Box sx={{ background: "#F9F9FB", width: "100%" }}>
          <Box sx={{ paddingInline: "46px" }}>
            <Navbar />
          </Box>
          <Divider />
          <Box className={classes.content}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default FirmLayout;
