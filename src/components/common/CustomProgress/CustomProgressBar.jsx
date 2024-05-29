import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { Box, LinearProgress, Typography } from "@mui/material";
import React, { useMemo } from "react";

const styles = {
   title: {
      color: "#383751",
      fontSize: "14px",
      fontWeight: 500,
   },

   total: {
      color: "#9d9caf",
      fontSize: "14px",
   },
   totalInfinite: {
      color: "#9d9caf",
      // fontSize: "18px",
   },
   slash: {
      color: "#9d9caf",
      fontSize: "14px",
   },
   value: {
      color: "#383751",
      fontSize: "12px",
   },
   valueBox: {
      display: "flex",
      alignItems: "center !important",
   },
   progress: {
      "& .MuiLinearProgress-root": {
         height: "12px",
         borderRadius: "13px",
         background: "#F3F3F6",
      },
      "& .MuiLinearProgress-bar": {
         borderRadius: "13px",
      },
   },
};

const CustomProgressBar = ({ data }) => {
   const percentage = useMemo(() => {
      const percent =
         (Number(data?.amount) / Number(data?.total)) * 100;
      return percent;
   }, [data]);
   return (
      <Box>
         <Box className="space-between">
            <Typography style={styles?.title}>
               {data?.title}
            </Typography>
            <Box style={styles?.valueBox}>
               <span style={styles?.title}>
                  {data?.amount}
                  {data?.unit}
               </span>
               <span style={styles?.slash}>/</span>
               <span
                  style={
                     data?.infinite
                        ? styles?.totalInfinite
                        : styles?.total
                  }
               >
                  {data?.infinite ? (
                     <AllInclusiveIcon />
                  ) : (
                     data?.endAmount
                  )}
                  {/* {data?.endAmount} */}
                  {/* {data?.unit} */}
               </span>
            </Box>{" "}
         </Box>
         <Box sx={styles?.progress}>
            <LinearProgress
               variant="determinate"
               value={percentage}
               sx={{
                  "& .MuiLinearProgress-bar": {
                     background: data?.color,
                  },
               }}
            />
         </Box>{" "}
      </Box>
   );
};

export default CustomProgressBar;
