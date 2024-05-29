import {
   IconButton,
   ListItemIcon,
   ListItemText,
   Menu,
   MenuItem,
} from "@mui/material";

import { MoreVert } from "@mui/icons-material";
import React, { memo, useState } from "react";
import HasPermission from "../Permissions/HasPermission";
import styles from "./style";
/* ITEMS ARRAY DATA :
   items={[
   {
      icon: <Edit fontSize="small" />,
      text: "Edit",
      modalType: "edit",
    },
  ]}
---------------------------------------------------------------
   HANDLE MODAL TYPE :
   const [openModal, setOpenModal] = useState(false);
   const [modalType, setModalType] = useState("");
    const handleOpenModal = (modalType) => {
    setOpenModal(true);
    setModalType(modalType);
   };
   const handleCloseModal = () => {
      setOpenModal(false);
   };
*/

const CustomMoreOptionButton = ({
   handleOpenModal,
   items,
   row,
   size,
   position,
}) => {
   const classes = styles();
   const [anchorEl, setAnchorEl] = useState(null);
   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleClose = () => {
      setAnchorEl(null);
   };
   const StyledMenu = (props) => (
      <Menu
         elevation={1}
         getContentAnchorEl={null}
         anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
         }}
         transformOrigin={{
            vertical: "top",
            horizontal: position || "right",
         }}
         disableScrollLock
         {...props}
      />
   );

   const handleOpen = (item) => {
      handleOpenModal(item?.modalType, row);
      handleClose();
   };

   return (
      <>
         <IconButton onClick={handleClick} size={size}>
            <MoreVert />
         </IconButton>
         <StyledMenu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
            className={classes.menu}
         >
            {items?.map((item, index) => (
               <HasPermission of={item?.permission} key={index}>
                  <MenuItem
                     className={classes.styledMenuItem}
                     onClick={() => handleOpen(item)}
                  >
                     {item?.icon && (
                        <ListItemIcon>{item?.icon}</ListItemIcon>
                     )}
                     <ListItemText
                        primary={item?.text}
                        className={classes.listItemText}
                     />
                  </MenuItem>
               </HasPermission>
            ))}
         </StyledMenu>
      </>
   );
};

export default memo(CustomMoreOptionButton);
