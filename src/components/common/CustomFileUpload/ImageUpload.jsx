import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
   Box,
   Button,
   FormHelperText,
   InputLabel,
   Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import styles from "./styles";
// import ClearIcon from "@mui/icons-material/Clear";
import { useDropzone } from "react-dropzone";

const FileUploader = ({
   title,
   name,
   control,
   errors,
   setValue,
   defaultValue = "",
   classnames = "",
   clearErrors,
   imageLink,
   required,
}) => {
   const [imagePreview, setImagePreview] = useState(imageLink || "");

   useEffect(() => {
      if (typeof imageLink === "string") {
         setImagePreview(imageLink);
      }
   }, [imageLink]);

   const onDrop = (acceptedFiles) => {
      // register value in react hook form
      setValue(name, acceptedFiles);
      // console.log("acceptedFiles", acceptedFiles);

      // set image preview url
      const reader = new FileReader();
      reader.readAsDataURL(acceptedFiles[0]);
      reader.addEventListener("load", () => {
         setImagePreview(reader.result);
      });

      // clear required errors if file is uploaded
      if (errors?.type === "required") {
         clearErrors(name);
      }
   };

   const { getRootProps, getInputProps, open, isDragActive } =
      useDropzone({
         onDrop,
         noClick: true,
         noKeyboard: true,
         accept: { "image/png": [".jpeg", ".jpg", ".png", ".webp"] },
      });

   const classes = styles();

   // const removePreview = () => {
   //   setImagePreview("");
   //   setValue(name, "");
   // };

   return (
      <Box className={`${classnames} file-input`}>
         <Controller
            control={control}
            errors={errors}
            name={name}
            defaultValue={defaultValue}
            render={() => (
               <>
                  {title && (
                     <Box
                        sx={{
                           display: "flex",
                           columnGap: "0.1rem",
                           mb: "5px",
                        }}
                     >
                        <InputLabel className={classes.labels}>
                           {title}
                        </InputLabel>
                        <InputLabel style={{ color: "red" }}>
                           {required && " *"}
                        </InputLabel>
                     </Box>
                  )}
                  <div
                     className={`${classes.inputFileWrap} ${
                        isDragActive ? "drag-active" : ""
                     } ${imagePreview ? "image-preview" : ""} `}
                     {...getRootProps()}
                  >
                     <input {...getInputProps()} name={name} />
                     {imagePreview ? (
                        <Tooltip title="Click to change image">
                           <Box
                              className="image-container"
                              onClick={open}
                           >
                              {/* <ClearIcon onClick={removePreview} /> */}
                              <img src={imagePreview} alt="Preview" />
                           </Box>
                        </Tooltip>
                     ) : (
                        <>
                           <CloudUploadIcon />
                           <div className="title">
                              Drag and drop to upload
                           </div>
                           <div className="or">or</div>
                           <Button variant="contained" onClick={open}>
                              Browse
                           </Button>
                        </>
                     )}
                  </div>
               </>
            )}
         ></Controller>

         {errors?.[name]?.message && (
            <FormHelperText
               // error={true}
               sx={{
                  fontSize: "10px",
                  color: "red !important",
                  marginTop: "5px",
               }}
            >
               {errors?.[name].message}
            </FormHelperText>
         )}
      </Box>
   );
};

export default FileUploader;
