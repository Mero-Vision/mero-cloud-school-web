import { ExpandMore } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/meroSchoolLogo.png";
import AllModals from "../../components/common/AllModals/AllModals";
import { SidebarConstants } from "../../constants/SidebarConstants";
import useCheckRole from "../../hooks/useCheckRole";
import useHasPermission from "../../hooks/useHasPermission";
import { isPwa } from "../../utils/helpers";
import useStyles from "./styles";

const drawerWidth = 220;

const openedMixin = (theme) => ({
   width: drawerWidth,
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
   }),
   overflowX: "hidden",
});

const closedMixin = (theme) => ({
   transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
   }),
   overflowX: "hidden",
   width: `calc(${theme.spacing(7)} + 1px)`,
   [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
   },
});

const DrawerHeader = styled("div")(({ theme }) => ({
   display: "flex",
   alignItems: "center",
   justifyContent: "center",
   ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
   shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
   width: drawerWidth,
   flexShrink: 0,
   whiteSpace: "nowrap",
   boxSizing: "border-box",
   ...(open && {
      ...openedMixin(theme),
      "& .MuiDrawer-paper": openedMixin(theme),
   }),
   ...(!open && {
      ...closedMixin(theme),
      "& .MuiDrawer-paper": closedMixin(theme),
   }),
}));

export default function Sidebar() {
   const classes = useStyles();
   const { search, pathname } = useLocation();
   const { checkRole } = useCheckRole();
   const { hasPermission } = useHasPermission();
   const businessService = JSON.parse(
      localStorage?.getItem("business_service") || "{}"
   );

   const [open, setOpen] = React.useState(
      sessionStorage.getItem("active")
   );
   const handleClick = (item) => {
      sessionStorage.setItem(
         "active",
         open === item?.label ? "" : item?.label
      );
      setOpen((prev) => (prev === item?.label ? "" : item?.label));
   };

   console.log({ search, pathname });

   const getClassName = (isActive, item) => {
      return isActive
         ? item?.children?.length
            ? item?.children?.some((nestedItem) =>
                 window.location.pathname.includes(nestedItem.url)
              )
               ? classes.activeClass
               : classes.inactiveClass
            : classes.activeClass
         : classes.inactiveClass;
   };

   const getIcon = (isActive, item) => {
      return isActive
         ? item?.children?.length
            ? item?.children?.some((nestedItem) =>
                 window.location.pathname.includes(nestedItem.url)
              )
               ? item?.activeIcon
               : item?.icon
            : item?.activeIcon
         : item?.icon;
   };

   return (
      <Box
         sx={{
            display: "flex",
            backgroundColor: " #F9F9FB !important",
            "& .MuiDrawer-paper": {
               border: "none",
               backgroundColor: "#4e7683 !important",
               margin: "18px",
               borderRadius: "18px",
               paddingBottom: "20px",
               height: "calc(100vh - 36px)",
            },
         }}
      >
         <CssBaseline />

         <Drawer variant="permanent" open>
            <Box className={classes.drawer}>
               <DrawerHeader>
                  <Box className={classes.drawerHeader}>
                     <img src={Logo} style={{ width: "100%" }} />
                     <Box>
                        {/* <Typography
                           fontWeight={600}
                           fontSize={"16px"}
                           sx={{ lineHeight: 1.3 }}
                        >
                           Mero School{" "}
                        </Typography> */}

                        {/* <Typography
                           fontWeight={500}
                           fontSize={"11px"}
                        >
                           Jhamsikhel, Lalitpur
                        </Typography> */}
                     </Box>
                  </Box>
               </DrawerHeader>

               {SidebarConstants?.map((row, index) => {
                  const headerKey =
                     row?.roleName && row?.roleName.toLowerCase();
                  const roleLabel =
                     Array.isArray(businessService) &&
                     businessService?.find(
                        (item) => item?.title == headerKey
                     );

                  console.log({
                     roleLabel,
                     headerKey,
                     businessService,
                  });

                  if (!row?.roleName || roleLabel) {
                     return (
                        // <HasPermission
                        //    of={row?.permission}
                        // >
                        <List
                           key={row?.header}
                           subheader={
                              <Box
                                 sx={{
                                    fontSize: "11px",
                                    padding: "5px  12px 0px 12px",
                                 }}
                              >
                                 {row?.header}
                              </Box>
                           }
                           sx={{}}
                        >
                           {row?.items?.map((item, index) => (
                              <ListItem
                                 key={item?.label}
                                 disablePadding
                                 sx={{
                                    display: "block",
                                    paddingBottom: "5px",
                                 }}
                                 className={classes.nav}
                              >
                                 <NavLink
                                    to={
                                       !item?.children?.length
                                          ? item?.url
                                          : search
                                          ? search
                                          : pathname
                                    }
                                    target={
                                       item.url === "/pos"
                                          ? isPwa()
                                             ? ""
                                             : "_blank"
                                          : ""
                                    }
                                    className={({ isActive }) =>
                                       getClassName(isActive, item)
                                    }
                                 >
                                    {({ isActive }) => (
                                       <ListItemButton
                                          className={
                                             classes.listItemButton
                                          }
                                          onClick={() =>
                                             item?.children
                                                ?.length !== 0
                                                ? handleClick(item)
                                                : handleClick()
                                          }
                                          style={{
                                             background:
                                                open ===
                                                   item?.label &&
                                                "#f6f6f6",
                                             color:
                                                open ===
                                                   item?.label &&
                                                "#000",
                                             borderRadius: "8px",
                                          }}
                                       >
                                          <ListItemIcon
                                             sx={{
                                                width: "20px",
                                                height: "20px",
                                                minWidth: 0,
                                                mr: 1.5,
                                                justifyContent:
                                                   "center",
                                             }}
                                          >
                                             <img
                                                src={getIcon(
                                                   isActive,
                                                   item
                                                )}
                                             />
                                          </ListItemIcon>

                                          <ListItemText
                                             primary={item?.label}
                                          />
                                          {item?.children?.length !==
                                             0 && (
                                             <ExpandMore
                                                sx={{
                                                   transition:
                                                      "transform 0.3s",
                                                   transform:
                                                      open ===
                                                      item?.label
                                                         ? "rotate(-180deg)"
                                                         : "rotate(0deg)",
                                                }}
                                             />
                                          )}
                                       </ListItemButton>
                                    )}
                                 </NavLink>

                                 <Collapse
                                    in={open === item?.label}
                                    timeout="auto"
                                    unmountOnExit
                                 >
                                    <Box
                                       className={
                                          classes.childContainer
                                       }
                                    >
                                       {item?.children?.map(
                                          (child, index) => (
                                             <ChildComponent
                                                child={child}
                                                key={index}
                                                classes={classes}
                                             />
                                          )
                                       )}
                                    </Box>
                                 </Collapse>
                              </ListItem>
                           ))}
                        </List>
                        // </HasPermission>
                     );
                  } else {
                     return null; // If row has roleName but roleLabel is not found, do not render
                  }
               })}
            </Box>
         </Drawer>
      </Box>
   );
}

