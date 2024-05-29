import { Box, Grid } from "@mui/material";
import React from "react";

const CustomGrid = ({ info, details, left, right }) => {
   return (
      <Box>
         <Grid container spacing={4}>
            <Grid item xs={left || 3}>
               {info}
            </Grid>
            <Grid item xs={right || 9}>
               {details}{" "}
            </Grid>
         </Grid>
      </Box>
   );
};

export default CustomGrid;
