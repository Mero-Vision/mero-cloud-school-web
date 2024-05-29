import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, InputLabel, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
} from "../../../apis/authApi";
import useQuery from "../../../hooks/useQuery";
import customToaster from "../../../utils/customToaster";
import { getCharacterValidationError, getError } from "../../../utils/helpers";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";
import OTP from "./OTP";
import styles from "./styles";

const schema = Yup.object().shape({
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
      typeof originalValue === "string" ? originalValue.trim() : originalValue
    )
    .oneOf([Yup.ref("password")], "Passwords do not match"),
});

const ResetPasswordNew = ({}) => {
  const classes = styles();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [sent, setSent] = useState(false);
  const [time, setTime] = useState(30);
  const { query: email } = useQuery("email");
  const { query: token } = useQuery("token");
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const [resetPassword, { isLoading, isSuccess, error, data: successData }] =
    useResetPasswordMutation();
  const [
    forgotPassword,
    {
      isLoading: isForgotLoading,
      isSuccess: isForgotSuccess,
      error: forgotError,
      data: forgotSuccessData,
    },
  ] = useForgotPasswordMutation();

  useEffect(() => {
    if (isForgotSuccess) {
      customToaster({
        type: "success",
        message: forgotSuccessData?.message || "Success",
      });
    }
  }, [isForgotSuccess]);
  useEffect(() => {
    getError(forgotError);
  }, [forgotError]);

  const handleSend = () => {
    if (!sent) {
      forgotPassword({ email });
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

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      token: otp?.join(""),
      email,
    };

    resetPassword(finalData);
  };

  useEffect(() => {
    isSuccess && navigate("/login");
  }, [isSuccess]);

  useEffect(() => {
    if (token) {
      setOtp(Array.from(String(token)));
    }
  }, [token]);
  return (
    <Box className={classes.forgotDiv}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.layoutDiv}>
          <Typography className="Title">Reset Password</Typography>{" "}
          <Grid container spacing={3} sx={{ textAlign: "start" }}>
            <Grid item xs={12}>
              <CustomInput
                control={control}
                errors={errors}
                name="password"
                title="New Password"
                required
                type="password"
                //placeholder="DarrellSteward"
              />
            </Grid>
            <Grid item xs={12}>
              <CustomInput
                control={control}
                errors={
                  watch("password") === watch("password_confirmation")
                    ? {}
                    : errors
                }
                name="password_confirmation"
                title="Confirm Password"
                required
                type="password"
                //placeholder="DarrellSteward"
              />
            </Grid>
            <Grid item xs={12} className="inputs" textAlign={"start"}>
              <InputLabel className="inputTitle">OTP</InputLabel>
              <OTP otp={otp} setOtp={setOtp} />
            </Grid>
          </Grid>
          <Box className={classes.emailButton} width="100%">
            <CustomButton
              fullWidth
              buttonName={"Reset Password"}
              margin={"0"}
              loading={isLoading}
              success={isSuccess}
              error={error}
              successData={successData}
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
    </Box>
  );
};

export default ResetPasswordNew;
