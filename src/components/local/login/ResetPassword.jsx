import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { useResetPasswordMutation } from "../../../apis/authApi";
import useQuery from "../../../hooks/useQuery";
import CustomButton from "../../common/CustomButton/CustomButton";
import { CustomInput } from "../../common/CustomInputs/CustomInput";
import styles from "./styles";

const schema = Yup.object().shape({
  password: Yup.string().required("Password is required"),
  password_confirmation: Yup.string()
    .required("Please re-type your password")
    .oneOf([Yup.ref("password")], "Passwords do not match. Please try again."),
});

const ResetPassword = ({}) => {
  const classes = styles();
  const navigate = useNavigate();
  const { query: token } = useQuery("token");
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema), mode: "all" });

  const [resetPassword, { isLoading, isSuccess, error, data: successData }] =
    useResetPasswordMutation();

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      token,
    };

    resetPassword(finalData);
  };

  useEffect(() => {
    isSuccess && navigate("/login");
  }, [isSuccess]);

  console.log({ errors });
  return (
    <Box className={classes.container}>
      <Box className={classes.paper}>
        <Box style={{ padding: "40px" }}>
          <h3 style={{ marginBottom: "40px" }}>Reset Password</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
              <Grid item sm={12}>
                <CustomInput
                  control={control}
                  errors={errors}
                  name="password"
                  title="Password"
                  required
                  type="password"
                />
              </Grid>
              <Grid item sm={12}>
                <CustomInput
                  control={control}
                  errors={errors}
                  name="password_confirmation"
                  title="Confirm Password"
                  required
                  type="password"
                />
              </Grid>
            </Grid>

            <CustomButton
              loading={isLoading}
              success={isSuccess}
              error={error}
              successData={successData}
            />
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPassword;
