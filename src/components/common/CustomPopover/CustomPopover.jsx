import { Box } from "@mui/material";
import Popover from "@mui/material/Popover";
import * as React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function CustomPopover({
  ButtonComponent,
  component,
  styleProps,
}) {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    setAnchorEl(null);
  }, [location?.pathname]);

  return (
    <Box width={"100%"}>
      <Box aria-describedby={id} onClick={handleClick}>
        {ButtonComponent}{" "}
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        disableScrollLock
        anchorOrigin={
          styleProps?.anchorOrigin || {
            vertical: "top",
            horizontal: "right",
          }
        }
        transformOrigin={
          styleProps?.transformOrigin || {
            vertical: "top",
            horizontal: "left",
          }
        }
        {...styleProps}
      >
        <Box>{component}</Box>{" "}
      </Popover>
    </Box>
  );
}
