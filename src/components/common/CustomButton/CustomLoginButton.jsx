import { Box, Button, CircularProgress } from "@mui/material";
import React, { useEffect } from "react";
import customToaster from "../../../utils/customToaster";
import { getError } from "../../../utils/helpers";

const CustomLoginButton = ({
   pos,
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
            sx={
               pos
                  ? {
                       backgroundColor: "#FF9E2A",
                       "&:hover": {
                          backgroundColor: "#FF9E2A",
                       },
                    }
                  : {
                       height: "50px !important",
                       backgroundColor: "#203F53 !important",
                       "&:hover": {
                          backgroundColor: "#304F63 !important",
                       },
                    }
            }
            variant={variant || "contained"}
            type={type || "submit"}
            disabled={disabled || loading}
            onClick={handleClick}
            fullWidth={fullWidth}
         >
            {loading && (
               <CircularProgress
                  size="1rem"
                  sx={{ marginRight: "10px", color: "#496ad0" }}
               />
            )}
            {buttonName || "Save"}
         </Button>{" "}
      </Box>
   );
};

export default CustomLoginButton;
