import { Logout } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../../../apis/authApi";
import Left from "../../../../assets/login/SignAbstract.png";
import Logo from "../../../../assets/logo.png";
import MyInvitations from "../../login/MyInvitations";
import { MainFooter } from "./MainFooter";
import styles from "./styles";
const helpArray = [
   "/invitation",
   "/invitation/",
   "/resend-email",
   "/resend-email/",
   "/set-password-invitation",
   "/set-password-invitation/",
   "/forgot-password",
   "/forgot-password/",
   "/reset-password",
   "/reset-password/",
];

const CompanyLayout = () => {
   const classes = styles();
   const location = useLocation();
   const isHelp = helpArray?.includes(location?.pathname);

   return (
      <>
         <Box
            className={classes.loginContainer}
            // sx={{ minWidth: !isHelp && "1200px" }}
         >
            <Box className={classes.loginContents}>
               <Header isHelp={isHelp} />
               <Box className={classes.mainDiv}>
                  <Outlet />
               </Box>
               <MainFooter />{" "}
            </Box>
            <Box className="left">
               <img src={Left} />
            </Box>
         </Box>
      </>
   );
};

export default CompanyLayout;

const Header = ({ isHelp }) => {
   const classes = styles();
   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleLogout = () => {
      dispatch(logout());
      navigate(`/login`);
   };
   return (
      <Box className={classes.header}>
         <Box
            className="logoDiv"
            onClick={() =>
               navigate(isHelp ? "/login" : "/switch-company")
            }
         >
            <img src={Logo} />
            <Typography className="title">
               SROT HOSPITALITY
            </Typography>
         </Box>
         <Box>
            {isHelp ? (
               <Box className="singupDiv">
                  <Typography>Need any help?</Typography>
                  <Typography className="singup">
                     Contact Us
                  </Typography>
               </Box>
            ) : (
               <Box sx={{ display: "flex", columnGap: "5px" }}>
                  {location?.pathname === "/switch-company" && (
                     <Box>
                        <MyInvitations />
                     </Box>
                  )}
                  <Button
                     startIcon={<Logout />}
                     sx={{
                        color: "#201F37",
                        fontSize: { xs: "11px", md: "14px" },
                        "&:hover": {
                           background: "#fff",
                        },
                     }}
                     onClick={() => handleLogout()}
                  >
                     Logout
                  </Button>
               </Box>
            )}
         </Box>
      </Box>
   );
};
