import { Grid } from "@mui/material";
import React from "react";
import PrintDiv from "./PrintDiv";
import PrintTemplates from "./PrintTemplates";

const CommonPrint = ({ row }) => {
  return (
    <Grid container spacing={4}>
      <Grid item xs={2.5}>
        <PrintTemplates />
      </Grid>
      <Grid item xs={9.5}>
        <PrintDiv row={row} />
      </Grid>
    </Grid>
  );
};

export default CommonPrint;
