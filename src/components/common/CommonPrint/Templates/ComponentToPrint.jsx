import { Box } from "@mui/material";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import Template1 from "./Template1/Template1";
import Template2 from "./Template2/Template2";
import Template3 from "./Template3/Template3";

const ComponentToPrint = forwardRef(({ row }, ref) => {
  const { template } = useSelector((state) => state?.utils);

  const SwitchTemplate = () => {
    switch (template?.toLowerCase()) {
      case "template1":
      default:
        return <Template1 row={row} />;
      case "template2":
        return <Template2 row={row} />;
      case "template3":
        return <Template3 row={row} />;
    }
  };

  return (
    <Box ref={ref}>
      <SwitchTemplate />
    </Box>
  );
});

export default ComponentToPrint;
