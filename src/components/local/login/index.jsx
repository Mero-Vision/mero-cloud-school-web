import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth, useLoginMutation } from "../../../apis/authApi";
// import LoginImage from "../../../assets/login/Side.svg";
// import Right from "../../../assets/login/right.svg";
import Logo from "../../../assets/logo.png";
import CustomLoginButton from "../../common/CustomButton/CustomLoginButton";
import { CustomInputLogin } from "../../common/CustomInputs/CustomInputLogin";
import styles from "./styles";

const validationSchema = yup.object().shape({
   email: yup.string().required("Email is required"),
   password: yup.string().required("Password is required"),
});

const Login = () => {
   const classes = styles();
   return (
      <>
         {/* <Box className={classes.loginContainer}> */}
         <Box>
            {/* <Box className={classes.loginContents}>
               <Header />
               <LoginForm />
               <MainFooter />
            </Box> */}
            <Grid container spacing={0}>
               <Grid item lg={6} xs={12}>
                  <Box
                     sx={{
                        background:
                           "radial-gradient(ellipse at right top, #153448, #3C5B6F, #8FD4CB)",
                        height: "100%",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                        // justifyContent: "center",
                     }}
                  >
                     <Box sx={{ padding: "0px 80px 0px 130px" }}>
                        <Box
                           sx={{
                              position: "absolute",
                              top: "50px",
                              left: "130",
                           }}
                        >
                           <Box sx={{ width: "56px" }}>
                              <img
                                 src={Logo}
                                 alt=""
                                 style={{
                                    width: "100%",
                                    height: "100%",
                                 }}
                              />
                           </Box>
                        </Box>
                        <Typography
                           sx={{
                              color: "white",
                              fontSize: "80px",
                              fontWeight: "300",
                           }}
                        >
                           Welcome to
                           <Box sx={{ fontWeight: "600" }}>Mero School</Box>
                        </Typography>
                     </Box>
                  </Box>
               </Grid>
               <Grid item lg={6} xs={12}>
                  <LoginForm />
               </Grid>
            </Grid>
            {/* <Box className="left">
               <img src={Left} />
            </Box>
            <Box className="right">
               <img src={Right} />
            </Box> */}
         </Box>
      </>
   );
};

export default Login;

