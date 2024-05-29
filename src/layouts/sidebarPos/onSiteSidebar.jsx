import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import cashierImage from "../../assets/images/sidebar/cashier2.png";
import customerImage from "../../assets/images/sidebar/eating.png";
import kotImage from "../../assets/images/sidebar/kot-image.png";
// import logOutIcon from "../../assets/images/sidebar/log-out.svg";
import orderImage from "../../assets/images/sidebar/order.png";
// import settingImage from "../../assets/images/sidebar/setting.png";
import settingImage from "../../assets/images/sidebar/profile2.png";
import tableImage from "../../assets/images/sidebar/table3.png";
import logoPos from "../../assets/logo.png";
import ConfirmationModal from "../../components/common/CustomModal/ConfirmationModal";
import { getCompanyDetail } from "../../utils/helpers";

const sidebarData = [
   {
      id: 1,
      image: tableImage,
      label: "Table",
      link: "",
   },
   {
      id: 2,
      image: kotImage,
      label: "KOT",
      link: "kot",
   },
   {
      id: 3,
      image: orderImage,
      label: "Order",
      link: "order",
   },
   {
      id: 4,
      image: cashierImage,
      label: "Cashier",
      link: "cashier",
   },
   {
      id: 5,
      image: customerImage,
      label: "Customer",
      link: "customer",
   },
   {
      id: 6,
      image: settingImage,
      label: "Profile   ",
      link: "settings",
   },
];

export default function OnSiteSidebar() {
   const [activeLink, setActiveLink] = useState();
   const theme = useTheme();
   const navigate = useNavigate();
   const location = useLocation();
   const [anchorEl, setAnchorEl] = useState(null);
   const open = Boolean(anchorEl);

   useEffect(() => {
      const currentLink = location.pathname?.split("/")[2];
      if (currentLink) {
         setActiveLink(currentLink);
      } else {
         setActiveLink("");
      }
   }, [location.pathname]);

   const handleLogOut = () => {
      localStorage.clear();
      window.location.replace(`/login`);
   };

   const handleClick = (link) => {
      setActiveLink(link);
      navigate(link);
   };

   const roles = getCompanyDetail()?.roles;
   const token = getCompanyDetail()?.token;

   const permissions = getCompanyDetail()?.permissions;

   const handleClickDashboard = () => {
      if (
         roles?.includes("admin") ||
         (token && permissions.includes("company-panel-view"))
      ) {
         navigate(`/`);
      }
   };

   const handleClickLogout = (event) => {
      setAnchorEl(event.currentTarget);
   };
   const handleCloseLogout = () => {
      setAnchorEl(null);
   };

   // const permissions = ["kot", "customer", "order-view"];

   // const sidebarDataFiltered = sidebarData
   //    .filter(
   //       (item) =>
   //          permissions.includes("pos-cashier-tab-view") ||
   //          item.label !== "Cashier"
   //    )
   //    .filter(
   //       (item) =>
   //          permissions.includes("kot-list") || item.label !== "KOT"
   //    )
   //    .filter(
   //       (item) =>
   //          permissions.includes("order-list") ||
   //          item.label !== "Order"
   //    )
   //    .filter(
   //       (item) =>
   //          permissions.includes("customer-list") ||
   //          item.label !== "Customer"
   //    );

   const sidebarDataFiltered = sidebarData
      .filter((item) => {
         if (roles?.includes("admin") && token) {
            return true; // Allow all items if the user is an admin
         } else {
            return (
               permissions.includes("pos-cashier-tab-view") ||
               item.label !== "Cashier"
            );
         }
      })
      // .filter(
      //    (item) =>
      //       permissions.includes("pos-cashier-tab-view") ||
      //       item.label !== "Cashier"
      // )
      .filter((item) => {
         if (roles?.includes("admin") && token) {
            return true; // Allow all items if the user is an admin
         } else {
            return (
               permissions.includes("order-list") ||
               item.label !== "KOT"
            );
         }
      })
      .filter((item) => {
         if (roles?.includes("admin") && token) {
            return true; // Allow all items if the user is an admin
         } else {
            return (
               permissions.includes("order-list") ||
               item.label !== "Order"
            );
         }
      })
      .filter((item) => {
         if (roles?.includes("admin") && token) {
            return true; // Allow all items if the user is an admin
         } else {
            return (
               permissions.includes("customer-list") ||
               item.label !== "Customer"
            );
         }
      });

   console.log({ sidebarDataFiltered });

   return (
      <Box sx={{ height: "100vh", padding: "12px 0px 12px 12px" }}>
         <Box
            component={"aside"}
            sx={{
               width: "100px",
               padding: "5px 10px",
               // background: "#FFFBFB",
               background: "#fff",
               height: "100%",
               borderRadius: "22px",
               display: "flex",
               flexDirection: "column",
               position: "sticky",
               top: 0,
               boxShadow: "0px 0px 14px rgba(0, 0, 0, 0.04)",
            }}
         >
            <Box
               onClick={handleClickDashboard}
               className="header"
               sx={{
                  textAlign: "center",
                  cursor: "pointer",
                  "& img": { width: "35px", height: "35px" },
                  marginTop: "1.7rem",
               }}
            >
               <img
                  src={logoPos}
                  alt=""
                  sx={{ filter: "hue-rotate(0deg) !important" }}
               />
            </Box>
            <Box
               className="body"
               sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "18px",
                  mt: "30px",
               }}
            >
               {sidebarDataFiltered.map((data) => (
                  <SidebarItem
                     key={data.id}
                     data={data}
                     isActive={data.link === activeLink}
                     clickHandler={() => handleClick(data.link)}
                  />
               ))}
            </Box>

            {/* <Box
               className="sidebar-footer"
               sx={{ mt: "18px", mb: "95px" }}
            >
               <IconButton
                  onClick={handleClickLogout}
                  sx={{
                     width: "80px",
                     height: "71px",
                     marginTop: "auto",
                     borderRadius: "7px",
                     flexDirection: "column",
                  }}
               >
                  <img src={logOutIcon} alt="Log out" />
                  <Typography
                     sx={{
                        fontSize: "12px",
                        color: theme.palette.grey[500],
                     }}
                  >
                     Logout
                  </Typography>
               </IconButton> 
            </Box>*/}
         </Box>
         <ConfirmationModal
            anchorEl={anchorEl}
            open={open}
            handleClose={handleCloseLogout}
            handleAction={() => handleLogOut()}
            title="Are you sure you want to logout?"
            buttonText={"Logout"}
         />
      </Box>
   );
}

function SidebarItem({ data, clickHandler, isActive }) {
   const theme = useTheme();

   const getBackground = () => (isActive ? "#FEF2F2" : "#fff");
   const getBorder = () =>
      isActive ? `2px solid ${theme.palette.yellow.main}` : "";
   const getTextColor = () =>
      isActive ? theme.palette.yellow.main : theme.palette.grey[500];

   return (
      <IconButton
         onClick={clickHandler}
         sx={{
            display: "flex",
            flexDirection: "column",
            padding: "7px 20.5px 9.5px",
            width: "80px",
            height: "71px ",
            background: getBackground(),
            border: getBorder(),
            borderRadius: "7px",
            "& img": {
               maxWidth: "39px",
               height: "100%",
            },
         }}
      >
         <img src={data.image} alt="" height={39} width={39} />
         <Typography
            sx={{
               fontSize: "13px",
               fontWeight: isActive ? 700 : 500,
               color: getTextColor(),
            }}
         >
            {data.label}
         </Typography>
      </IconButton>
   );
}
