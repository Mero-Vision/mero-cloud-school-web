import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { auth, useLoginMutation } from "../../../apis/authApi";
// import LoginImage from "../../../assets/login/Side.svg";
// import Right from "../../../assets/login/right.svg";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ImportContactsRoundedIcon from "@mui/icons-material/ImportContactsRounded";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import Logo from "../../../assets/meroSchoolLogo.png";
import CustomLoginButton from "../../common/CustomButton/CustomLoginButton";
import { CustomInputLogin } from "../../common/CustomInputs/CustomInputLogin";
import styles from "./styles";
const validationSchema = yup.object().shape({
   email: yup.string().required("Email is required"),
   password: yup.string().required("Password is required"),
});

const Login = () => {
   const navigate = useNavigate();
   const classes = styles();
   const isMobile = window.innerWidth < 900; //Add the width you want to check for here (now 768px)

   const loginInfoData = [
      {
         title: "Visit our support center",
         subtitle: "Get guidance from our Support team.",
         icon: (
            <Box className={classes.iconBox}>
               <ImportContactsRoundedIcon
                  className={classes.iconBoxImg}
               />
            </Box>
         ),
         url: "/",
      },
      {
         title: "View our Product Roadmap",
         subtitle: "Browse and vote what's next.",
         icon: (
            <Box className={classes.iconBox}>
               <AccessTimeRoundedIcon
                  className={classes.iconBoxImg}
               />
            </Box>
         ),
         url: "/",
      },
      {
         title: "Check out the latest releases",
         subtitle: "See new features and updates.",
         icon: (
            <Box className={classes.iconBox}>
               <UploadFileOutlinedIcon
                  className={classes.iconBoxImg}
               />
            </Box>
         ),
         url: "/",
      },
      {
         title: "Join our community",
         subtitle: "Discuss with with thousands of users.",
         icon: (
            <Box className={classes.iconBox}>
               <PeopleAltOutlinedIcon
                  className={classes.iconBoxImg}
               />
            </Box>
         ),
         url: "/",
      },
   ];

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
               <Grid item md={6} sm={12} sx={{ width: "100%" }}>
                  <LoginForm />
               </Grid>
               <Grid item md={6} sm={12} sx={{ width: "100%" }}>
                  <Box className={classes.grid2}>
                     <Box className={classes.grid2Wrap}>
                        {loginInfoData?.map((item, index) => (
                           <Box
                              onClick={() => navigate(item?.url)}
                              key={index}
                              className={classes.infoCard}
                           >
                              <Box className={classes.infoCardG1}>
                                 {item?.icon}
                                 <Box>
                                    <Box
                                       className={
                                          classes.grid2BoxTitle
                                       }
                                    >
                                       {item?.title}
                                    </Box>
                                    <Box
                                       className={
                                          classes.grid2BoxSubtitle
                                       }
                                    >
                                       {item?.subtitle}
                                    </Box>
                                 </Box>
                              </Box>

                              <ArrowForwardIcon
                                 className={classes.arrowIcon}
                              />
                           </Box>
                        ))}
                     </Box>
                  </Box>
               </Grid>
            </Grid>
         </Box>
      </>
   );
};

export default Login;

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
            const institution = res?.data?.institution;
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
               "institution",
               JSON.stringify(institution) || ""
            );
            localStorage.setItem(
               "business_service",
               JSON.stringify(business_service) || []
            );
            dispatch(auth(res?.data));
            setFullfiledData(res?.data);

            navigate("/dashboard");
         })
         .catch((rejected) => console.log({ rejected }));
   };

   // useEffect(() => {
   //    localStorage?.getItem("account_access_token") && navigate("/");
   // }, [localStorage?.getItem("account_access_token")]);

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         <Box className={classes.mainDiv}>
            <Box className={classes.formDiv}>
               <Box>
                  <Box className={classes.form}>
                     <Box className={"formTitleDiv"}>
                        <Box
                           sx={{
                              display: "flex",
                              justifyContent: "center",
                              // marginTop: "-30px",
                           }}
                        >
                           <Box
                              onClick={() => navigate("/")}
                              sx={{
                                 width: "150px",
                                 height: "100%",
                                 cursor: "pointer",
                              }}
                           >
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
                        <Box className={"formTitle"}>
                           Welcome back{" "}
                        </Box>
                        <Box className={"formSubtitle"}>
                           Login to Mero Cloud School CMS
                        </Box>
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
                        mt={"25px"}
                        mb={"25px"}
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
                     {/* <Box className="helpDiv">
                        <Typography>Need assistance?</Typography>
                        <Typography className="help">
                           Contact
                        </Typography>
                     </Box> */}
                  </Box>
               </Box>
            </Box>
            {/* <Box
               sx={{
                  position: "absolute",
                  bottom: "20px",
               }}
            >
               <Box>
                  <Typography
                     sx={{ fontSize: "10px", color: "#8a8a8a" }}
                  >
                     Copyright © 2024 Mero School. All rights
                     reserved.
                  </Typography>
               </Box>
            </Box> */}
         </Box>
      </form>
   );
};
