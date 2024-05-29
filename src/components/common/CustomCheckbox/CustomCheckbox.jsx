import {
   Checkbox,
   FormControlLabel,
   FormHelperText,
   InputLabel,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
   root: {
      "& .MuiFormControl-root": {
         width: "100%",
      },
      "& label": {
         fontSize: "14px !important",
      },
   },
}));

export const CustomCheckbox = ({
   name,
   control,
   errors,
   label,
   rule = { required: false },
   title = "",
   nonNestedSelect = true,
}) => {
   const classes = useStyles();

   return (
      <>
         <div className={classes.root}>
            {title && (
               <InputLabel className="title">
                  {title?.toUpperCase()}
               </InputLabel>
            )}

            <Controller
               name={name}
               control={control}
               render={({ field: { onChange, value } }) => (
                  <FormControlLabel
                     control={
                        <Checkbox
                           checked={value}
                           onChange={onChange}
                           inputProps={{ "aria-label": "controlled" }}
                        />
                     }
                     label={label}
                  />
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

// import { Box, Checkbox, InputLabel } from "@mui/material";
// import { Controller } from "react-hook-form";

// export const CustomCheckbox = ({
//    name,
//    control,
//    errors,
//    title = "",
//    disabled = false,
//    required,
//    styles,
//    textColor,
//    ...props
// }) => {
//    let error;
//    const splitName = name.split(".");
//    if (errors) {
//       if (splitName?.length > 1) {
//          let loopError = errors;
//          // eslint-disable-next-line no-unused-vars
//          splitName?.map((item, index) => {
//             loopError = loopError?.[item];
//          });
//          error = loopError?.message;
//       } else {
//          error = errors?.[name]?.message;
//       }
//    }

//    return (
//       <div>
//          <Box
//             className="custom-checkbox"
//             sx={{
//                display: "flex",
//                gap: "10px",
//                alignItems: "center",
//                ...styles,
//             }}
//          >
//             <Controller
//                name={name}
//                control={control}
//                render={({ field: { onChange, value, ...field } }) => {
//                   return (
//                      <Checkbox
//                         id={name}
//                         color="secondary"
//                         onChange={(event) =>
//                            onChange(event.target.checked)
//                         }
//                         checked={value}
//                         disabled={disabled}
//                         disableRipple
//                         sx={{ p: "0" }}
//                         {...field}
//                         {...props}
//                      />
//                   );
//                }}
//             />
//             {title && (
//                <Box
//                   sx={{
//                      display: "flex",
//                      columnGap: "0.1rem",
//                      mb: "3px",
//                   }}
//                >
//                   <InputLabel style={{ color: "red" }}>
//                      {required && " *"}
//                   </InputLabel>
//                   <InputLabel className="title" htmlFor={name}>
//                      {title}{" "}
//                   </InputLabel>
//                </Box>
//             )}
//          </Box>
//          {error && (
//             <Box
//                sx={{
//                   color: "red",
//                   fontSize: "10px",
//                   marginTop: "5px",
//                }}
//             >
//                {error}
//             </Box>
//          )}
//       </div>
//    );
// };

// export const SecondaryCheckbox = ({
//    name,
//    onChange,
//    // value,
//    checked,
//    disabled,
//    ...props
// }) => {
//    return (
//       <Checkbox
//          id={name}
//          color="secondary"
//          onChange={onChange}
//          checked={checked}
//          disabled={disabled}
//          disableRipple
//          sx={{ p: "0" }}
//          {...props}
//       />
//    );
// };

// export const CustomSecondaryCheckbox = ({
//    name,
//    control,
//    errors,
//    title = "",
//    disabled = false,
//    required,
//    styles,
//    textColor,
//    onChange,
//    checked,
//    ...props
// }) => {
//    let error;
//    const splitName = name?.split(".");
//    if (errors) {
//       if (splitName?.length > 1) {
//          let loopError = errors;
//          splitName?.forEach((item) => {
//             loopError = loopError?.[item];
//          });
//          error = loopError?.message;
//       } else {
//          error = errors?.[name]?.message;
//       }
//    }

//    return (
//       <div>
//          <Box
//             className="custom-checkbox"
//             sx={{
//                display: "flex",
//                gap: "10px",
//                alignItems: "center",
//                ...styles,
//             }}
//          >
//             <Controller
//                name={name}
//                control={control}
//                render={({
//                   field: {
//                      onChange: onControllerChange,
//                      value,
//                      ...field
//                   },
//                }) => {
//                   const handleCheckboxChange = (event) => {
//                      onControllerChange(event.target.checked);
//                      if (onChange) {
//                         onChange(event.target.checked);
//                      }
//                   };

//                   return (
//                      <Checkbox
//                         id={name}
//                         color="secondary"
//                         onChange={handleCheckboxChange}
//                         // checked={value}
//                         checked={
//                            props.checked !== undefined
//                               ? props.checked
//                               : value
//                         }
//                         disabled={disabled}
//                         disableRipple
//                         sx={{ p: "0" }}
//                         {...field}
//                         {...props}
//                      />
//                   );
//                }}
//             />
//             {title && (
//                <Box
//                   sx={{
//                      display: "flex",
//                      columnGap: "0.1rem",
//                      mb: "3px",
//                   }}
//                >
//                   <InputLabel style={{ color: "red" }}>
//                      {required && " *"}
//                   </InputLabel>
//                   <InputLabel className="title" htmlFor={name}>
//                      {title}{" "}
//                   </InputLabel>
//                </Box>
//             )}
//          </Box>
//          {error && (
//             <Box
//                sx={{
//                   color: "red",
//                   fontSize: "10px",
//                   marginTop: "5px",
//                }}
//             >
//                {error}
//             </Box>
//          )}
//       </div>
//    );
// };
