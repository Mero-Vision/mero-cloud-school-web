import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Grid } from "@mui/material";
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
               <Grid container spacing={0}>
                  <Grid item xs={4}>
                     <Link to="/" className="link">
                        Company
                     </Link>
                  </Grid>
                  <Grid item xs={4}>
                     <Link to="/" className="link">
                        Features
                     </Link>
                  </Grid>
                  <Grid item xs={4}>
                     <Link to="/" className="link">
                        Products
                     </Link>
                  </Grid>
                  <Grid item xs={4}>
                     <Link to="/" className="link">
                        Resources
                     </Link>
                  </Grid>
                  <Grid item xs={4}>
                     <Link to="/" className="link">
                        Contact
                     </Link>
                  </Grid>
               </Grid>
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
                     sx={{ color: "#d3d3d3", marginRight: "10px" }}
                  />
                  <Instagram
                     size={20}
                     sx={{ color: "#d3d3d3", marginRight: "10px" }}
                  />
                  <Twitter
                     size={20}
                     sx={{ color: "#d3d3d3", marginRight: "10px" }}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default Footer;
