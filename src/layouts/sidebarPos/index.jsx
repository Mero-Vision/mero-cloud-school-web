import { ExpandLess, ExpandMore } from "@mui/icons-material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import PeopleAltOutlined from "@mui/icons-material/PeopleAltOutlined";
import RestaurantOutlinedIcon from "@mui/icons-material/RestaurantOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";
import TextSnippetOutlinedIcon from "@mui/icons-material/TextSnippetOutlined";
import {
   Box,
   Collapse,
   List,
   ListItemButton,
   ListItemIcon,
   ListItemText,
} from "@mui/material";
import { Fragment, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../../assets/logo.png";
import { sidebarConstants } from "../../constants/constants";

const getHeader = (menu) => {
   return menu.toLowerCase().split(" ").join("-");
};

const Sidebar = () => {
   const location = useLocation();
   const pathnames = location.pathname.split("/");
   const [expandMenu, setExpandMenu] = useState(pathnames[1]);

   const handleClick = (menu) => {
      let header = getHeader(menu);
      if (header === expandMenu) {
         setExpandMenu("");
      } else {
         setExpandMenu(header);
      }
   };

   return (
      <Box
         sx={{
            position: "fixed",
            top: "0",
            left: "0",
            // padding: "20px",
            width: "220px",
            // height: "calc(100vh - 75px)",
            height: "100vh",
            overflow: "auto",
            flexShrink: "0",
            boxShadow: "-10px 20px 29px rgba(0,0,0,0.5)",
         }}
      >
         <Box
            sx={{
               padding: "20px",
               "& img": { width: "70px", height: "70px" },
            }}
         >
            <img src={logo} alt="Restaurant logo" />
         </Box>
         <List
            sx={{
               "& .active": {
                  "& .MuiButtonBase-root": {
                     background: (theme) =>
                        theme.palette.secondary.main,
                     "& .MuiListItemIcon-root": {
                        color: "white",
                     },
                     "& .MuiListItemText-root": {
                        color: "white",
                     },
                     "& .MuiSvgIcon-root": {
                        color: "white",
                     },
                  },
               },
            }}
         >
            {sidebarConstants.map((list, index) =>
               list.menu ? (
                  <Fragment key={index}>
                     <ListItemButton
                        onClick={() => handleClick(list.label)}
                     >
                        <ListItemIcon>
                           {getIcon(list.label)}
                        </ListItemIcon>
                        <ListItemText primary={list?.label} />
                        {expandMenu === getHeader(list.label) ? (
                           <ExpandLess />
                        ) : (
                           <ExpandMore />
                        )}
                     </ListItemButton>
                     <Collapse
                        in={expandMenu === getHeader(list.label)}
                        timeout="auto"
                        unmountOnExit
                     >
                        {list.menu.map((item) => (
                           <NavLink to={item.url} key={item.label}>
                              <List component="div" disablePadding>
                                 <ListItemButton sx={{ pl: "50px" }}>
                                    {/* <ListItemIcon>{getIcon(item.label)}</ListItemIcon> */}
                                    <ListItemText
                                       primary={item.label}
                                    />
                                 </ListItemButton>
                              </List>
                           </NavLink>
                        ))}
                     </Collapse>
                  </Fragment>
               ) : (
                  <NavLink
                     to={list?.url}
                     key={list.label}
                     target={
                        list.url === "/restaurant-pos" ? "_blank" : ""
                     }
                  >
                     <ListItemButton>
                        <ListItemIcon>
                           {getIcon(list.label)}
                        </ListItemIcon>
                        <ListItemText primary={list?.label} />
                     </ListItemButton>
                  </NavLink>
               )
            )}
         </List>
      </Box>
   );
};

function getIcon(label) {
   switch (label) {
      case "Dashboard":
         return <HomeOutlinedIcon />;
      case "Restaurant POS":
         return <RestaurantOutlinedIcon />;
      case "User Management":
         return <AccountCircleOutlinedIcon />;
      case "Sessions":
         return <PendingActionsIcon />;
      case "Customers":
         return <PeopleAltOutlined />;

      case "Products":
         return <InventoryOutlinedIcon />;
      case "Table Management":
         return <TableRestaurantOutlinedIcon />;
      case "Orders":
         return <ChecklistOutlinedIcon />;
      case "Reports":
         return <TextSnippetOutlinedIcon />;
      case "Settings":
         return <SettingsIcon />;
      default:
         return "";
   }
}

export default Sidebar;
