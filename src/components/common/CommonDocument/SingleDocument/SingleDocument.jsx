import {
  Delete,
  Edit,
  Folder,
  Image,
  InfoOutlined,
  PictureAsPdf,
} from "@mui/icons-material";
import { Box, CircularProgress, Tooltip, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import {
  useDeleteFileMutation,
  useDeleteFolderMutation,
  useGetMediaQuery,
} from "../../../../apis/folderApi";
import useModal from "../../../../hooks/useModal";
import useOutsideClick from "../../../../hooks/useOutsideClick";
import CustomDeleteModal from "../../CustomModal/CustomDeleteModal";
import CustomMoreOptionButton from "../../CustomMoreOptionButton/CustomMoreOptionButton";
import styles from "../styles";
import Rename from "./Rename";
const items = [
  {
    icon: <Edit fontSize="small" />,
    text: "Rename",
    modalType: "rename",
  },
  {
    icon: <Delete fontSize="small" />,
    text: "Delete",
    modalType: "delete",
  },
];

const formats = [
  "jpg",
  "jpeg",
  "png",
  "jfif",
  "bmp",
  "raw",
  "tiff",
  "gif",
  "svg",
  "webp",
  "heic",
];

const SingleDocument = ({ item, handleFolderSelect, id }) => {
  const classes = styles();
  const [file, setFile] = useState();
  const { modals, row, handleOpen, handleClose } = useModal();
  const { isFetching, isLoading } = useGetMediaQuery(
    { id: file?.id },
    { skip: !file?.id }
  );
  const ref = useOutsideClick(() => handleClose("rename"));
  const [
    deleteFile,
    { isLoading: isFileLoading, isSuccess, error, data: successData },
  ] = useDeleteFileMutation();
  const [
    deleteFolder,
    {
      isLoading: isFolderLoading,
      isSuccess: isFolderSuccess,
      error: isFolderError,
      data: folderSuccessData,
    },
  ] = useDeleteFolderMutation();
  const handleConfirm = () => {
    const data = {
      id: item?.id,
    };
    item?.extension ? deleteFile(data) : deleteFolder(data);
  };
  useEffect(() => {
    if (file) {
      const timeout = setTimeout(() => {
        setFile();
      }, 1000);
      return () => clearTimeout(timeout);
    }
  }, [file]);
  const switchType = () => {
    switch (item?.extension) {
      case "pdf":
        return (
          <PictureAsPdf
            className="documentIcon"
            onClick={() => setFile(item)}
            sx={{
              color: "#F10056",
            }}
          />
        );

      default:
        if (formats.includes(item?.extension)) {
          return (
            <Image
              className="documentIcon"
              onClick={() => setFile(item)}
              sx={{
                color: "#bbb",
              }}
            />
          );
        } else {
          return (
            <Folder
              sx={{
                color: "#5989C7",
              }}
              className="documentIcon"
              onClick={() => handleFolderSelect(item)}
            />
          );
        }
    }
  };

  return (
    <Box className={classes.singleDocumentContainer} ref={ref}>
      <Box>{switchType()}</Box>
      <Box>
        {isFetching || isLoading ? (
          <Box>
            <CircularProgress size="1rem" />
          </Box>
        ) : modals?.rename ? (
          <Rename row={row} handleClose={() => handleClose("rename")} />
        ) : (
          <Tooltip
            title={item?.name}
            onClick={() => handleOpen("rename", item)}
          >
            <Typography className="documentName">{item?.name}</Typography>
          </Tooltip>
        )}
      </Box>
      {!item?.isNotEditable && (
        <Box className="documentOptions">
          <CustomMoreOptionButton
            items={items}
            handleOpenModal={handleOpen}
            row={item}
            size="small"
            position="left"
          />
        </Box>
      )}
      <CustomDeleteModal
        open={modals?.delete}
        handleClose={() => handleClose("delete")}
        isLoading={isFileLoading || isFolderLoading}
        handleConfirm={handleConfirm}
        success={isSuccess || isFolderSuccess}
        error={error || isFolderError}
        successData={successData || folderSuccessData}
        content={<FolderContent item={item} />}
        height={"auto"}
      />
    </Box>
  );
};

export default SingleDocument;

const FolderContent = ({ item }) => {
  console.log({ item });
  const filesAndFolders = useMemo(
    () => [...(item?.sub_folders || []), ...(item?.files || [])],
    [item]
  );
  const switchType = (item) => {
    switch (item?.extension) {
      case "pdf":
        return (
          <PictureAsPdf
            sx={{
              color: "#F10056",
            }}
          />
        );

      default:
        if (formats.includes(item?.extension)) {
          return (
            <Image
              sx={{
                color: "#bbb",
              }}
            />
          );
        } else {
          return <Folder sx={{ color: "#5989C7" }} />;
        }
    }
  };
  if (!filesAndFolders?.length) {
    return;
  }
  return (
    <Box
      mt={2}
      mb={2}
      p={2}
      sx={{
        background: "#dce8fa4d",
      }}
    >
      {filesAndFolders?.length !== 0 && (
        <Typography sx={{ fontSize: "14px" }} pb={1.5}>
          <InfoOutlined
            sx={{
              verticalAlign: "bottom",
              color: "#F10056",
              marginRight: "5px",
            }}
          />
          This folder contains the following files:
        </Typography>
      )}
      <Box>
        {filesAndFolders?.map((item, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", columnGap: "5px" }}
          >
            {switchType(item)}
            <Typography sx={{ fontSize: "12px" }}>{item?.name}</Typography>{" "}
          </Box>
        ))}
      </Box>
    </Box>
  );
};
