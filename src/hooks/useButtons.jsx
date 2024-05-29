import { Button, Tooltip } from "@mui/material";
import React from "react";

const useButtons = ({ onClick, tooltip, startIcon, children }) => {
   return (
      <Tooltip title={tooltip} arrow>
         <Button
            variant="contained"
            color="secondary"
            startIcon={startIcon}
            onClick={onClick}
         >
            {children}
         </Button>
      </Tooltip>
   );
};

export default useButtons;
