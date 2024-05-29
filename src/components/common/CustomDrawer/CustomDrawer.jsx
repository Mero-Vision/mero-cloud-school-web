import { Clear } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";

export default function CustomDrawer({
   component,
   anchor = "right",
   drawer,
   close = false,
   width,
   padding,
   session,
}) {
   const [state, setState] = React.useState(false);

   const toggleDrawer = (open) => (event) => {
      if (
         event.type === "keydown" &&
         (event.key === "Tab" || event.key === "Shift")
      ) {
         return;
      }

      setState(open);
   };

   return (
      <div>
         <React.Fragment>
            <Box onClick={toggleDrawer(true)}>{component}</Box>
            <Drawer
               anchor={anchor}
               open={state}
               onClose={toggleDrawer(false)}
            >
               <Box
                  sx={{
                     height: "100%",
                     width: width ? width : "60vw",
                     padding: padding ? padding : "20px  40px",
                     background: "#f9f9fb",
                  }}
                  role="presentation"
                  onClick={close && toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
               >
                  <Box
                     sx={{
                        position: "sticky",
                        top: 0,

                        zIndex: 1000,
                        backgroundColor: "#F9F9FB",
                        padding: "11px 20px",
                        color: "#496AD0",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                     }}
                  >
                     <IconButton
                        variant="subtitle1"
                        onClick={toggleDrawer(false)}
                     >
                        <Clear />
                     </IconButton>
                  </Box>
                  {drawer}
               </Box>{" "}
            </Drawer>
         </React.Fragment>
      </div>
   );
}
