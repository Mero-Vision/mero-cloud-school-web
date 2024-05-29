import { Box, Button, Typography } from "@mui/material";
import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import ComponentToPrint from "./Templates/ComponentToPrint";
import styles from "./styles";

const PrintDiv = ({ row }) => {
  const classes = styles();

  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Box className={classes.container}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"end"}
        mb={2}
      >
        <Typography fontWeight={"600"} fontSize={"13px"}>
          Print Preview
        </Typography>
        <Box display={"flex"} columnGap={"10px"}>
          <Button variant="darkGreen">Send Invoice</Button>
          <Button variant="blue" onClick={handlePrint}>
            Print
          </Button>
        </Box>
      </Box>
      <Box className={classes.divContainer}>
        <ComponentToPrint row={row} ref={componentRef} />
      </Box>
    </Box>
  );
};

export default PrintDiv;
