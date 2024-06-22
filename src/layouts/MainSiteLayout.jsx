import useModal from "../hooks/useModal";

import { Box } from "@mui/material";

import EastIcon from "@mui/icons-material/East";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import Footer from "./footer/Footer";
import NavBar from "./navbar/Navbar";
import useStyles from "./styles";
const MainSiteLayout = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const location = useLocation();
   const [img, setImg] = useState();
   const { modals, handleClose, handleOpen } = useModal();
   // const { data: userDetails } = useGetSingleUserInfoQuery();

   // useEffect(() => {
   //    if (userDetails) {
   //       dispatch(
   //          setDynamicData({
   //             type: "userDetails",
   //             ...userDetails?.data,
   //          })
   //       );
   //    }
   // }, [dispatch, userDetails]);

   const [isVisible, setIsVisible] = useState(false);

   useEffect(() => {
      // Function to handle scroll event
      const handleScroll = () => {
         // If the page is scrolled beyond a certain threshold, set isVisible to true
         const scrollTop = window.scrollY;
         if (scrollTop > 200) {
            setIsVisible(true);
         } else {
            setIsVisible(false);
         }
      };

      // Add scroll event listener when component mounts
      window.addEventListener("scroll", handleScroll);

      // Remove scroll event listener when component unmounts
      return () => {
         window.removeEventListener("scroll", handleScroll);
      };
   }, []);

   // Function to scroll to top
   const scrollToTop = () => {
      window.scrollTo({
         top: 0,
         behavior: "smooth",
      });
   };

   return (
      <>
         <Box className={classes.root}>
            <Box>
               <NavBar />
               <Box className={classes.content}>
                  <Outlet />
               </Box>
               <Footer />
               <Box
                  onClick={scrollToTop}
                  id="scrollToTopBtn"
                  title="Go to top"
                  className={
                     isVisible
                        ? classes.scrollToTopBtnVisible
                        : classes.scrollToTopBtn
                  }
               >
                  Scroll to top
                  <EastIcon sx={{ marginLeft: "5px" }} />
               </Box>
            </Box>
         </Box>
      </>
   );
};

export default MainSiteLayout;
