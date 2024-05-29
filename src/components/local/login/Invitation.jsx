import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAcceptInvitationMutation } from "../../../apis/usersApi";
import useQuery from "../../../hooks/useQuery";
import customToaster from "../../../utils/customToaster";
import { getError } from "../../../utils/helpers";
import styles from "./styles";

const Invitation = () => {
   const classes = styles();
   const navigate = useNavigate();
   const { query: email } = useQuery("email");
   const { query: token } = useQuery("token");
   const { query: organization } = useQuery("organization");

   const [
      accept,
      {
         isLoading: isVerifyLoading,
         isSuccess: isVerifySuccess,
         error: verifyErrors,
         data: verifySuccessData,
      },
   ] = useAcceptInvitationMutation();

   useEffect(() => {
      isVerifySuccess && navigate("/login");
   }, [isVerifySuccess]);

   const handleSubmit = (e, is_accepted) => {
      e.preventDefault();
      const data = {
         email,
         token,
         is_accepted,
      };

      accept(data);
   };
   useEffect(() => {
      if (isVerifySuccess) {
         customToaster({
            type: "success",
            message: verifySuccessData?.message || "Success",
         });
      }
   }, [isVerifySuccess]);
   useEffect(() => {
      getError(verifyErrors);
   }, [verifyErrors]);

   return (
      <form className={classes.emailDiv}>
         {/* <Box className={classes.emailHeader}>
        <Email />
      </Box> */}
         <Box className={classes.emailBody} sx={{ rowGap: "38px" }}>
            <Box>
               <Typography className="check">Invitation</Typography>
               <Typography className="info">
                  <span
                     style={{ color: "#496AD0", fontWeight: "500" }}
                  >
                     {organization}{" "}
                  </span>
                  has invited you to join.<br></br>
                  Would you like to accept or decline this invitation?
               </Typography>
            </Box>
            <Box
               sx={{
                  display: "flex",
                  width: "100%",
                  columnGap: "10px",
                  flexDirection: "row",
               }}
               pb={2}
               className={isVerifyLoading && "disableClick"}
            >
               <Button
                  sx={{
                     border: "1px solid #E5E5EB",
                     color: "#FF452B",
                  }}
                  fullWidth
                  onClick={(e) => handleSubmit(e, false)}
               >
                  Decline
               </Button>
               <Button
                  variant="darkGreen"
                  fullWidth
                  onClick={(e) => handleSubmit(e, true)}
               >
                  Accept
               </Button>
            </Box>
         </Box>
      </form>
   );
};

export default Invitation;
