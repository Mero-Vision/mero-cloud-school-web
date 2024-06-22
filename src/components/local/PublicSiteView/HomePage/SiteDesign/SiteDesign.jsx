import React from "react";

import ClearAllRoundedIcon from "@mui/icons-material/ClearAllRounded";
import FilterDramaIcon from "@mui/icons-material/FilterDrama";
import SupportAgentRoundedIcon from "@mui/icons-material/SupportAgentRounded";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import { Box, Grid } from "@mui/material";
import CommonCenterDiv from "../../../../common/CommomDivComponents/CommonCenterDiv";
import "./SiteDesign.css";
const SiteDesign = () => {
   const features = [
      {
         title: (
            <Box className={"cardTitleMain"}>
               <Box
                  className="cardTitle"
                  sx={{
                     textAlign: "center",
                     marginBottom: "20px",
                     fontSize: "18px",
                     fontWeight: 500,
                     color: "#020C1C",
                  }}
               >
                  Cloud-Based
               </Box>
            </Box>
         ),
         subtitle: (
            <Box
               sx={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#A0A9A5",
               }}
               className="cardSubtitle"
            >
               We use the latest and greatest servers to secure your
               data.
            </Box>
         ),
         icon: (
            <FilterDramaIcon
               sx={{ color: "#0D48A5", fontSize: "42px" }}
               className="icon"
            />
         ),
      },
      {
         title: (
            <Box className={"cardTitleMain"}>
               <Box
                  className="cardTitle"
                  sx={{
                     textAlign: "center",
                     marginBottom: "20px",
                     fontSize: "18px",
                     fontWeight: 500,
                     color: "#020C1C",
                  }}
               >
                  Exceptional Support
               </Box>
            </Box>
         ),
         subtitle: (
            <Box
               sx={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#A0A9A5",
               }}
               className="cardSubtitle"
            >
               We have a support team of 15+ members, available 24
               hours.
            </Box>
         ),
         icon: (
            <SupportAgentRoundedIcon
               sx={{ color: "#0D48A5", fontSize: "42px" }}
               className="icon"
            />
         ),
      },
      {
         title: (
            <Box className={"cardTitleMain"}>
               <Box
                  className="cardTitle"
                  sx={{
                     textAlign: "center",
                     marginBottom: "20px",
                     fontSize: "18px",
                     fontWeight: 500,
                     color: "#020C1C",
                  }}
               >
                  Simplicity
               </Box>
            </Box>
         ),
         subtitle: (
            <Box
               sx={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#A0A9A5",
               }}
               className="cardSubtitle"
            >
               Our system is designed with ease of use in mind.
            </Box>
         ),
         icon: (
            <ClearAllRoundedIcon
               sx={{ color: "#0D48A5", fontSize: "42px" }}
               className="icon"
            />
         ),
      },
      {
         title: (
            <Box className={"cardTitleMain"}>
               <Box
                  className="cardTitle"
                  sx={{
                     textAlign: "center",
                     marginBottom: "20px",
                     fontSize: "18px",
                     fontWeight: 500,
                     color: "#020C1C",
                  }}
               >
                  Extreme Security
               </Box>
            </Box>
         ),
         subtitle: (
            <Box
               sx={{
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#A0A9A5",
               }}
               className="cardSubtitle"
            >
               Our system is regularly security audited and has
               detailed access-level.
            </Box>
         ),
         icon: (
            <VerifiedUserOutlinedIcon
               sx={{ color: "#0D48A5", fontSize: "42px" }}
               className="icon"
            />
         ),
      },
   ];
   return (
      <Box sx={{ backgroundColor: "#fff !important" }}>
         <CommonCenterDiv>
            <Box sx={{ marginTop: "80px" }}>
               <Grid container spacing={4}>
                  {features?.map((item, index) => (
                     <Grid
                        item
                        xs={12}
                        sm={6}
                        md={6}
                        lg={3}
                        key={index}
                        sx={{ width: "100% !important" }}
                     >
                        <CardComponent data={item} />
                     </Grid>
                  ))}
               </Grid>
            </Box>
         </CommonCenterDiv>
      </Box>
   );
};

const CardComponent = ({ data }) => {
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#fff !important",
            boxShadow: "0 .625rem 3.75rem 0 rgba(40, 54, 73, .1)",
            padding: "44px 30px",
            height: "280px",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s ease-in-out",
            width: "100% !important",

            "&:hover": {
               padding: "44px 30px",

               marginTop: "-20px !important",
               background:
                  "linear-gradient(120deg, #0D48A5, #2a77ed) !important",
               color: "#fff !important",
               "& .icon": {
                  color: "#fff !important",
                  transition: "0.3s ease-in-out",
                  marginTop: "-5px !important",
               },
               "& .cardSubtitle": {
                  color: "#fff !important",
                  transition: "0.3s ease-in-out",
                  marginTop: "-5px !important",
               },
               "& .cardTitle": {
                  color: "#fff !important",
                  transition: "0.1s ease-in-out",
               },
               "& .cardTitleMain": {
                  transition: "0.3s ease-in-out",
                  marginTop: "-5px !important",
               },
            },
         }}
      >
         <Box sx={{ textAlign: "center", marginBottom: "20px" }}>
            {data?.icon}
         </Box>
         <Box>{data?.title}</Box>
         <Box>{data?.subtitle}</Box>
      </Box>
   );
};

export default SiteDesign;
