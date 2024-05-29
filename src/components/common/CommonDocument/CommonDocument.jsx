import { Box } from "@mui/material";
import React from "react";
import DocumentContent from "./DocumentContent";

const CommonDocument = ({ IsCompany }) => {
  return (
    <Box>
      <DocumentContent IsCompany={IsCompany} />
    </Box>
  );
};

export default CommonDocument;
