import { CloseIcon } from "@chakra-ui/icons";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Box,
   MenuItem,
   Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import PaymentMethodBox from "./PaymentMethodBox";

import logo from "../../assets/meroSchoolLogo.png";

const Navbar = () => {
   const navigate = useNavigate();
   const [click, setClick] = useState(false);
   const [navBackground, setNavBackground] = useState(false);
   const [windowWidth, setWindowWidth] = useState(window.innerWidth);
   const [menuAnchorEl, setMenuAnchorEl] = useState(null);
   const [currentMenu, setCurrentMenu] = useState(null);

   const [expanded, setExpanded] = useState(false);

   const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
   };

   const handleScroll = () => {
      setNavBackground(window.scrollY > 80);
   };

   const handleResize = () => {
      setWindowWidth(window.innerWidth);
   };

   useEffect(() => {
      window.addEventListener("scroll", handleScroll);
      window.addEventListener("resize", handleResize);
      return () => {
         window.removeEventListener("scroll", handleScroll);
         window.removeEventListener("resize", handleResize);
      };
   }, []);

   const handleClick = () => {
      setClick(!click);
      setCurrentMenu();
      setExpanded(false);

      if (!click) {
         document.body.classList.add("no-scroll");
      } else {
         document.body.classList.remove("no-scroll");
      }
   };

   const handleNavigate = (link) => {
      navigate(link);
      setClick(false);
      document.body.classList.remove("no-scroll");
   };

   const handleMenuOpen = (event, menu) => {
      setMenuAnchorEl(event.currentTarget);
      setCurrentMenu(menu);
   };

   const handleMenuToggle = (event, menu) => {
      if (currentMenu === menu) {
         setMenuAnchorEl(null);
         setCurrentMenu(null);
      } else {
         setMenuAnchorEl(event.currentTarget);
         setCurrentMenu(menu);
      }
   };

   const sideBarMenuData = [
      {
         title: "Company",
         data: [
            {
               title: "Our Story",
               subtitle: "Who we are and our journey ",
               url: "/our-story",
            },
            {
               title: "Social Impact",
               subtitle: "Our approach and impact",
            },
            { title: "Career", subtitle: "Join our team" },
         ],
      },
      // { title: "Feature" },
      {
         title: "Products",
         data: [
            {
               title: "Mero Cloud School",
               subtitle:
                  "A complete School and College MIS and Digital Learning Platform.",
            },
            {
               title: "Snaax",
               subtitle:
                  "A complete Restaurant platform for ordering and management.",
            },
         ],
      },
      {
         title: "Resources",
         data: [
            {
               title: "Dealership Program",
               subtitle: "Partner with us",
            },
            {
               title: "Help center",
               subtitle: "Get answers on your Veda’s queries",
            },
            {
               title: "Blog",
               subtitle: "News, articles, updates and stories",
            },
            {
               title: "FAQ",
               subtitle: "Our most asked questions answered",
            },
         ],
      },
      {
         title: "Contact",
         data: [
            {
               title: "Contact Support",
               subtitle: "Reach out to our support team",
            },
            { title: "Contact Us", subtitle: "Reach out to us" },
         ],
      },
   ];

   const companyData = [
      { title: "Our Story", subtitle: "Who we are and our journey " },
      { title: "Social Impact", subtitle: "Our approach and impact" },
      { title: "Career", subtitle: "Join our team" },
   ];

   const productsData = [
      {
         title: "Mero Cloud School",
         subtitle:
            "A complete School and College MIS and Digital Learning Platform.",
      },
      {
         title: "Snaax",
         subtitle:
            "A complete Restaurant platform for ordering and management.",
      },
   ];

   const resourcesData = [
      { title: "Dealership Program", subtitle: "Partner with us" },
      {
         title: "Help center",
         subtitle: "Get answers on your Veda’s queries",
      },
      {
         title: "Blog",
         subtitle: "News, articles, updates and stories",
      },
      { title: "FAQ", subtitle: "Our most asked questions answered" },
   ];

   const contactData = [
      {
         title: "Contact Support",
         subtitle: "Reach out to our support team",
      },
      { title: "Contact Us", subtitle: "Reach out to us" },
   ];

   const renderDropdown = (menuData) => {
      return (
         <Box
            sx={{
               maxHeight: "0",
               opacity: "0",
               overflow: "hidden",
               transition: "max-height 0.3s ease, opacity 0.3s ease",
               ...(currentMenu && {
                  maxHeight: "500px", // or some appropriate value
                  opacity: "1",
               }),
            }}
         >
            {menuData?.map((item) => (
               <MenuItem
                  sx={{
                     width: "50% !important",
                  }}
                  key={item.title}
                  onClick={() => handleNavigate("/")}
               >
                  <Box
                     sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-start",
                        // alignItems: "flex-start",
                        padding: "0px 20px",
                        paddingLeft: "0px",
                        cursor: "pointer",
                        transition: "0.2s ease-in-out",
                        borderRadius: "8px",

                        "&:hover": {
                           backgroundColor: "#e7e8e8",
                        },
                     }}
                  >
                     <Typography
                        sx={{
                           width: "100%",
                           fontWeight: 400,
                           fontSize: "18px",
                           color: "#0a3a84",
                           lineHeight: 1,
                           textAlign: "start",
                        }}
                     >
                        {item?.title}
                     </Typography>
                  </Box>
               </MenuItem>
            ))}
         </Box>
      );
   };

   return (
      <>
         <header
            style={
               navBackground
                  ? {
                       boxShadow:
                          "0 0.8125rem 2.1875rem -0.75rem rgba(35, 35, 35, 0.15)",
                       position: "sticky",
                       top: 0,
                       zIndex: 100,
                    }
                  : {}
            }
         >
            <Box
               className={
                  navBackground ? "navbarBackground" : "navbar"
               }
            >
               <div className="logo">
                  <Box onClick={() => handleNavigate("/")}>
                     <img src={logo} alt="" />
                  </Box>
               </div>
               {windowWidth >= 1200 ? (
                  <ul className="nav-menu">
                     <li className="nav-item">
                        <div
                           onClick={(e) =>
                              handleMenuOpen(e, "company")
                           }
                           className={
                              navBackground
                                 ? "nav-link"
                                 : "nav-link-background"
                           }
                        >
                           <PaymentMethodBox
                              props={"company"}
                              menuData={companyData}
                           />
                        </div>
                     </li>
                     <li className="nav-item">
                        <div
                           onClick={() => handleNavigate("/")}
                           className={
                              navBackground
                                 ? "nav-link"
                                 : "nav-link-background"
                           }
                        >
                           Features
                        </div>
                     </li>

                     <li className="nav-item">
                        <div
                           onClick={(e) =>
                              handleMenuOpen(e, "products")
                           }
                           className={
                              navBackground
                                 ? "nav-link"
                                 : "nav-link-background"
                           }
                        >
                           <PaymentMethodBox
                              props={"products"}
                              menuData={productsData}
                           />
                        </div>
                     </li>
                     <li className="nav-item">
                        <div
                           onClick={(e) =>
                              handleMenuOpen(e, "resources")
                           }
                           className={
                              navBackground
                                 ? "nav-link"
                                 : "nav-link-background"
                           }
                        >
                           <PaymentMethodBox
                              props={"Resources"}
                              menuData={resourcesData}
                           />
                        </div>
                     </li>
                     <li className="nav-item">
                        <div
                           onClick={(e) =>
                              handleMenuOpen(e, "contact")
                           }
                           className={
                              navBackground
                                 ? "nav-link"
                                 : "nav-link-background"
                           }
                        >
                           <PaymentMethodBox
                              props={"Contact"}
                              menuData={contactData}
                           />
                        </div>
                     </li>
                     <li className="nav-item">
                        <Box
                           onClick={() => {
                              window.open("/login", "_blank");
                           }}
                           className={"hero-area-btn"}
                        >
                           Login
                        </Box>
                     </li>
                  </ul>
               ) : (
                  <div className="hamburger" onClick={handleClick}>
                     {!click && (
                        <MenuIcon
                           sx={{
                              color: "#0D48A5",
                              fontSize: "35px !important",
                           }}
                        />
                     )}
                  </div>
               )}
            </Box>
         </header>
         {windowWidth < 1200 && click && (
            <div className="mobileView">
               <ul className="nav-menu active">
                  <li className="nav-item">
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "space-between",
                           padding: "0.7rem",
                           paddingLeft: "0.5rem",
                        }}
                     >
                        <Box
                           onClick={() => {
                              navigate("/"), setClick(false);
                              document.body.classList.remove(
                                 "no-scroll"
                              );
                           }}
                           sx={{
                              color: "#0A3A84",
                              fontSize: "18px",
                              fontWeight: "600",
                              lineHeight: "1",
                           }}
                        >
                           <div style={{ width: "150px " }}>
                              <Box
                                 onClick={() => handleNavigate("/")}
                              >
                                 <img
                                    src={logo}
                                    alt=""
                                    style={{
                                       width: "100%",
                                       height: "100%",
                                    }}
                                 />
                              </Box>
                           </div>
                        </Box>
                        <div onClick={handleClick}>
                           {click && (
                              <CloseIcon
                                 sx={{
                                    fontSize: "20px !important",

                                    color: "#0D48A5",
                                 }}
                              />
                           )}
                        </div>
                     </Box>
                  </li>
                  <ul className="list-items">
                     <li className="nav-item">
                        {sideBarMenuData
                           ?.slice(0, 1)
                           ?.map((item, index) => (
                              <Accordian
                                 item={item}
                                 key={index}
                                 expanded={expanded}
                                 handleChange={handleChange}
                                 setClick={setClick}
                              />
                           ))}
                     </li>

                     <li className="nav-item">
                        <div
                           style={{
                              color: "#0A3A84",
                              paddingTop: "10px",
                           }}
                           onClick={() => handleNavigate("/")}
                           className={"nav-link"}
                        >
                           Features
                        </div>
                     </li>
                     <li className="nav-item">
                        {sideBarMenuData
                           ?.slice(1, 2)
                           ?.map((item, index) => (
                              <Accordian
                                 item={item}
                                 key={index}
                                 expanded={expanded}
                                 handleChange={handleChange}
                                 setClick={setClick}
                              />
                           ))}
                     </li>
                     <li className="nav-item">
                        {sideBarMenuData
                           ?.slice(2, 3)
                           ?.map((item, index) => (
                              <Accordian
                                 item={item}
                                 key={index}
                                 expanded={expanded}
                                 handleChange={handleChange}
                                 setClick={setClick}
                              />
                           ))}
                     </li>
                     <li className="nav-item">
                        {sideBarMenuData
                           ?.slice(3, 4)
                           ?.map((item, index) => (
                              <Accordian
                                 item={item}
                                 key={index}
                                 expanded={expanded}
                                 handleChange={handleChange}
                                 setClick={setClick}
                              />
                           ))}
                     </li>
                     <li className="nav-item">
                        <Box
                           onClick={() => {
                              window.open("/login", "_blank");
                           }}
                           className={"hero-area-btn"}
                        >
                           Login
                        </Box>
                     </li>
                  </ul>
               </ul>
            </div>
         )}
      </>
   );
};

