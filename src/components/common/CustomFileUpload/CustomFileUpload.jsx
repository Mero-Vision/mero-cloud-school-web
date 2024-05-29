import { Publish } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useRef } from "react";
import { Controller } from "react-hook-form";
const CustomFileUpload = ({
  name,
  control,
  disabled,
  buttonName,
  isMultiple,
  variant,
  fileComponent,
}) => {
  const fileRef = useRef();
  return (
    <div>
      {fileComponent ? (
        <Box onClick={() => fileRef.current.click()}>{fileComponent}</Box>
      ) : (
        <Button
          variant={variant || "blue"}
          onClick={() => fileRef.current.click()}
          startIcon={<Publish />}
        >
          {buttonName || "Upload"}
        </Button>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <input
            ref={fileRef}
            type={"file"}
            multiple={isMultiple}
            onChange={(e) => onChange(e.target.files)}
            disabled={disabled}
            hidden
          />
        )}
      />
    </div>
  );
};

export default CustomFileUpload;
