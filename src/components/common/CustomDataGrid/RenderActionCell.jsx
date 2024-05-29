import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem } from "@mui/material";
import { styled } from "@mui/styles";
import { useState } from "react";

export default function RenderActionCell({
   params,
   actions,
   disabled,
}) {
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = () => {
      setAnchorEl(null);
   };

   return (
      <>
         <IconButton
            className="card-menu-btn"
            aria-label="menu"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={(e) => {
               e.stopPropagation();
               handleClick(e);
            }}
            role="button"
            disabled={disabled}
         >
            <MoreVert />
         </IconButton>

         <StyledMenu
            // id={slug}
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
               "aria-labelledby": "basic-button",
            }}
            onClick={(e) => e.stopPropagation()}
            anchorOrigin={{
               vertical: "top",
               horizontal: "right",
            }}
         >
            {actions &&
               actions.map((action, index) => (
                  <MenuItem
                     key={index}
                     onClick={() => {
                        action.actionHandler(params);
                        handleClose();
                     }}
                  >
                     {action.button}
                  </MenuItem>
               ))}
         </StyledMenu>
      </>
   );
}

const StyledMenu = styled((props) => (
   <Menu
      elevation={0}
      anchorOrigin={{
         vertical: "bottom",
         horizontal: "center",
      }}
      transformOrigin={{
         vertical: "top",
         horizontal: "center",
      }}
      {...props}
   />
))(({ theme }) => ({
   "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1.3),
      // minWidth: 180,
      color:
         theme.palette.mode === "light"
            ? "rgb(55, 65, 81)"
            : theme.palette.grey[300],
      boxShadow:
         "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
         padding: "4px 0",
      },
   },
}));