const ChildComponent = ({ child, classes }) => {
   const navigate = useNavigate();
   const [hover, setHover] = React.useState(false);
   const [open, setOpen] = useState(false);
   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   return (
      <Box>
         {/* <HasPermission of={child?.permission}> */}
         <List
            key={child?.label}
            component="div"
            disablePadding
            sx={{ paddingBottom: "5px", display: "flex" }}
            className={classes.nav}
            onMouseOver={() => setHover(true)}
            onMouseOut={() => setHover(false)}
         >
            <NavLink to={child?.url}>
               {({ isActive }) => (
                  <ListItemButton
                     className={[
                        classes.listItemButtonChild,
                        isActive && classes.activeChildClass,
                     ]}
                  >
                     <ListItemText
                        primary={child?.label}
                        className="active"
                     />
                  </ListItemButton>
               )}
            </NavLink>
            {/* <IconButton
               onClick={() =>
                  child?.pageUrl
                     ? navigate(child?.pageUrl)
                     : handleOpen()
               }
               className={classes.iconButton}
               sx={{
                  visibility: hover ? "visible" : "hidden",
               }}
            >
               {<Add />}
            </IconButton> */}
         </List>
         {/* </HasPermission> */}
         <AllModals
            modalType={child?.url?.split("/")?.pop()}
            open={open}
            handleClose={() => handleClose()}
         />
      </Box>
   );
};
