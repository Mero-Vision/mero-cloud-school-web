import React from "react";
import ClientCarasoul from "./ClientsPage/Clients";
import Hero from "./Hero/Hero";
import SiteDesign from "./SiteDesign/SiteDesign";
const HomePage = () => {
   return (
      <>
         <Hero />
         <SiteDesign />
         <ClientCarasoul />
      </>
   );
};

export default HomePage;
