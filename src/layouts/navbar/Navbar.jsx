import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
   const navigate = useNavigate();
   const [click, setClick] = useState(false);

   const handleClick = () => {
      setClick(!click);
   };

   const handleNavigate = (link) => {
      navigate(link);
      setClick(!click);
      console.log({ link });
   };

   return (
      <header>
         <div className="navbar">
            <div className="logo">
               <Box onClick={() => handleNavigate("/")}>
                  <h1 className="logo">Mero School</h1>
               </Box>
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
               <li className="nav-item">
                  <div
                     onClick={() => handleNavigate("/")}
                     className="nav-link"
                  >
                     Home
                  </div>
               </li>
               <li className="nav-item">
                  <div
                     onClick={() => handleNavigate("/")}
                     className="nav-link"
                  >
                     About
                  </div>
               </li>
               <li className="nav-item">
                  <div
                     onClick={() => handleNavigate("/")}
                     className="nav-link"
                  >
                     Features
                  </div>
               </li>
               <li className="nav-item">
                  <div
                     onClick={() => handleNavigate("/")}
                     className="nav-link"
                  >
                     Contact
                  </div>
               </li>
            </ul>

            <div className="hamburger" onClick={handleClick}>
               {click ? (
                  <CloseIcon sx={{ color: "#6948FF" }} />
               ) : (
                  <MenuIcon sx={{ color: "#6948FF" }} />
               )}
            </div>
         </div>
      </header>
   );
};

export default Navbar;
