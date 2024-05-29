import {
   Box,
   Button,
   CircularProgress,
   Typography,
} from "@mui/material";
import CustomModal from "./CustomModal";

export default function ConfirmationModal({
   open,
   handleClose,
   title,
   handleAction,
   buttonText,
   isLoading = false,
   buttonColor = "error",
}) {
   return (
      <CustomModal
         handleClose={handleClose}
         open={open}
         width="350px"
      >
         <Box sx={{ padding: "20px" }}>
            <Typography>{title}</Typography>
            <Box
               sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px",
                  marginTop: "15px",
               }}
            >
               <Button
                  variant="contained"
                  color={buttonColor}
                  onClick={handleAction}
               >
                  {isLoading ? (
                     <CircularProgress color="inherit" size={24} />
                  ) : (
                     buttonText
                  )}
               </Button>
               <Button variant="outlined" onClick={handleClose}>
                  Close
               </Button>
            </Box>
         </Box>
      </CustomModal>
   );
}
