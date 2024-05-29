import { Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import customToaster from "../../../utils/customToaster";
import { getError } from "../../../utils/helpers";

const CustomPillButton = ({
   type,
   variant,
   buttonName,
   loading,
   justifyContent,
   handleClick,
   success,
   disabled,
   error,
   successData,
   handleClose = () => {},
   margin,
   fullWidth,
}) => {
   useEffect(() => {
      if (success) {
         customToaster({
            type: "success",
            message: successData?.message || "Success",
         });
         handleClose && handleClose();
      }
   }, [success]);
   useEffect(() => {
      getError(error);
   }, [error]);

   return (
      <Box
         display={"flex"}
         justifyContent={justifyContent || "end"}
         marginTop={margin || "17px"}
      >
         <Button
            sx={{
               backgroundColor: "#FF9129",
               borderRadius: "6px",
               padding: "0px 20px !important",
               "&:hover": {
                  backgroundColor: "#FF9129",
               },
            }}
            variant={variant || "contained"}
            type={type || "submit"}
            disabled={disabled || loading}
            onClick={handleClick}
            fullWidth={fullWidth}
         >
            {loading && (
               <CircularProgress
                  size="1rem"
                  sx={{
                     marginRight: "10px",
                     color: "#FF9129",
                  }}
               />
            )}
            {buttonName || "Save"}
         </Button>{" "}
      </Box>
   );
};

export default CustomPillButton;
