import { Box, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import template1 from "../../../assets/templates/invoice/template1.jpg";
import template2 from "../../../assets/templates/invoice/template2.jpg";
import template3 from "../../../assets/templates/invoice/template3.jpg";
import { setTemplate } from "../../../rootRedux/utilsSlice";
import styles from "./styles";

const templatesArray = [
  { src: template1, name: "template1" },
  { src: template2, name: "template2" },
  { src: template3, name: "template3" },
];

const PrintTemplates = () => {
  const classes = styles();
  const dispatch = useDispatch();
  const { template } = useSelector((state) => state?.utils);

  const handleSelect = (item) => {
    dispatch(setTemplate(item?.name));
  };

  console.log({ template });
  return (
    <Box className={classes.templates}>
      <Box>
        <Typography style={{ fontSize: "14px", fontWeight: "500" }}>
          Select Template
        </Typography>
      </Box>
      {templatesArray?.map((item) => (
        <Box
          key={item?.src}
          className="imageDiv"
          onClick={() => handleSelect(item)}
        >
          <img
            src={item?.src}
            style={{
              border:
                template?.toLowerCase() === item?.name?.toLowerCase() &&
                "2px solid #339AA2",
            }}
          />
        </Box>
      ))}
    </Box>
  );
};

export default PrintTemplates;
