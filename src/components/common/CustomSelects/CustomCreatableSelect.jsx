import { Box, Grow, InputLabel, Paper } from "@mui/material";
import Autocomplete, {
   createFilterOptions,
} from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import * as React from "react";
import { forwardRef } from "react";
import { Controller } from "react-hook-form";
import styles from "./style";

const filter = createFilterOptions();

export default function CustomCreatableSelect({
   name,
   control,
   errors,
   disabled,
   data = [],
   title = "",
   placeholder,
   handleOpen = () => {},
   required,
}) {
   const classes = styles();
   const [value, setValue] = React.useState(null);
   const [open, toggleOpen] = React.useState(false);

   const handleClose = () => {
      toggleOpen(false);
   };

   function PaperComponent(paperProps, ref) {
      return (
         <Grow unmountOnExit in>
            <Paper {...paperProps} ref={ref} />
         </Grow>
      );
   }
   const PaperComponentForward = forwardRef(PaperComponent);
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
      <React.Fragment>
         <Box className="inputs">
            {title && (
               <InputLabel className="inputTitle">
                  {" "}
                  {title?.toUpperCase()}{" "}
                  <span style={{ color: "red" }}>
                     {required && "*"}
                  </span>
               </InputLabel>
            )}
            <Controller
               name={name}
               control={control}
               render={({ field: { onChange, value } }) => (
                  <Autocomplete
                     ListboxProps={{ style: { maxHeight: 170 } }}
                     disabled={disabled}
                     PaperComponent={PaperComponentForward}
                     value={value}
                     onChange={(event, newValue) => {
                        console.log("ooooodjsaodjasdjasdasji", {
                           newValue,
                        });
                        if (newValue && newValue.inputValue) {
                           handleOpen(
                              newValue?.inputValue === "NEW"
                                 ? ""
                                 : newValue
                           );
                        } else {
                           setValue(newValue);
                           onChange(newValue);
                        }
                     }}
                     filterOptions={(options, params) => {
                        const filtered = filter(options, params);
                        console.log("dasdsdrrrrrr", {
                           params,
                           options,
                        });
                        filtered.push({
                           inputValue: params.inputValue
                              ? params.inputValue
                              : "NEW",
                           title: `+ Add ${
                              params.inputValue
                                 ? params.inputValue
                                 : "NEW"
                           }`,
                        });

                        if (params.inputValue !== "") {
                        }

                        return filtered;
                     }}
                     id="free-solo-dialog-demo"
                     options={data}
                     getOptionLabel={(option) => {
                        // e.g value selected with enter, right from the input
                        if (typeof option === "string") {
                           return option;
                        }
                        if (option.inputValue) {
                           return option.inputValue;
                        }
                        return option.title;
                     }}
                     defaultValue={data?.find(
                        (item) => item.title === value?.title
                     )}
                     selectOnFocus
                     clearOnBlur
                     handleHomeEndKeys
                     renderOption={(props, option) => {
                        return option?.inputValue ? (
                           <li
                              {...props}
                              className={classes.creatableSelectAdd}
                           >
                              {option.title}
                           </li>
                        ) : (
                           <li {...props}>{option.title}</li>
                        );
                     }}
                     freeSolo
                     renderInput={(params) => (
                        <TextField
                           {...params}
                           placeholder={placeholder || "Motorbike"}
                        />
                     )}
                  />
               )}
            />
         </Box>
         {error && (
            <Box style={{ color: "red", fontSize: "10px" }}>
               {error}
            </Box>
         )}
      </React.Fragment>
   );
}
