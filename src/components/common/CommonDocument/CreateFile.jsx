import { yupResolver } from "@hookform/resolvers/yup";
import { RemoveCircle, Upload } from "@mui/icons-material";
import { Box, Grid, InputLabel, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { usePostFilesMutation } from "../../../apis/folderApi";
import CustomButton from "../CustomButton/CustomButton";
import CustomFileUpload from "../CustomFileUpload/CustomFileUpload";
import { CustomInput } from "../CustomInputs/CustomInput";
import styles from "./styles";
const validationSchema = yup.object().shape({
  name: yup
    .string()
    .required("File Name is required")
    .typeError("File Name is required"),
});

const CreateFile = ({ handleClose, id }) => {
  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    setValue,
  } = useForm({ resolver: yupResolver(validationSchema) });
  const [
    postFile,
    {
      error,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
      data: successData,
    },
  ] = usePostFilesMutation();
  useEffect(() => {
    watch("file")?.[0]?.name && setValue("name", watch("file")?.[0]?.name);
  }, [watch("file")]);
  const onSubmit = (data) => {
    const formData = new FormData();

    const finalData = {
      name: data?.name,
      _method: "PUT",
      file: data?.file?.[0] ?? "",
    };
    finalData &&
      Object?.keys(finalData)?.map((key) =>
        formData.append(key, finalData?.[key] ?? "")
      );
    postFile({ data: formData, id });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <CustomFileUpload
            control={control}
            errors={errors}
            name="file"
            fileComponent={<FileUpload />}
          />
          {watch("file") &&
            Object.values(watch("file"))?.map((item, index) => (
              <Box key={item?.name}>
                {" "}
                <Typography
                  component={"span"}
                  sx={{ fontSize: "12px", color: "#496AD0" }}
                >
                  {item?.name}
                </Typography>
                <RemoveCircle
                  onClick={() => setValue("file", {})}
                  sx={{
                    color: "#D24848",
                    cursor: "pointer",
                    verticalAlign: "middle",
                    marginLeft: "5px",
                  }}
                />
              </Box>
            ))}
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            control={control}
            errors={errors}
            name="name"
            placeholder="File 200"
            title="File Name"
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

export default CreateFile;

const FileUpload = () => {
  const classes = styles();
  return (
    <Box className="inputs">
      <InputLabel className="inputTitle">ADD FILE</InputLabel>
      <Box className={classes.fileUpload}>
        <Upload />
        <Box>
          <Typography>Choose a file to upload</Typography>
        </Box>
      </Box>
    </Box>
  );
};
