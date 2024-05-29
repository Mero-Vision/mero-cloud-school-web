import styled from "@emotion/styled";
import { Add, Apartment, ExpandMore } from "@mui/icons-material";
import {
   Box,
   Collapse,
   CssBaseline,
   IconButton,
   List,
   ListItem,
   ListItemButton,
   ListItemIcon,
   ListItemText,
   Typography,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import * as React from "react";
import { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import AllModals from "../../../components/common/AllModals/AllModals";
import { FirmSidebarConstants } from "../../../constants/FirmSidebarConstants";
import useStyles from "../styles";

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

export default function FirmDashboardSideBar() {
   const classes = useStyles();
   const [open, setOpen] = React.useState(
      sessionStorage.getItem("active")
   );

   const { pathname } = useLocation();
   const { user } = useSelector((state) => state?.auth);
   const FIRM = useMemo(() => user?.accounting_firms?.[0], [user]);

   return (
      <Box
         sx={{
            display: "flex",
            "& .MuiDrawer-paper": { border: "none" },
         }}
      >
         <CssBaseline />

         <Drawer variant="permanent" open>
            <Box className={classes.drawer}>
               <DrawerHeader>
                  <Box className={classes.drawerHeader}>
                     {/* <img src={Logo} /> */}
                     <Box>
                        <Typography
                           fontWeight={600}
                           fontSize={"13px"}
                           sx={{ lineHeight: 1 }}
                        >
                           {FIRM?.name ?? "-"}
                        </Typography>

                        <Typography
                           fontWeight={500}
                           fontSize={"11px"}
                        >
                           Dillibazar, Kathmandu
                        </Typography>
                     </Box>
                  </Box>
               </DrawerHeader>
               <Box className={classes.drawerContent}>
                  {/* <CustomPopover
              ButtonComponent={
                <Box width={"100%"}>
                  <Button variant="contained" startIcon={<Add />} fullWidth>
                    Add New
                  </Button>
                </Box>
              }
              component={<AddAll />}
            /> */}
               </Box>
               {FirmSidebarConstants?.map((row, index) => (
                  <List
                     key={row?.header}
                     subheader={
                        <Box
                           sx={{
                              fontSize: "11px",
                              padding: "5px 12px",
                           }}
                        >
                           {row?.header}{" "}
                        </Box>
                     }
                     sx={{ mb: "1rem" }}
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
                                 !item?.children?.length && item?.url
                              }
                              className={
                                 pathname?.endsWith(item?.url)
                                    ? classes.activeClass
                                    : {}
                              }
                           >
                              {({ isActive }) => (
                                 <ListItemButton
                                    className={classes.listItemButton}
                                    // onClick={() =>
                                    //   item?.children?.length !== 0
                                    //     ? handleClick(item)
                                    //     : handleClick()
                                    // }
                                    style={{
                                       background:
                                          open === item?.label &&
                                          "#f6f6f6",
                                    }}
                                 >
                                    <ListItemIcon
                                       sx={{
                                          minWidth: 0,
                                          mr: 2,
                                          justifyContent: "center",
                                       }}
                                    >
                                       <img
                                          src={
                                             isActive
                                                ? item?.children
                                                     ?.length
                                                   ? item?.children?.some(
                                                        (
                                                           nestedItem
                                                        ) =>
                                                           window.location.pathname.includes(
                                                              nestedItem?.url
                                                           )
                                                     )
                                                      ? item?.activeIcon
                                                      : item?.icon
                                                   : item?.activeIcon
                                                : item?.icon
                                          }
                                       />
                                    </ListItemIcon>

                                    <ListItemText
                                       primary={item?.label}
                                    />
                                    {item?.children?.length !== 0 && (
                                       <ExpandMore
                                          sx={{
                                             transition:
                                                "transform 0.3s",
                                             transform:
                                                open === item?.label
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
                              <Box className={classes.childContainer}>
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
               ))}
               <Box>
                  <ListItem
                     disablePadding
                     sx={{
                        display: "block",
                        // paddingBottom: "5px",
                        backgroundColor: "#f3f3f3",
                        marginTop: "0px",
                        // boxShadow: "5px 5px 5px 2px #f3f3f3",
                     }}
                     className={classes.nav}
                  >
                     <NavLink to={"/switch-branch"}>
                        <ListItemButton>
                           <ListItemIcon style={{ minWidth: "30px" }}>
                              <Apartment
                                 style={{ color: "#121127" }}
                              />
                           </ListItemIcon>
                           <ListItemText
                              primary={"Switch Company"}
                              style={{ fontSize: "13px" }}
                           />
                        </ListItemButton>
                     </NavLink>
                  </ListItem>
               </Box>
            </Box>
         </Drawer>
      </Box>
   );
}

const ChildComponent = ({ child, classes }) => {
   const [hover, setHover] = React.useState(false);
   const [open, setOpen] = useState(false);
   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };

   return (
      <>
         <List
            key={child?.label}
            component="div"
            disablePadding
            sx={{ paddingBottom: "5px" }}
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
                     <IconButton
                        onClick={handleOpen}
                        className={classes.iconButton}
                        sx={{
                           visibility: hover ? "visible" : "hidden",
                        }}
                     >
                        {<Add />}
                     </IconButton>
                  </ListItemButton>
               )}
            </NavLink>
         </List>
         <AllModals
            modalType={child?.url?.split("/")?.pop()}
            open={open}
            handleClose={() => handleClose()}
         />
      </>
   );
};
