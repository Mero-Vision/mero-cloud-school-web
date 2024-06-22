import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Box, Fade, Popper } from "@mui/material";
import { useState } from "react";
import PaymentMethodDetails from "./PaymentMethodDetails";

const PaymentMethodBox = ({ props, hide, menuData }) => {
   const [anchorEl, setAnchorEl] = useState(null);
   const row = props?.row;

   const handlePopoverOpen = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handlePopoverClose = () => {
      setAnchorEl(null);
   };

   const open = Boolean(anchorEl);

   return (
      <Box
         sx={{ textTransform: "capitalize" }}
         onMouseEnter={handlePopoverOpen}
         onMouseLeave={handlePopoverClose}
      >
         <Box
            sx={{ display: "flex", alignItems: "center", gap: "5px" }}
         >
            {props} <KeyboardArrowDownIcon />{" "}
         </Box>
         <Popper
            transition
            open={open}
            anchorEl={anchorEl}
            onClose={handlePopoverClose}
            anchorOrigin={{
               vertical: "bottom",
               horizontal: "left",
            }}
            transformOrigin={{
               vertical: "top",
               horizontal: "left",
            }}
            sx={{ zIndex: "100000", marginTop: "15px !important" }}
         >
            {({ TransitionProps }) => (
               <Fade {...TransitionProps} timeout={350}>
                  <Box
                     sx={{
                        background: "#fff",
                        boxShadow:
                           // " rgba(149, 157, 165, 0.2) 0px 8px 24px;",
                           "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;",
                        display: "flex",
                        padding: "20px",
                        flexWrap: "wrap",
                        top: "50px !important",
                        borderRadius: "8px",
                     }}
                  >
                     <PaymentMethodDetails row={menuData} />
                  </Box>
               </Fade>
            )}
         </Popper>
      </Box>
   );
};

export default PaymentMethodBox;
