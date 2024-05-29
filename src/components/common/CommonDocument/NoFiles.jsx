import { FileUpload } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import uploadfile from "../../../assets/uploadfile.svg";
import useModal from "../../../hooks/useModal";
import CustomModal from "../CustomModal/CustomModal";
import CreateFile from "./CreateFile";
import styles from "./styles";
const NoFiles = ({ id }) => {
  const classes = styles();

  const { modals, row, handleClose, handleOpen } = useModal();

  return (
    <>
      <Box className={classes.nofiles}>
        <Box className="icon">
          <img src={uploadfile} />
        </Box>
        <Typography className="text">You currently have no files</Typography>
        <Box className={classes.buttons} mt={2}>
          <Button
            startIcon={<FileUpload />}
            variant="outlined"
            className="fileUpload"
            onClick={() => handleOpen("file")}
          >
            Upload File
          </Button>
        </Box>
      </Box>
      <CustomModal
        open={modals?.file}
        handleClose={() => handleClose("file")}
        modalTitle={`Upload File`}
        icon={<FileUpload />}
        width={"450px"}
      >
        {<CreateFile handleClose={() => handleClose("file")} id={id} />}
      </CustomModal>
    </>
  );
};

export default NoFiles;
