import { ExpandMore } from "@mui/icons-material";
import { Box, Collapse, Typography } from "@mui/material";
import React, { useState } from "react";

const CustomAccordion = ({ item, children, open: expand }) => {
  const [open, setOpen] = useState(expand || false);
  return (
    <Box>
      <Box
        display={"flex"}
        columnGap={"10px"}
        alignItems={"center"}
        sx={{
          fontSize: "14px",
          color: "#121127",
          "& svg": {
            color: "#9D9CAF",
            fontSize: "17px",
          },
        }}
      >
        {" "}
        <Box display={"flex"} alignItems={"center"}>
          {item?.icon}
        </Box>
        <Box>
          <Typography>{item?.label}</Typography>
        </Box>
        <Box
          display={"flex"}
          alignItems={"center"}
          sx={{
            "& svg": {
              color: "#6C6B80",
              fontSize: "19px",
            },
          }}
        >
          {" "}
          <ExpandMore
            onClick={() => setOpen(!open)}
            sx={{
              transition: "transform 0.3s",
              transform: open ? "rotate(-180deg)" : "rotate(0deg)",
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Box sx={{ marginTop: "1rem" }}>{children}</Box>
      </Collapse>
    </Box>
  );
};

export default CustomAccordion;
