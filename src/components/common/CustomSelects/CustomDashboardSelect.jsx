import {
   Box,
   FormControl,
   FormHelperText,
   InputLabel,
   MenuItem,
   Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
   root: {
      "& .MuiFormControl-root": {
         width: "100%",
      },
   },
}));

export const CustomDashboardSelect = ({
   name,
   control,
   errors,
   data = [],
   defaultValue = "",
   rule = { required: false },
   title = "",
   disabled = false,
   nonNestedSelect = true,
   hideLegend,
   required,
   placeholder,
}) => {
   const classes = useStyles();

   return (
      <>
         <Box
            className={`${classes.root} custom-select`}
            sx={{
               "& legend": {
                  display: hideLegend ? "none" : "initial",
               },
               "& .MuiOutlinedInput-notchedOutline": {
                  top: hideLegend ? 0 : "-5px",
               },
            }}
         >
            {title && (
               <Box
                  sx={{
                     display: "flex",
                     columnGap: "0.1rem",
                     mb: "3px",
                  }}
               >
                  <InputLabel
                     className="title"
                     style={{ fontSize: "12px", color: "#000" }}
                  >
                     {title?.toUpperCase()}{" "}
                  </InputLabel>
                  {required && (
                     <InputLabel style={{ color: "red" }}>
                        {" *"}
                     </InputLabel>
                  )}
               </Box>
            )}

            <FormControl variant="outlined">
               <Controller
                  name={name}
                  control={control}
                  render={({ field: { onChange, value } }) => {
                     return (
                        <Select
                           placeholder={placeholder}
                           label={name}
                           onChange={onChange}
                           value={value}
                           disabled={disabled}
                           // fullWidth
                           defaultValue={defaultValue || ""}
                           sx={{
                              borderRadius: "6px",
                              border: "1px solid #fff !important",
                              backgroundColor: "#fff !important",
                              fontSize: "16px",
                              fontWeight: "500",
                              "& .fieldset": {
                                 border: "none",
                              },
                              "&:hover": {
                                 // backgroundColor: "#fff !important", // Remove the border change

                                 border: "1px solid #fff !important",
                              },

                              "&.MuiOutlinedInput-root": {
                                 "&:hover": {
                                    outline: "none !important",
                                 },
                              },
                              "& .MuiOutlinedInput-notchedOutline": {
                                 outline: "none ! important",
                              },

                              // "& .MuiInputBase-root": {
                              //    backgroundColor: "#fff !important",
                              // },

                              "& .MuiSelect-select": {
                                 padding: "0px !important",
                              },
                           }}
                        >
                           {data?.length ? (
                              data?.map((item, index) => {
                                 const value = item?.value;
                                 const label = item?.label;
                                 return (
                                    <MenuItem
                                       key={index}
                                       value={value}
                                       disabled={item?.disabled}
                                    >
                                       {label}
                                    </MenuItem>
                                 );
                              })
                           ) : (
                              <MenuItem value={""} disabled>
                                 No options
                              </MenuItem>
                           )}
                        </Select>
                     );
                  }}
                  rules={rule}
               />
            </FormControl>
            {nonNestedSelect &&
               errors[name] &&
               errors[name].type === "required" && (
                  <FormHelperText
                     style={{
                        color: "red",
                        fontSize: "10px",
                        marginTop: "5px",
                     }}
                  >
                     This field is required
                  </FormHelperText>
               )}
         </Box>
      </>
   );
};

export const SecondarySelect = ({
   placeholder,
   name,
   onChange,
   value,
   disabled,
   defaultValue,
   data,
   hideLegend,
}) => {
   return (
      <Box
         className={`custom-select`}
         sx={{
            "& legend": {
               display: hideLegend ? "none" : "initial",
            },
            "& .MuiOutlinedInput-notchedOutline": {
               top: hideLegend ? 0 : "-5px",
            },
         }}
      >
         <Select
            placeholder={placeholder}
            label={name}
            onChange={onChange}
            // value={value[value]}
            value={value}
            disabled={disabled}
            fullWidth
            defaultValue={defaultValue || ""}
         >
            {data?.length ? (
               data?.map((item, index) => {
                  const value = item?.value;
                  const label = item?.label;
                  return (
                     <MenuItem
                        key={index}
                        value={value}
                        disabled={item?.disabled}
                     >
                        {label}
                     </MenuItem>
                  );
               })
            ) : (
               <MenuItem value={""} disabled>
                  No options
               </MenuItem>
            )}
         </Select>
      </Box>
   );
};
