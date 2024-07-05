import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
  useAssignCompanyAdminMutation,
  useCreateCompanyUserMutation,
} from "../../../../apis/companyApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Address is required"),
});

const AddCompanyAdmin = ({ row, handleClose }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const [createUser, { isLoading, error, isSuccess, data: successData }] =
    useCreateCompanyUserMutation();
  const [assignAdmin, {}] = useAssignCompanyAdminMutation();

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      company_id: row?.id,
    };
    createUser(finalData);
  };

  useEffect(() => {
    const data = {
      user_id: successData?.data?.id,
      company_id: row?.id,
    };
    isSuccess && assignAdmin(data);
  }, [isSuccess]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item sm={12}>
          <CustomInput
            control={control}
            errors={errors}
            name="name"
            title="Name"
            required
          />
        </Grid>

        <Grid item sm={12}>
          <CustomInput
            control={control}
            errors={errors}
            name="email"
            title="Email"
            type="email"
            required
          />
        </Grid>
      </Grid>

      <CustomButton
        loading={isLoading}
        success={isSuccess}
        error={error}
        successData={successData}
        handleClose={handleClose}
      />
    </form>
  );
};

export default AddCompanyAdmin;
