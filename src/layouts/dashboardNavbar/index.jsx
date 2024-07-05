import { Sync } from "@mui/icons-material";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import CustomBreadcrumbs from "../../components/common/CustomBreadcrumbs/CustomBreadcrumbs";
import TextTooltip from "../../components/common/CustomTooltips/TextTooltip";
import HasPermission from "../../components/common/Permissions/HasPermission";
import { getCompanyDetail, isPwa } from "../../utils/helpers";
import AccountMenu from "./AccountMenu";
import useStyles from "./Styles";

const Navbar = () => {
   const classes = useStyles();
   const location = useLocation();
   const paths = location.pathname.split("/").filter(Boolean);
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);
   const { company } = useSelector((state) => state?.utils);
   const { user } = useSelector((state) => state?.auth);
   const COMPANY = useMemo(() => company, [company]);
   const [IsCompany, setIsCompany] = useState();

   useEffect(() => {
      const item = JSON.parse(
         localStorage.getItem("is_company") || "{}"
      );
      setIsCompany(item);
   }, [localStorage.getItem("is_company")]);

   const navigate = useNavigate();

   const companyBranchAddress = getCompanyDetail()?.branchAddress;
   console.log("ldnlasldjaslldkasj", { user, companyBranchAddress });

   return (
      <Box className={classes.root}>
         <Box className={classes.header}>
            <Box className={classes.main}>
               {paths?.length
                  ? paths?.slice(-1)?.toString()?.replaceAll("-", " ")
                  : "Dashboard"}
               {/* // : `Hi ${user?.name || "User"}!`} */}
            </Box>
            <Box className={classes.breadcrumbs}>
               {" "}
               <CustomBreadcrumbs data={{ color: "#fff" }} />
            </Box>
         </Box>

         <Box className={classes.right}>
            <AccountMenu IsCompany={IsCompany} />
            {/* {IsCompany && ( */}
            <HasPermission of="company-pos-view">
               <Button
                  variant="outlined"
                  sx={{ color: "#4559BD !important" }}
                  onClick={() =>
                     isPwa()
                        ? window.location.replace("/pos")
                        : window.open("/pos")
                  }
               >
                  POS
               </Button>
            </HasPermission>
            <Box
               className="companyDiv"
               onClick={() => navigate("/switch-branch")}
               sx={{ cursor: "pointer" }}
            >
               {/* <Box>
                  <Typography className="login" textAlign={"end"}>
                     Logged In {IsCompany ? "Company" : "Firm"}
                  </Typography>
               </Box> */}
               <Box className="company">
                  <Tooltip title="Switch Company">
                     <Sync className="title" />
                  </Tooltip>
                  <Box>
                     <Typography className="name">
                        <TextTooltip
                           data={{
                              title: user?.company?.display_name,
                           }}
                        />
                     </Typography>
                     <Typography
                        sx={{ fontSize: "10px", color: "#6D6F73" }}
                     >
                        {/* {user?.company?.address} */}
                        {companyBranchAddress || "-"}
                     </Typography>
                  </Box>
               </Box>
            </Box>
            {/* )} */}
         </Box>
      </Box>
   );
};

export default Navbar;

const LinkComponent = ({ row }) => {};
