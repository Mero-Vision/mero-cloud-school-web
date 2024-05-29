import { yupResolver } from "@hookform/resolvers/yup";
import { Grid } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePostFolderMutation } from "../../../apis/folderApi";
import CustomButton from "../CustomButton/CustomButton";
import { CustomInput } from "../CustomInputs/CustomInput";
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Folder Name is required")
    .typeError("Folder Name is required"),
});

const CreateFolder = ({ handleClose, id }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(validationSchema) });
  const [
    postFolder,
    {
      error,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
      data: successData,
    },
  ] = usePostFolderMutation();

  const onSubmit = (data) => {
    const finalData = { parent_id: id, ...data };
    postFolder(finalData);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomInput
            control={control}
            errors={errors}
            name="name"
            placeholder="Folder 1"
            title="Folder Name"
            required
          />
        </Grid>
      </Grid>
      <CustomButton
        loading={isPostLoading}
        error={error}
        success={isPostSuccess}
        successData={successData}
        handleClose={handleClose}
      />
    </form>
  );
};

export default CreateFolder;
