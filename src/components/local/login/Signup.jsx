import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useSignupMutation } from "../../../apis/authApi";
import Left from "../../../assets/login/left.svg";
import LoginImage from "../../../assets/login/login.svg";
import Right from "../../../assets/login/right.svg";
import Logo from "../../../assets/logo.png";
import { getCharacterValidationError } from "../../../utils/helpers";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";
import styles from "./styles";

const Signup = () => {
   const classes = styles();
   return (
      <>
         <Box className={classes.loginContainer}>
            <Box className={classes.loginContents}>
               <Header />
               <LoginForm />
               <Footer />
            </Box>
            <Box className="left">
               <img src={Left} />
            </Box>
            <Box className="right">
               <img src={Right} />
            </Box>
         </Box>
      </>
   );
};

export default Signup;

const Header = () => {
   const navigate = useNavigate();
   const classes = styles();
   return (
      <Box className={classes.header}>
         <Box className="logoDiv">
            <img src={Logo} />
            <Typography className="title">Mero School</Typography>
         </Box>
         <Box className="singupDiv">
            <Typography>Already have an account?</Typography>
            <Typography
               className="singup"
               onClick={() => navigate("/login")}
            >
               Sign In
            </Typography>
         </Box>
      </Box>
   );
};
const Footer = () => {
   const classes = styles();
   return (
      <Box className={classes.footer}>
         <Box>
            <Typography>Mero School copyright© 2023</Typography>
         </Box>
         <Box>
            <Typography>Powered by Mero School Pvt.Ltd</Typography>
         </Box>
      </Box>
   );
};

const schema = Yup.object().shape({
   name: Yup.string().required("Name is required"),
   email: Yup.string()
      .email("Invalid email address")
      .required("Email Address is required"),
   password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be 8 characters or more")
      .matches(/[a-z]+/, getCharacterValidationError("lowercase"))
      .matches(/[A-Z]+/, getCharacterValidationError("uppercase"))
      .matches(/[@$!%*#?&]+/, getCharacterValidationError("special"))
      .matches(/\d+/, "Your password must contain at least 1 number"),
   password_confirmation: Yup.string()
      .required("Please re-type your password")
      .transform((value, originalValue) =>
         typeof originalValue === "string"
            ? originalValue.trim()
            : originalValue
      )
      .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const LoginForm = () => {
   const classes = styles();
   const {
      control,
      formState: { errors },
      handleSubmit,
      watch,
   } = useForm({ resolver: yupResolver(schema), mode: "all" });

   const navigate = useNavigate();
   const [fullfilledData, setFullfiledData] = useState();
   const [
      signup,
      {
         isError,
         isLoading,
         isSuccess,
         error: signupErrors,
         data: successData,
      },
   ] = useSignupMutation();

   const onSubmit = async (values) => {
      const finalValues = {
         ...values,
      };
      signup(finalValues);
   };
   useEffect(() => {
      if (isSuccess) {
         navigate(`/resend-email?email=${watch("email")}`);
      }
   }, [isSuccess]);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Box className={classes.mainDiv}>
            <Box className="formDiv">
               <Box
                  flex={1}
                  width={"635px"}
                  sx={{
                     "& img": {
                        width: "635px",
                     },
                     display: { xs: "none", md: "block" },
                  }}
               >
                  <img src={LoginImage} />
               </Box>
               <Box flex={1}>
                  <Box className={classes.form}>
                     <Box className={"formTitleDiv"}>
                        <Typography className={"formTitle"}>
                           Get started with Accounting!
                        </Typography>
                     </Box>
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <CustomInput
                              control={control}
                              errors={errors}
                              name="name"
                              type={"text"}
                              title="Full Name"
                              placeholder="Darell Steward"
                           />
                        </Grid>
                        <Grid item xs={12}>
                           <CustomInput
                              control={control}
                              errors={errors}
                              name="email"
                              type={"email"}
                              title="Email Address"
                              placeholder="darrellsteward@gmail.com"
                           />
                        </Grid>

                        <Grid item xs={12}>
                           <CustomInput
                              control={control}
                              errors={errors}
                              name="password"
                              type={"password"}
                              title="Password"
                              //placeholder="DarrellSteward"
                           />
                        </Grid>
                        <Grid item xs={12} mb={"10px"}>
                           <CustomInput
                              control={control}
                              errors={
                                 watch("password") ===
                                 watch("password_confirmation")
                                    ? {}
                                    : errors
                              }
                              name="password_confirmation"
                              type={"password"}
                              title="Confirm Password"
                              //placeholder="DarrellSteward"
                           />
                        </Grid>
                     </Grid>
                     <Box
                        className={"buttonDiv"}
                        mt={"35px"}
                        mb={"18px"}
                     >
                        <CustomButton
                           buttonName={"Sign Up"}
                           loading={isLoading}
                           error={signupErrors}
                           success={isSuccess}
                           successData={successData}
                           justifyContent={"start"}
                        />
                     </Box>
                     <Box className="helpDiv">
                        <Typography>Need any Help?</Typography>
                        <Typography className="help">
                           Contact Us
                        </Typography>
                     </Box>
                  </Box>
               </Box>
            </Box>
         </Box>
      </form>
   );
};
