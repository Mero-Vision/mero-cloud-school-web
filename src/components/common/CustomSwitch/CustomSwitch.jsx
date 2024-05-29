import { Box, FormHelperText, Switch, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
}));

export const CustomSwitch = ({
  name,
  control,
  errors,
  label,
  right,
  rule = { required: false },
  nonNestedSelect = true,
  disabled,
}) => {
  return (
    <>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box
              alignItems={"center"}
              display="flex"
              columnGap={"8px"}
              sx={{
                fontSize: "12px",
                textTransform: "uppercase",
                "& > *": {
                  fontWeight: "500 !important",
                },
              }}
            >
              {!right && <Typography>{label}</Typography>}
              <Switch checked={value} onChange={onChange} disabled={disabled} />
              {right && <Typography>{label}</Typography>}
            </Box>
          )}
          rules={rule}
        />
        {nonNestedSelect &&
          errors[name] &&
          errors[name].type === "required" && (
            <FormHelperText style={{ color: "red" }}>
              This field is required
            </FormHelperText>
          )}
      </div>
    </>
  );
};
