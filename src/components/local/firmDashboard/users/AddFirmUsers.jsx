import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useCreateFirmUserMutation } from "../../../../apis/accountingFirmApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";

const schema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email Address is required"),
});

const AddFirmUsers = ({ handleClose }) => {
  const { company } = useSelector((state) => state?.utils);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const [createUser, { isLoading, error, isSuccess, data: successData }] =
    useCreateFirmUserMutation();

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      company_id: company?.id,
      // accounting_firm_id:id
    };
    createUser(finalData);
  };
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

export default AddFirmUsers;
