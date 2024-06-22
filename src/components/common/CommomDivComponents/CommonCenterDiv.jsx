import { Box } from "@mui/material";
import React from "react";
import CommonSectionHeading from "../CommonSectionHeading/CommonSectionHeading";
import styles from "./style";

const CommonCenterDiv = ({ children }) => {
   const classes = styles();
   return (
      <>
         <Box className={classes.commonCenterDiv}>
            <CommonSectionHeading>
               <Box className={classes.commonCenterDivTitleBox}>
                  <Box className="commonCenterDivTitle">
                     Developed with The applicant in mind
                  </Box>
                  <Box className="commonCenterDivSubtitle">
                     Mero Cloud School handles every aspect of
                     schools, so you can get back to doing what
                     matters the most
                  </Box>
               </Box>
            </CommonSectionHeading>
            <Box>{children}</Box>
         </Box>
      </>
   );
};

export default CommonCenterDiv;
