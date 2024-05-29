import { Box, FormHelperText, InputLabel } from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Controller } from "react-hook-form";

const CustomTimePicker = ({
   title,
   name,
   control,
   errors,
   required,
   classnames = "",
   label = "",
   // defaultValue,
}) => {
   return (
      <Box className={`${classnames} datepicker`}>
         <Controller
            control={control}
            errors={errors}
            name={name}
            render={({ field }) => (
               <>
                  {title && (
                     <Box
                        sx={{
                           display: "flex",
                           columnGap: "0.1rem",
                           mb: "3px",
                        }}
                     >
                        <InputLabel className="title">
                           {title}{" "}
                        </InputLabel>
                        <InputLabel style={{ color: "red" }}>
                           {required && " *"}
                        </InputLabel>
                     </Box>
                  )}
                  <LocalizationProvider
                     dateAdapter={AdapterDayjs}
                     style={{ backgroundColor: "red" }}
                  >
                     <TimePicker
                        sx={{
                           backgroundColor: "red",
                           width: "100%",
                        }}
                        label={label}
                        // defaultValue={defaultValue || ""}
                        defaultValue={dayjs("2022-04-17T15:30")}
                        value={
                           field.value
                              ? dayjs(field.value)
                              : undefined
                        }
                        onChange={(date) => {
                           return field.onChange(date);
                        }}
                     />
                  </LocalizationProvider>
               </>
            )}
         ></Controller>

         {errors[name]?.message && (
            <FormHelperText
               error={true}
               sx={{
                  color: "red !important",
                  fontSize: "10px",
                  marginTop: "5px",
               }}
            >
               {errors[name]?.message}
            </FormHelperText>
         )}
      </Box>
   );
};

export default CustomTimePicker;
