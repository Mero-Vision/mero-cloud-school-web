import { Box, InputLabel, TextField } from "@mui/material";
import { Controller } from "react-hook-form";

export const CustomInput = ({
   name,
   control,
   type,
   errors,
   placeholder = null,
   label = "",
   rule = { required: false },
   title = "",
   disabled = false,
   hidden = false,
   required,
   min,
   max,
   rows,
   ...props
}) => {
   let error;
   const splitName = name.split(".");
   if (errors) {
      if (splitName?.length > 1) {
         let loopError = errors;
         splitName?.map((item, index) => {
            loopError = loopError?.[item];
         });
         error = loopError?.message;
      } else {
         error = errors?.[name]?.message;
      }
   }

   return (
      <>
         <div className="custom-input">
            {title && (
               <Box
                  sx={{
                     display: "flex",
                     columnGap: "0.1rem",
                     mb: "3px",
                  }}
               >
                  <InputLabel className="title">{title} </InputLabel>
                  <InputLabel style={{ color: "red" }}>
                     {required && " *"}
                  </InputLabel>
               </Box>
            )}
            <Controller
               name={name}
               control={control}
               render={({ field: { onChange, value } }) => (
                  <TextField
                     type={type}
                     onChange={onChange}
                     value={value}
                     fullWidth
                     placeholder={placeholder}
                     label={label}
                     variant="outlined"
                     title={title}
                     disabled={disabled}
                     onWheel={(e) => e.target.blur()}
                     InputProps={{
                        inputProps: {
                           min: min || 0,
                           max: max,
                           step: "any",
                        },
                     }}
                     hidden={hidden}
                     multiline={Boolean(rows)}
                     rows={rows}
                     {...props}
                  />
               )}
               rules={rule}
            />
            {error && (
               <Box
                  sx={{
                     color: "#DC2626",
                     fontSize: "10px",
                     marginTop: "5px",
                  }}
               >
                  {error}
               </Box>
            )}
         </div>
      </>
   );
};

export const SecondaryInput = ({
   type,
   value,
   onChange,
   placeholder,
   label,
   disabled,
   title,
   min,
   max,
   hidden,
   rows,
   required,
   ...props
}) => {
   return (
      <>
         {title && (
            <Box display="flex" gridColumnGap={".1rem"}>
               <InputLabel
                  className="inputTitle"
                  sx={{
                     fontSize: "12px !important",
                     fontWeight: "600 !important",
                     color: "#383751",
                  }}
               >
                  {title}{" "}
                  <span style={{ color: "red" }}>
                     {required && "*"}{" "}
                  </span>
               </InputLabel>
            </Box>
         )}
         <TextField
            type={type}
            onChange={onChange}
            value={value}
            fullWidth
            placeholder={placeholder}
            label={label}
            variant="outlined"
            // title={title}
            InputLabelProps={{ shrink: false }}
            disabled={disabled}
            onWheel={(e) => e.target.blur()}
            InputProps={{
               inputProps: { min: min || 0, max: max, step: "any" },
            }}
            hidden={hidden}
            multiline={Boolean(rows)}
            rows={rows}
            sx={{
               "& label": {
                  top: "-5px",
                  fontSize: "14px !important",
               },
            }}
            {...props}
         />
      </>
   );
};
