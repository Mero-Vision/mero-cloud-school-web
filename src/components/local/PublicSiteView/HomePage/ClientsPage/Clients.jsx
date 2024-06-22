"use client";
import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import school2 from "../../../../../assets/clients/school.png";
import school3 from "../../../../../assets/clients/school2.png";
import school4 from "../../../../../assets/clients/school3.png";
import school1 from "../../../../../assets/clients/xavier.png";
import "./ClientPage.css";
const ClientCarousel = () => {
   const navigate = useNavigate();
   const image_array = [
      {
         img: school1,
         client: "St. Xavier's School",
         url: "https://stx.edu.np/",
      },
      {
         img: school2,
         client: "New Horizon School",
         url: "https://stx.edu.np/",
      },
      {
         img: school3,
         client: "The Excelsior School",
         url: "https://stx.edu.np/",
      },
      {
         img: school4,
         client: "Nisarga Batika School",
         url: "https://stx.edu.np/",
      },
   ];
   const settings = {
      dots: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2500,
      autoplaySpeed: 2500,
      cssEase: "linear",
      arrows: false,
      pauseOnHover: true,
      responsive: [
         {
            breakpoint: 1024,
            settings: {
               slidesToShow: 3,
            },
         },
         {
            breakpoint: 768,
            settings: {
               initialSlide: 2,
               slidesToShow: 2,
            },
         },
         // {
         //    breakpoint: 480,
         //    settings: {
         //       slidesToShow: 1,
         //    },
         // },
      ],
   };
   return (
      <Box className="sliderBox">
         <Box>
            <Typography
               sx={{
                  color: "#0A3A84",
                  fontSize: "20px",
                  fontWeight: 600,
                  textAlign: "center",
                  marginBottom: "6rem",
               }}
            >
               Over 100 schools all across Nepal are powered by Mero
               School.
            </Typography>
         </Box>
         <div className="slider-container">
            <Slider {...settings}>
               {image_array?.map((item, index) => (
                  <Box key={index}>
                     <Box
                        onClick={() =>
                           window.open(item?.url, "_blank")
                        }
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                           flexDirection: "column",
                           alignItems: "center",
                           cursor: "pointer",
                           width: "100%",
                        }}
                     >
                        <Box sx={{ height: "100px" }}>
                           <Box
                              sx={{ width: "100%", height: "80px" }}
                           >
                              <img
                                 src={item?.img}
                                 alt="img"
                                 style={{
                                    width: "100%",
                                    height: "100%",
                                 }}
                              />
                           </Box>
                        </Box>
                        <Typography
                           sx={{
                              color: "#A1AAA6",
                              // width: "100%",
                           }}
                        >
                           {item?.client}
                        </Typography>
                     </Box>
                  </Box>
               ))}
            </Slider>
         </div>
      </Box>
   );
};

export default ClientCarousel;
