import useModal from "../hooks/useModal";

import { Box } from "@mui/material";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { useGetSingleUserInfoQuery } from "../apis/usersApi";
import { setDynamicData } from "../rootRedux/utilsSlice";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";
import useStyles from "./styles";

const MainSiteLayout = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const location = useLocation();
   const [img, setImg] = useState();
   const { modals, handleClose, handleOpen } = useModal();
   const { data: userDetails } = useGetSingleUserInfoQuery();

   useEffect(() => {
      if (userDetails) {
         dispatch(
            setDynamicData({
               type: "userDetails",
               ...userDetails?.data,
            })
         );
      }
   }, [dispatch, userDetails]);

   return (
      <>
         <Box className={classes.root}>
            <Box>
               <Navbar />
               <Box className={classes.content}>
                  <Outlet />
               </Box>
               <Footer />
            </Box>
         </Box>
      </>
   );
};

export default MainSiteLayout;