const Header = () => {
   const classes = styles();
   return (
      <Box className={classes.header}>
         <Box className="logoDiv">
            <img src={Logo} />
            <Typography className="title">Mero School</Typography>
         </Box>
         {/* <Box className="singupDiv">
            <Typography>Don't have an account?</Typography>
            <Typography className="singup">Signup</Typography>
         </Box> */}
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

const LoginForm = () => {
   const classes = styles();
   const {
      control,
      formState: { errors },
      handleSubmit,
   } = useForm({ resolver: yupResolver(validationSchema) });

   const navigate = useNavigate();
   const [fullfilledData, setFullfiledData] = useState();
   // console.log({ navigate });
   const [
      login,
      {
         isError,
         isLoading,
         isSuccess,
         error: loginErrors,
         data: successData,
      },
   ] = useLoginMutation();

   const handleNavigate = (res) => {
      const checkRole = (roleToFind) => {
         const data = res?.user?.role?.find(
            (item) =>
               item?.toLowerCase() === roleToFind?.toLowerCase()
         );
         return data ? true : false;
      };
      navigate("/switch-branch");

      // if (checkRole("accountingfirm")) {
      // } else if (checkRole("company")) {
      //   navigate("/");
      //   localStorage.setItem("company", JSON.stringify(res?.user));
      // }
   };

   const dispatch = useDispatch();

   const onSubmit = async (values) => {
      const finalValues = {
         ...values,
      };

      login(finalValues)
         ?.unwrap()
         .then((res) => {
            const auth_token = res?.data?.token;
            const refresh_token = res?.data?.refresh_token;
            const user = res?.data?.user;
            const business_service =
               res?.data?.user?.company?.services;
            localStorage.setItem(
               "account_access_token",
               auth_token || ""
            );
            localStorage.setItem(
               "account_refresh_token",
               refresh_token || ""
            );
            localStorage.setItem("user", JSON.stringify(user) || "");
            localStorage.setItem(
               "business_service",
               JSON.stringify(business_service) || []
            );
            dispatch(auth(res?.data));
            setFullfiledData(res?.data);

            if (
               !res?.data?.user?.roles?.includes("admin") &&
               !res?.data?.user?.permissions?.includes(
                  "company-panel-view"
               ) &&
               res?.data?.user?.permissions?.includes(
                  "company-pos-view"
               )
            ) {
               navigate("/pos");
               localStorage.setItem(
                  "company",
                  JSON.stringify(res?.data?.user?.branches?.[0]) || ""
               );
               localStorage.setItem(
                  "is_company",
                  JSON.stringify(true) || ""
               );
            } else if (
               !res?.data?.user?.roles?.includes("admin") &&
               !res?.data?.user?.permissions?.includes(
                  "company-panel-view"
               ) &&
               !res?.data?.user?.permissions?.includes(
                  "company-pos-view"
               )
            ) {
               navigate("/switch-branch");
            } else if (
               res?.data?.user?.roles?.includes("admin") &&
               res?.data?.user?.permissions?.includes(
                  "company-panel-view"
               ) &&
               res?.data?.user?.branches?.length > 1
            ) {
               navigate("/switch-branch");
            } else if (
               (res?.data?.user?.roles?.includes("admin") ||
                  res?.data?.user?.permissions?.includes(
                     "company-panel-view"
                  )) &&
               res?.data?.user?.branches?.length === 1
            ) {
               navigate("/dashboard");
               localStorage.setItem(
                  "company",
                  JSON.stringify(res?.data?.user?.branches?.[0]) || ""
               );
               localStorage.setItem(
                  "is_company",
                  JSON.stringify(true) || ""
               );
            } else {
               navigate("/switch-branch");
            }
         })
         .catch((rejected) => console.log({ rejected }));
   };

   useEffect(() => {
      localStorage?.getItem("account_access_token") && navigate("/");
   }, [localStorage?.getItem("account_access_token")]);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Box className={classes.mainDiv}>
            <Box className="formDiv">
               <Box flex={1}>
                  <Box className={classes.form}>
                     <Box className={"formTitleDiv"}>
                        <Typography className={"formTitle"}>
                           Login
                        </Typography>
                        <Typography className={"formSubtitle"}>
                           Welcome back! Please login to your account
                        </Typography>
                     </Box>
                     <Box>
                        <Box>
                           <CustomInputLogin
                              control={control}
                              errors={errors}
                              name="email"
                              type={"email"}
                              title="Email Address"
                              loginInput
                              // placeholder="darrellsteward@gmail.com"
                           />
                        </Box>

                        <Box mt={"24px"} mb={"10px"}>
                           <CustomInputLogin
                              control={control}
                              errors={errors}
                              name="password"
                              type={"password"}
                              title="Password"
                              loginInput
                              // forgotPassword
                           />
                        </Box>
                     </Box>
                     <Box
                        sx={{
                           textAlign: "end !important",
                        }}
                     >
                        <Typography
                           onClick={() =>
                              navigate("/forgot-password")
                           }
                           sx={{
                              color: "#4E7683",
                              fontSize: "12px",
                              cursor: "pointer",
                           }}
                        >
                           Forgot Password?
                        </Typography>
                     </Box>
                     <Box
                        className={"buttonDiv"}
                        mt={"35px"}
                        mb={"50px"}
                     >
                        <CustomLoginButton
                           buttonName={"Login"}
                           loading={isLoading}
                           error={loginErrors}
                           success={isSuccess}
                           successData={successData}
                           justifyContent={"start"}
                        />
                     </Box>
                     <Box className="helpDiv">
                        <Typography>Need assistance?</Typography>
                        <Typography className="help">
                           Contact
                        </Typography>
                     </Box>
                  </Box>
               </Box>
            </Box>
            <Box
               sx={{
                  position: "absolute",
                  bottom: "20px",
                  // right: "20px",
               }}
            >
               <Box>
                  <Typography
                     sx={{ fontSize: "10px", color: "#8a8a8a" }}
                  >
                     Copyright © 2024 Mero School. All rights reserved.
                  </Typography>
               </Box>
            </Box>
            {/* <Box
               sx={{
                  position: "absolute",
                  bottom: "20px",
                  right: "20px",
               }}
            >
               <Box>
                  <Typography
                     sx={{ fontSize: "12px", color: "#8a8a8a" }}
                  >
                     Powered by Mero School
                  </Typography>
               </Box>
            </Box> */}
         </Box>
      </form>
   );
};
