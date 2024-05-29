import { Box, Typography } from "@mui/material";
import React from "react";

const IconWithText = ({ icon, text }) => {
  const styles = {
    fontSize: "10px",

    "& svg": {
      width: "13px",
      height: "13px",
    },
  };
  return (
    <Box display={"flex"} alignItems={"center"} columnGap={"6px"} sx={styles}>
      <Box display={"flex"} alignItems={"center"}>
        {icon}
      </Box>
      <Box>
        <Typography sx={{ fontWeight: "300" }}>{text}</Typography>
      </Box>
    </Box>
  );
};

export default IconWithText;
