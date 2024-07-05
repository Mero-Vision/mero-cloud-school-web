import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
// import banner from "../../../../assets/dashboardIcons/moneyBanner.svg";
import ErrorIcon from "@mui/icons-material/Error";
import banner from "../../../../assets/dashboardIcons/bgImageHeader.png";
import occupancyGridImage from "../../../../assets/dashboardIcons/occupancyGrid.png";
// import { generateGreetings } from "../../../../utils/helpers";
import { useNavigate } from "react-router-dom";
import styles from "./styles";

const DashboardHeader = ({ dashboardData }) => {
   const classes = styles();
   const navigate = useNavigate();
   const { user } = useSelector((state) => state?.auth);
   const [activeButton, setActiveButton] = useState("hourly");

   return (
      <>
         <Grid container spacing={2}>
            <Grid item md={6} xs={12}>
               <Box className={classes.headerContainer}>
                  <Box className={classes.mainDiv}>
                     {/* <Typography className="date">
                     {changeDateFormat(new Date(), "dddd, MMMM DD")}
                  </Typography> */}
                     <Typography className="title">
                        Welcome,
                        {/* Good {generateGreetings()},{" "} */}{" "}
                        {user?.name || "User"}
                        !!
                     </Typography>
                     <Typography className="subtitle">
                        Fresh morning updates with our app.
                     </Typography>

                     <Typography
                        className="warning"
                        sx={{
                           color: "#039111 !important",
                        }}
                     >
                        <ErrorIcon className="warningIcon" />
                        {/* Yesterday's data has not been updated */}
                        hello{" "}
                     </Typography>
                  </Box>
                  <Box className={classes.imageDiv}>
                     <img src={banner} />
                  </Box>
               </Box>
            </Grid>
            <Grid item md={2} xs={4}>
               <Box
                  className={classes.headerContainerCurrentOccupancy}
               >
                  <Box className="gridTwoBox">
                     <Typography className="gridTwoTitle">
                        Current Occupancy
                     </Typography>
                     <Typography className="gridTwoPercentage">
                        22 %
                     </Typography>
                  </Box>
                  <Box className={classes.occupancyGridImageDiv}>
                     <img src={occupancyGridImage} />
                  </Box>
               </Box>
            </Grid>
            <Grid item md={4} xs={8}>
               <Box className={classes.headerContainerPeakTime}>
                  <Box
                     sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                     }}
                  >
                     <Box>Peak Time</Box>
                     <Box>
                        <Button
                           className={
                              activeButton === "hourly"
                                 ? "buttonActiveLeft"
                                 : "buttonInactiveLeft"
                           }
                           onClick={() => handleButtonClick("hourly")}
                        >
                           Hourly
                        </Button>
                        <Button
                           className={
                              activeButton === "daily"
                                 ? "buttonActiveRight"
                                 : "buttonInactiveRight"
                           }
                           onClick={() => handleButtonClick("daily")}
                        >
                           Daily
                        </Button>
                     </Box>
                  </Box>
               </Box>
            </Grid>
         </Grid>
      </>
   );
};

export default DashboardHeader;
