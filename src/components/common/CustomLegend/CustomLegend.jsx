import { Box, Typography } from "@mui/material";
import React from "react";

const styles = {
   text: {
      color: "#6C6B80",
      fontSize: "13px",
   },
   dot: {
      height: "8.376px",
      width: "8.376px",
      borderRadius: "50%",
   },
   container: {
      display: "flex",
      columnGap: "7px",
      alignItems: "center",
   },
};

const CustomLegend = ({ text = "", color }) => {
   return (
      <Box style={styles?.container}>
         <Box style={{ ...styles.dot, background: color }} />
         <Box>
            {" "}
            <Typography style={styles?.text}>
               {text || "-"}
            </Typography>
         </Box>
      </Box>
   );
};

export default CustomLegend;
