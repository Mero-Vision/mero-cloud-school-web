import { Cancel, Done } from "@mui/icons-material";
import { Box, CircularProgress, IconButton } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useRenameFilesMutation,
  useRenameFolderMutation,
} from "../../../../apis/folderApi";
import customToaster from "../../../../utils/customToaster";
import { getError } from "../../../../utils/helpers";
import { CustomInput } from "../../CustomInputs/CustomInput";
import styles from "../styles";

const Rename = ({ row, handleClose }) => {
  const classes = styles();
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({ defaultValues: { name: row?.name } });
  const [
    renameFile,
    {
      error,
      isLoading: isFileLoading,
      isSuccess: isFileSuccess,
      data: fileData,
    },
  ] = useRenameFilesMutation();
  const [
    renameFolder,
    {
      error: folderError,
      isLoading: isFolderLoading,
      isSuccess: isFolderSuccess,
      data: folderData,
    },
  ] = useRenameFolderMutation();
  const onSubmit = (data) => {
    const id = row?.id;
    const finalData = {
      ...data,
      _method: "PATCH",
    };
    row?.extension
      ? renameFile({ data: finalData, id })
      : renameFolder({ data: finalData, id });
  };

  useEffect(() => {
    if (isFolderSuccess || isFileSuccess) {
      customToaster({
        type: "success",
        message: fileData?.message || folderData?.message || "Success",
      });
    }
  }, [isFolderSuccess, isFileSuccess]);
  useEffect(() => {
    getError(error || folderError);
  }, [error, folderError]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box className={classes.rename}>
        <CustomInput control={control} errors={errors} name="name" />
        {isFileLoading || isFolderLoading ? (
          <Box className="buttons">
            <CircularProgress size="1rem" />
          </Box>
        ) : (
          <Box className="buttons">
            <IconButton size="small" onClick={handleClose}>
              <Cancel sx={{ color: "#F10056" }} />
            </IconButton>
            <IconButton size="small" type="submit">
              <Done sx={{ color: "#00c770" }} />
            </IconButton>
          </Box>
        )}
      </Box>
    </form>
  );
};

export default Rename;
