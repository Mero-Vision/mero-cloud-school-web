import React from "react";
import heroImg from "../../../../assets/iphoneimg.png";
import "./Hero.css";

const Hero = () => {
   return (
      <div className="hero">
         <div className="container">
            <div className="content">
               <div className="col-1">
                  <div className="hero-text-box">
                     <h1>Welcome to</h1>
                     <h1>
                        <span className="primary-color">
                           Mero School
                        </span>
                     </h1>
                  </div>
                  <p style={{ width: "50%" }}>
                     We are the best all-in-one cloud-based school
                     software and digital learning system for growing,
                     big and ambitious names in education.{" "}
                  </p>
               </div>
               <div className="col-2">
                  <div className="heroImg">
                     <img src={heroImg} alt="win big" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Hero;
