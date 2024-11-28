import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import { Box, Grid } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

import iphoneMacbookPng from "../../../../../assets/iphoneMacbookPng.png";
import "./Hero.css";

const Hero = () => {
   const isMobile = window.innerWidth < 768; //Add the width you want to check for here (now 768px)

   return (
      <div className="hero">
         <div className="container">
            <div className="content">
               <div className="col-1">
                  <motion.div
                     className="hero-text-box"
                     initial={!isMobile && { x: -150 }}
                     whileInView={
                        !isMobile && {
                           x: 0,
                        }
                     }
                     transition={
                        !isMobile && {
                           duration: 1,
                           bounce: 0.5,
                           ease: "easeIn",
                           x: { type: "spring", stiffness: 60 },
                        }
                     }
                     // initial={{ x: -100, opacity: 0 }}
                     // animate={{ x: 0, opacity: 1 }}
                     // transition={{
                     //    delay: 0.2,
                     //    x: { type: "spring", stiffness: 60 },
                     //    opacity: { duration: 1 },
                     //    ease: "easeIn",
                     // }}
                  >
                     <h1>
                        A complete School and College MIS and Digital
                        Learning Platform.
                     </h1>
                  </motion.div>
                  <motion.p
                     initial={!isMobile && { x: -150 }}
                     whileInView={
                        !isMobile && {
                           x: 0,
                        }
                     }
                     transition={
                        !isMobile && {
                           duration: 0.6,
                           bounce: 0.5,
                           ease: "easeIn",
                           x: { type: "spring", stiffness: 60 },
                        }
                     }
                     // initial={{ x: -100, opacity: 0 }}
                     // animate={{ x: 0, opacity: 1 }}
                     // transition={{
                     //    delay: 1.4,
                     //    x: { type: "spring", stiffness: 60 },
                     //    opacity: { duration: 0.6 },
                     //    ease: "easeIn",
                     // }}
                     style={{ width: "100%", color: "#020c1c" }}
                  >
                     Mero school are the best all-in-one cloud-based
                     school software and digital learning system for
                     growing, big and ambitious names in education.
                  </motion.p>
                  <motion.div
                     initial={!isMobile && { x: -150 }}
                     whileInView={
                        !isMobile && {
                           x: 0,
                        }
                     }
                     transition={
                        !isMobile && {
                           duration: 0.2,
                           bounce: 0.5,
                           ease: "easeIn",
                           x: { type: "spring", stiffness: 60 },
                        }
                     }
                     // initial={{ x: -100, opacity: 0 }}
                     // animate={{ x: 0, opacity: 1 }}
                     // transition={{
                     //    delay: 2.1,
                     //    x: { type: "spring", stiffness: 60 },
                     //    opacity: { duration: 0.6 },
                     //    ease: "easeIn",
                     // }}
                     className={"hero-area-button-box"}
                  >
                     <Grid container spacing={1}>
                        <Grid item xs={6}>
                           <Box className={"hero-area-btn"}>
                              Get Started
                           </Box>
                        </Grid>
                        <Grid item xs={6}>
                           <Box className={"hero-area-btn"}>
                              <PlayArrowRoundedIcon
                                 className={"hero-area-btn-icon"}
                              />
                              Watch Video
                           </Box>
                        </Grid>
                     </Grid>
                  </motion.div>
               </div>
               <div className="col-2">
                  <div className="rightBox">
                     <motion.div
                        className="heroImg"
                        style={{ zIndex: 10 }}
                        initial={{ x: +100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{
                           delay: 0.2,
                           x: { type: "spring", stiffness: 60 },
                           opacity: { duration: 1 },
                           ease: "easeIn",
                           duration: 1,
                        }}
                     >
                        <motion.img
                           src={iphoneMacbookPng}
                           alt="win big"
                           style={{
                              zIndex: 10,
                              position: "relative",
                           }}
                           animate={{ y: [0, -14, 0] }}
                           transition={{
                              duration: 5,
                              repeat: Infinity,
                              repeatType: "loop",
                              ease: "easeInOut",
                           }}
                        />
                     </motion.div>

                     {/* <div className="blob"></div> */}
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Hero;
