import {
  CheckCircle,
  PublishOutlined,
  RemoveCircle,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import TextTooltip from "../CustomTooltips/TextTooltip";
import styles from "./styles";

const DragDropUpload = ({ multiple, name }) => {
  const { control, setValue } = useFormContext({});

  let ImageRef;
  const {
    fields: fileFields,
    append: fileAppend,
    remove: fileRemove,
  } = useFieldArray({
    control,
    name: name || "files",
  });

  const classes = styles();

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    !multiple && setValue(name, []);
    if (files) {
      multiple
        ? Object.values(files)?.map((item) => fileAppend({ file: item }))
        : fileAppend({ file: files?.[0] });
    }
  };

  const handleFileChange = (e) => {
    e.preventDefault();

    !multiple && setValue(name, []);

    const files = e.target.files;
    if (files) {
      multiple
        ? Object.values(files)?.map((item) => fileAppend({ file: item }))
        : fileAppend({ file: files?.[0] });
    }
  };

  return (
    <Box
      style={{
        background: "#F9F9FB",
        height: "max-content",
        borderRadius: "4px",
      }}
      onDragOver={dragOver}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      onDrop={fileDrop}
    >
      <Box
        className={
          fileFields?.length
            ? classes.filesContainer
            : classes.fileUploadContainer
        }
      >
        {!fileFields?.length ? (
          <Box>
            <PublishOutlined className={classes.uploadIcon} />
          </Box>
        ) : null}
        <Box mt={2}>
          <Typography variant="subtitle2">Drag files here to upload</Typography>
        </Box>
        <Box>
          <Typography variant="subtitle2">or</Typography>
        </Box>
        <Box className={classes.selectFile}>
          <Typography variant="subtitle2" onClick={() => ImageRef.click()}>
            Select a file
          </Typography>
        </Box>

        <input
          type="file"
          ref={(newRef) => (ImageRef = newRef)}
          onChange={handleFileChange}
          hidden
          multiple={multiple}
          accept="image/*, .pdf"
        />
      </Box>
      <Box>
        {fileFields?.length ? (
          <Box px="1rem">
            <Typography variant="subtitle2" style={{ fontWeight: "600" }}>
              Uploaded Files ({fileFields?.length} Files)
            </Typography>
          </Box>
        ) : null}
        <Box className={classes.fileContainer}>
          {fileFields?.map((item, index) => (
            <DisplayFiles
              key={item?.id}
              item={item}
              index={index}
              classes={classes}
              fileAppend={fileAppend}
              fileRemove={fileRemove}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DragDropUpload;

const DisplayFiles = ({ classes, index, item, fileRemove }) => {
  return (
    <Box key={item.id} className={classes.fileSection}>
      <Box display={`flex`} alignItems={`center`} gridColumnGap={`1rem`}>
        <Box>
          <CheckCircle className="icon1" />
        </Box>
        <Box
          sx={{ cursor: "pointer" }}
          onClick={() =>
            item?.file && window.open(URL.createObjectURL(item?.file), "_blank")
          }
        >
          <TextTooltip
            data={{ title: item?.file?.name }}
            maxWidth={"15rem"}
            fontSize={"12px"}
          />
        </Box>
      </Box>
      <Box>
        <RemoveCircle
          onClick={() => fileRemove(index)}
          fontSize="2px"
          sx={{ color: "#D24848", cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};
