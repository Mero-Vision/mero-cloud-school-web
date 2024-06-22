import { Box, Typography } from "@mui/material";
import React from "react";
import styles from "./styles";

const PaymentMethodDetails = ({ row }) => {
   const classes = styles();
   return (
      <Box sx={{ width: "325px" }}>
         {row &&
            row?.map((item, index) => (
               <Box
                  key={index}
                  sx={{
                     alignItems: "center",
                     padding: "10px 20px",
                     cursor: "pointer",
                     transition: "0.2s ease-in-out",
                     borderRadius: "8px",
                     "&:hover": {
                        backgroundColor: "#e7e8e8",
                     },
                  }}
               >
                  <Typography
                     sx={{
                        width: "100%",
                        fontWeight: 400,
                        fontSize: "18px",
                        color: "#0a3a84",
                        lineHeight: 1,
                     }}
                  >
                     {item?.title}
                  </Typography>
                  <Box
                     sx={{
                        alignItems: "end !important",
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#020c1c",
                     }}
                  >
                     {item?.subtitle}
                  </Box>
               </Box>
            ))}
      </Box>
   );
};

export default PaymentMethodDetails;
