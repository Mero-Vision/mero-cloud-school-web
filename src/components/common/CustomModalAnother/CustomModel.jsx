import CloseIcon from "@mui/icons-material/Close";
import {
   Box,
   Fade,
   IconButton,
   Modal,
   Tooltip,
   Typography,
} from "@mui/material";
import { memo, useEffect, useState } from "react";
import styles from "./style";

function CustomModal({
   children,
   open,
   handleClose,
   width,
   height,
   modalTitle,
   modalSubtitle,
   modalStyles = {},
}) {
   const classes = styles();
   function getModalStyle(height, width) {
      return {
         top: `50%`,
         left: `50%`,
         width: width || "800px",
         height: height || "auto",
         maxHeight: height || "85vh",
         transform: "translate(-50%, -50%)",
         overflowY: "auto",
         position: "relative",
         // overflow: "initial",
      };
   }
   const [modalStyle, setModalStyle] = useState();

   useEffect(() => {
      setModalStyle(getModalStyle(height, width));
   }, [height, width]);

   return (
      <Modal
         open={open}
         onClose={handleClose}
         aria-labelledby="simple-modal-title"
         aria-describedby="simple-modal-description"
         closeAfterTransition
      >
         <Fade in={open}>
            <div
               style={{ ...modalStyle, ...modalStyles }}
               className={classes.paper}
            >
               {modalTitle && (
                  <Box
                     sx={{
                        padding: "5px 20px",
                        background: (theme) =>
                           theme.palette.primary.main,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                     }}
                  >
                     <Typography
                        variant="h2"
                        sx={{ color: "white", fontSize: "16px" }}
                     >
                        {modalTitle}
                     </Typography>

                     <Tooltip title="Close">
                        <IconButton onClick={handleClose}>
                           <CloseIcon sx={{ color: "white" }} />
                        </IconButton>
                     </Tooltip>
                  </Box>
               )}
               {children}
            </div>
         </Fade>
      </Modal>
   );
}

export default memo(CustomModal);
