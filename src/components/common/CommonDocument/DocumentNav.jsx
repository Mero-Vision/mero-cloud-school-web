import { CreateNewFolder, FileUpload, NavigateNext } from "@mui/icons-material";
import { Box, Breadcrumbs, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import useModal from "../../../hooks/useModal";
import CustomModal from "../CustomModal/CustomModal";
import CreateFile from "./CreateFile";
import CreateFolder from "./CreateFolder";
import styles from "./styles";

const DocumentNav = ({
  selected,
  breadcrumbs,
  setBreadCrumbs,
  id,
  handleFolderSelect,
}) => {
  const classes = styles();
  const navigate = useNavigate();
  const { modals, row, handleClose, handleOpen } = useModal();
  console.log({ breadcrumbs });
  const handleClick = (item, index) => {
    const crumbs = breadcrumbs?.slice(0, index);
    setBreadCrumbs(crumbs);
    handleFolderSelect(item);
  };
  return (
    <Box className={classes.documentNav}>
      <Box>
        <Breadcrumbs
          separator={<NavigateNext fontSize="small" />}
          aria-label="breadcrumb"
          className="breadcrumbs"
        >
          {breadcrumbs?.map((item, index) => (
            <Box
              className={breadcrumbs?.length - 1 === index && "last"}
              key={item?.name}
              onClick={() => handleClick(item, index)}
            >
              {item?.name}
            </Box>
          ))}{" "}
        </Breadcrumbs>

        {/* <CustomBreadcrumbs /> */}
      </Box>
      {/* {selected?.name?.toLowerCase() !== "company folder" &&
        breadcrumbs?.length > 1 && ( */}
      {(id || selected?.name?.toLowerCase() === "firm folder") && (
        <Box className={classes.buttons}>
          <Button
            startIcon={<FileUpload />}
            variant="outlined"
            className="fileUpload"
            onClick={() => handleOpen("file")}
          >
            Upload File
          </Button>
          <Button
            startIcon={<CreateNewFolder />}
            variant="contained"
            className="folderUpload"
            onClick={() => handleOpen("folder")}
          >
            Create Folder
          </Button>
        </Box>
      )}

      <CustomModal
        open={modals?.file}
        handleClose={() => handleClose("file")}
        modalTitle={`Upload File`}
        icon={<FileUpload />}
        width={"450px"}
      >
        {<CreateFile handleClose={() => handleClose("file")} id={id} />}
      </CustomModal>
      <CustomModal
        open={modals?.folder}
        handleClose={() => handleClose("folder")}
        modalTitle={`Create Folder`}
        icon={<CreateNewFolder />}
        width={"450px"}
      >
        {<CreateFolder handleClose={() => handleClose("folder")} id={id} />}
      </CustomModal>
      {/* )} */}
    </Box>
  );
};

export default DocumentNav;
