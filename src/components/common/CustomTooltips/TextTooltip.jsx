import { Box, Tooltip } from "@mui/material";
import React from "react";

const TextTooltip = ({ data, maxWidth, fontSize }) => {
  const { title } = data;
  return (
    <div>
      {" "}
      <Tooltip title={title}>
        <Box
          style={{
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            overflow: "hidden",
            fontSize: fontSize,
          }}
          maxWidth={maxWidth || "10rem"}
        >
          {title}
        </Box>
      </Tooltip>
    </div>
  );
};

export default TextTooltip;
