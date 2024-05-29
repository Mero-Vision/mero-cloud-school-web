import { Alert, AlertTitle, Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
   useResendEmailMutation,
   useVerifyAccountMutation,
} from "../../../apis/authApi";
import useQuery from "../../../hooks/useQuery";
import CustomButton from "../../common/CustomButton/CustomButton";
import OTP from "./OTP";
import styles from "./styles";

const ResendEmail = () => {
   const classes = styles();
   const navigate = useNavigate();
   const [otp, setOtp] = useState(new Array(6).fill(""));
   const [sent, setSent] = useState(false);
   const [time, setTime] = useState(30);
   const { query: email } = useQuery("email");
   const [
      resendEmail,
      {
         isError,
         isLoading,
         isSuccess,
         error: resendError,
         data: successData,
      },
   ] = useResendEmailMutation();
   const [
      verifyAccount,
      {
         isLoading: isVerifyLoading,
         isSuccess: isVerifySuccess,
         error: verifyErrors,
         data: verifySuccessData,
      },
   ] = useVerifyAccountMutation();

   const handleSend = () => {
      if (!sent) {
         resendEmail({ email });
      }
      setSent(true);
   };

   useEffect(() => {
      if (sent) {
         const timeout = setTimeout(() => {
            setSent(false);
         }, 30000);
         return () => clearTimeout(timeout);
      }
   }, [sent]);
   useEffect(() => {
      if (sent) {
         const interval = setInterval(() => {
            setTime((prev) => prev - 1);
         }, 1000);
         return () => clearInterval(interval);
      }
      setTime(30);
   }, [sent]);
   const onSubmit = (e) => {
      e.preventDefault();
      const data = {
         email,
         token: otp?.join(""),
      };

      verifyAccount(data);
   };
   useEffect(() => {
      isVerifySuccess && navigate("/login");
   }, [isVerifySuccess]);

   return (
      <form onSubmit={onSubmit} className={classes.emailDiv}>
         {/* <Box className={classes.emailHeader}>
        <Email />
      </Box> */}
         <Box className={classes.emailBody} sx={{ rowGap: "38px" }}>
            <Box>
               <Typography className="check">
                  Check your email
               </Typography>
               <Typography className="info">
                  We've just sent an OTP to{" "}
                  <span
                     style={{ color: "#496AD0", fontWeight: "500" }}
                  >
                     {email}
                  </span>
                  .<br></br> Verify your email address and we'll get
                  you all set up!
               </Typography>
               {sent &&
                  (resendError ? (
                     <Box mt={"20px"}>
                        <Alert severity="error">
                           <AlertTitle>Error</AlertTitle>
                           {resendError?.data?.message ||
                              "There was an error."}{" "}
                        </Alert>
                     </Box>
                  ) : (
                     isSuccess && (
                        <Box
                           className={classes.confirmation}
                           mt={"20px"}
                        >
                           <Typography
                              gutterBottom
                              className="confirmTitle"
                           >
                              OTP resent!
                           </Typography>
                           <Typography className="confirmInfo">
                              We've sent you another OTP in your
                              email.
                           </Typography>
                        </Box>
                     )
                  ))}
            </Box>
            <Box>
               <OTP otp={otp} setOtp={setOtp} />
            </Box>

            <Box className={classes.emailButton}>
               <CustomButton
                  fullWidth
                  buttonName={"Verify Account"}
                  margin={"0"}
                  loading={isVerifyLoading}
                  success={isVerifySuccess}
                  successData={verifySuccessData}
                  error={verifyErrors}
               />

               <Box className={"time"}>
                  <Box>
                     {sent && (
                        <Typography className="remaining">
                           {time}s remaining
                        </Typography>
                     )}
                  </Box>
                  <Box>
                     <Typography
                        component={"span"}
                        sx={{ color: "#4C4B63", fontWeight: 300 }}
                     >
                        OTP not got yet?{" "}
                     </Typography>
                     <Typography
                        component={"span"}
                        onClick={handleSend}
                        sx={
                           sent
                              ? { color: "#D1D1DB" }
                              : {
                                   color: "#496AD0",
                                   cursor: "pointer",
                                   textDecoration: "underline",
                                }
                        }
                     >
                        Resend
                     </Typography>
                  </Box>
               </Box>
            </Box>
         </Box>
      </form>
   );
};

export default ResendEmail;
