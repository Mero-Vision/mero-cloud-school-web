import { LockOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useForgotPasswordMutation } from "../../../apis/authApi";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";
import styles from "./styles";

const ForgotPassword = () => {
   const classes = styles();
   const navigate = useNavigate();

   const [
      forgotPassword,
      {
         isError,
         isLoading,
         isSuccess,
         error: forgotError,
         data: successData,
      },
   ] = useForgotPasswordMutation();
   const {
      control,
      formState: { errors },
      handleSubmit,
      watch,
   } = useForm();

   useEffect(() => {
      isSuccess &&
         navigate(`/reset-password?email=${watch("email")}`);
   }, [isSuccess]);
   const onSubmit = (data) => {
      forgotPassword(data);
   };

   return (
      <form
         onSubmit={handleSubmit(onSubmit)}
         className={classes.forgotDiv}
      >
         <Box className={classes.layoutDiv}>
            {" "}
            <Typography className="Title">
               Forgot Password?
            </Typography>{" "}
            <IconButton
               style={{
                  backgroundColor: "#6A86D8",
                  width: "52px",
                  height: "52px",
               }}
            >
               <LockOutlined style={{ color: "#fff" }} />
            </IconButton>
            <Box>
               <Typography className="Subtitle">
                  Enter email address associated with your account.
               </Typography>
               <Typography className="Message">
                  We will send you verification code to reset your
                  password.
               </Typography>
            </Box>
            <Box width={"100%"}>
               <CustomInput
                  name="email"
                  control={control}
                  errors={errors}
                  type="email"
                  placeholder={"Enter email address"}
               />
            </Box>
            <Box className={classes.emailButton} width={"100%"}>
               <CustomButton
                  fullWidth
                  buttonName={"Send"}
                  margin={"0"}
                  loading={isLoading}
                  success={isSuccess}
                  successData={successData}
                  error={forgotError}
               />
            </Box>
         </Box>
      </form>
   );
};

export default ForgotPassword;
