import { Box, CircularProgress } from "@mui/material";

export default function Loader({ height = "50vh", size = 32 }) {
   return (
      <Box
         sx={{
            height: height,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
         }}
      >
         <CircularProgress size={size} />
      </Box>
   );
}
