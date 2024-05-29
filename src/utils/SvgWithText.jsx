import { Box, Typography } from "@mui/material";
import React from "react";

const SvgWithText = ({ src, text, height }) => {
   return (
      <Box
         sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            height: height ? height : "100%",
            rowGap: "1rem",
            minHeight: "200px",
         }}
      >
         <img src={src} />
         <Typography
            sx={{
               fontSize: "14px",
               fontWeight: "500",
               color: "#9D9CAF",
            }}
         >
            {text}
         </Typography>
      </Box>
   );
};

export default SvgWithText;
