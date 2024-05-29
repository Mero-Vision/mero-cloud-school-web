import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useForgotPasswordMutation } from "../../../apis/authApi";
import { useAcceptInvitationMutation } from "../../../apis/usersApi";
import useQuery from "../../../hooks/useQuery";
import customToaster from "../../../utils/customToaster";
import { getCharacterValidationError, getError } from "../../../utils/helpers";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";
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

const SetPassword = ({}) => {
  const classes = styles();
  const navigate = useNavigate();
  const { query: email } = useQuery("email");
  const { query: token } = useQuery("token");
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const [accept, { isLoading, isSuccess, error, data: successData }] =
    useAcceptInvitationMutation();
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

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      token,
      email,
    };

    accept(finalData);
  };

  useEffect(() => {
    isSuccess && navigate("/login");
  }, [isSuccess]);

  return (
    <Box className={classes.forgotDiv}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box className={classes.layoutDiv}>
          <Typography className="Title">Set Password</Typography>{" "}
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
          </Grid>
          <Box className={classes.emailButton} width="100%">
            <CustomButton
              fullWidth
              buttonName={"Set Password"}
              margin={"0"}
              loading={isLoading}
              success={isSuccess}
              error={error}
              successData={successData}
            />
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default SetPassword;
