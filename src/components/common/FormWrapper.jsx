import { Box } from "@mui/material";

export function FormWrapper({ children, sx }) {
   return (
      <Box
         sx={{
            padding: "10px 20px",
            "& .form-container": {
               marginBlock: "10px",
               display: "flex",
               columnGap: "10px",
               alignItems: "flex-start",
               "& .custom-input": {
                  flexGrow: 1,
                  width: "100%",
               },
               "& .hash-input": {
                  flexGrow: "1",
                  // input: {
                  //   width: "100%",
                  //   minWidth: "100%",
                  // },
               },
               "& .datepicker": {
                  flexGrow: 1,
                  "& .MuiTextField-root": {
                     width: "100%",
                  },
               },
               "& .custom-select": {
                  flexGrow: 1,
                  width: "100%",
                  // "& .MuiTextField-root": {
                  //   width: "100%",
                  // },
               },
            },
            ...sx,
         }}
      >
         {children}
      </Box>
   );
}
