import {
   VisibilityOffOutlined,
   VisibilityOutlined,
} from "@mui/icons-material";
import {
   Box,
   IconButton,
   TextField,
   Typography,
} from "@mui/material";
import { memo, useState } from "react";
import { Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styles from "./style";

export const CustomInputLogin = memo(
   ({
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
      startIcon,
      endIcon,
      defaultValue,
      isNegative,
      productSearch,
      whiteBackground,
      forgotPassword,
      itemOrderInput,
      itemOrderToppings,
      loginInput,
   }) => {
      const navigate = useNavigate();
      const [show, setShow] = useState(false);
      const classes = styles();
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

      console.log({ aaaaa: error });

      const getValue = (e) => {
         if (type === "number") {
            if (min && e.target.value < min) {
               return min;
            } else if (max && e.target.value > max) {
               return max;
            } else {
               return e.target.value;
            }
         }
      };

      return (
         <div className="inputs">
            <div className={classes.root}>
               {title && (
                  <Box
                     display="flex"
                     gridColumnGap={".1rem"}
                     justifyContent={"space-between"}
                     alignItems={"center"}
                  >
                     {" "}
                     <Box
                        className="inputTitleLogin"
                        sx={{
                           textTransform: "capatalize",
                           fontSize: "12px",
                           fontWeight: "400 !important",
                           color: "red !important",
                        }}
                     >
                        {title}{" "}
                        <span style={{ color: "red" }}>
                           {required && "*"}{" "}
                        </span>
                     </Box>
                     {forgotPassword && (
                        <Box>
                           <Typography
                              onClick={() =>
                                 navigate("/forgot-password")
                              }
                              sx={{
                                 color: "#383751",
                                 fontSize: "12px",
                                 textDecoration: "underline",
                                 cursor: "pointer",
                              }}
                           >
                              Forgot Password?
                           </Typography>
                        </Box>
                     )}
                  </Box>
               )}
               <Controller
                  name={name}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                     <>
                        <TextField
                           sx={
                              (productSearch && {
                                 "& .MuiInputBase-root": {
                                    width: "400px",
                                    height: "40px",
                                    color: "red",
                                 },
                                 "& .MuiSvgIcon-root": {
                                    width: "20px",
                                    height: "20px",
                                 },
                                 "& .MuiInputBase-input": {
                                    fontSize: "14px",
                                 },
                              },
                              whiteBackground && {
                                 "& .MuiInputBase-root": {
                                    backgroundColor:
                                       "#fff !important",
                                 },
                              },
                              loginInput && {
                                 "& .MuiInputBase-input": {
                                    padding: "15px !important",
                                 },
                              })
                           }
                           type={show ? "text" : type}
                           onChange={(event) => {
                              const newValue =
                                 type === "number" &&
                                 event.target.value > max
                                    ? max
                                    : event.target.value;
                              onChange(newValue);
                           }}
                           value={value || ""}
                           fullWidth
                           placeholder={placeholder}
                           label={label}
                           variant="outlined"
                           defaultValue={defaultValue || ""}
                           title={title}
                           disabled={disabled}
                           onWheel={(e) => e.target.blur()}
                           InputProps={{
                              inputProps: {
                                 min: !isNegative && (min || 0),
                                 max: max,
                                 step: "0.01",
                              },
                              startAdornment: startIcon,
                              endAdornment:
                                 type === "password" ? (
                                    <IconButton
                                       onClick={() =>
                                          setShow((prev) => !prev)
                                       }
                                       sx={{
                                          "& svg": {
                                             margin: "0 !important",
                                             height: "14px",
                                             width: "14px",
                                          },
                                       }}
                                    >
                                       {show ? (
                                          <VisibilityOffOutlined />
                                       ) : (
                                          <VisibilityOutlined />
                                       )}
                                    </IconButton>
                                 ) : (
                                    endIcon
                                 ),
                           }}
                           hidden={hidden}
                           multiline={rows}
                           rows={rows}
                           // required={required}
                        />
                        {error && (
                           <Box
                              style={{
                                 color: "red",
                                 fontSize: "10px",
                              }}
                           >
                              {type === "password"
                                 ? error
                                 : !value && error}
                           </Box>
                        )}
                     </>
                  )}
               />
            </div>
         </div>
      );
   }
);
