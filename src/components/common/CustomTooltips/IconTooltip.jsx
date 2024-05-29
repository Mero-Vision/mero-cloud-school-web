import { IconButton, Tooltip } from "@mui/material";
import React from "react";

const IconTooltip = ({ data, handleClick = () => {} }) => {
  const { title, icon } = data;
  return (
    <div>
      {" "}
      <Tooltip title={title} onClick={handleClick}>
        <IconButton>{icon}</IconButton>
      </Tooltip>
    </div>
  );
};

export default IconTooltip;