const Accordian = ({ item, expanded, handleChange, setClick }) => {
   const navigate = useNavigate();
   return (
      <div>
         <Accordion
            elevation={0}
            expanded={expanded === item.title}
            onChange={handleChange(item.title)}
            sx={{
               "& .MuiAccordionSummary-root": {
                  padding: "0px ",
               },
               "& .MuiAccordionDetails-root": {
                  padding: "10px 0px 10px 10px ",

                  textAlign: "start",
                  borderBottom: "1px solid #e7e8e8",
                  "&:last-child": {
                     borderBottom: "none",
                  },
               },
            }}
         >
            <AccordionSummary
               expandIcon={<KeyboardArrowDownIcon />}
               aria-controls="panel1-content"
               id="panel1-header"
            >
               <Box sx={{ fontSize: "22px", color: "#0A3A84" }}>
                  {item?.title}
               </Box>
            </AccordionSummary>
            {item?.data?.map((item, index) => (
               <AccordionDetails
                  onClick={() => {
                     navigate(item?.url || "/"), setClick(false);
                     document.body.classList.remove("no-scroll");
                  }}
                  key={index}
                  sx={{
                     "& .MuiAccordionDetails-root": {
                        border: "none !important",
                        padding: "0px ",
                        outline: "none !important",
                     },
                  }}
               >
                  <Box sx={{ fontSize: "20px", color: "#020C1C" }}>
                     {item?.title}
                  </Box>
                  <Box sx={{ fontSize: "16px", color: "#A1AAA6" }}>
                     {item?.subtitle}
                  </Box>
               </AccordionDetails>
            ))}
         </Accordion>
      </div>
   );
};

export default Navbar;
