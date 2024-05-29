import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
   return (
      <div className="footer">
         <div className="container">
            <div className="logo">
               <Link to="/">
                  <h1 className="logo">Mero School</h1>
               </Link>
            </div>

            <div className="menu-box">
               <Link to="/" className="link">
                  Home
               </Link>
               <Link to="/" className="link">
                  About
               </Link>
               <Link to="/" className="link">
                  Features
               </Link>
               <Link to="/" className="link">
                  Contact
               </Link>
            </div>
         </div>
         <div className="footer-bottom">
            <div className="content">
               <div className="rights">
                  <p>&copy; Mero School . All rights reserved.</p>
               </div>
               <div>
                  <Facebook
                     size={20}
                     sx={{ color: "#214E8F", marginRight: "10px" }}
                  />
                  <Instagram
                     size={20}
                     sx={{ color: "#214E8F", marginRight: "10px" }}
                  />
                  <Twitter
                     size={20}
                     sx={{ color: "#214E8F", marginRight: "10px" }}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Footer;
