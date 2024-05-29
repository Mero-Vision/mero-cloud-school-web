// import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
// import ChevronRightIcon from "@mui/icons-material/ChevronRight";
// import { makeStyles } from "@mui/styles";
// import { useRef } from "react";
// import Slider from "react-slick";

// const useStyles = makeStyles((theme) => ({
//    container: {
//       position: "relative",
//       margin: "0 10px",
//    },
//    arrowLeft: {
//       position: "absolute",
//       top: "6px",
//       left: "-14px",
//       [theme.breakpoints.up("md")]: {
//          left: "-16px",
//       },
//       color: "gray",
//       cursor: "pointer",
//       fontSize: "20px",
//       "&:hover": {
//          color: theme.palette.text.primary,
//          backgroundColor: theme.palette.grey[300],
//       },
//    },
//    arrowRight: {
//       position: "absolute",
//       top: "6px",
//       right: "-14px",
//       [theme.breakpoints.up("md")]: {
//          right: "-16px",
//       },
//       color: "gray",
//       cursor: "pointer",
//       fontSize: "20px",
//       "&:hover": {
//          color: theme.palette.text.primary,
//          backgroundColor: theme.palette.grey[300],
//       },
//    },
//    children: {
//       position: "relative",
//    },
// }));

// const TeaSlider = ({ children }) => {
//    const sliderRef = useRef();
//    const classes = useStyles();
//    const settings = {
//       speed: 500,
//       slidesToShow: 4,
//       slidesToScroll: 1,
//       arrows: false,
//       autoplay: false,
//       pauseOnHover: true,
//       autoplaySpeed: 2000,
//       infinite: true,
//       dots: false,
//       responsive: [
//          {
//             breakpoint: 1124,
//             settings: {
//                slidesToShow: 3,
//             },
//          },
//          {
//             breakpoint: 768,
//             settings: {
//                slidesToShow: 2,
//             },
//          },
//          {
//             breakpoint: 480,
//             settings: {
//                slidesToShow: 1,
//             },
//          },
//       ],
//    };

//    return (
//       <div>
//          <div className={classes.container}>
//             <ChevronLeftIcon
//                onClick={() => sliderRef.current.slickPrev()}
//                fontSize="large"
//                className={classes.arrowLeft}
//             />
//             <Slider
//                {...settings}
//                ref={sliderRef}
//                className={classes.children}
//             >
//                {children}
//             </Slider>
//             <ChevronRightIcon
//                onClick={() => sliderRef.current.slickNext()}
//                fontSize="large"
//                className={classes.arrowRight}
//             />
//          </div>
//       </div>
//    );
// };

// export default TeaSlider;

// ------------------------------------------

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useRef } from "react";
import Slider from "react-slick";
const CustomSlider = ({ children }) => {
   const sliderRef = useRef();
   const settings = {
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: false,
      autoplay: false,
      pauseOnHover: true,
      autoplaySpeed: 2000,
      infinite: true,
      dots: false,
      // responsive: [
      //    {
      //       breakpoint: 1124,
      //       settings: {
      //          slidesToShow: 4,
      //       },
      //    },
      //    {
      //       breakpoint: 768,
      //       settings: {
      //          slidesToShow: 4,
      //       },
      //    },
      //    {
      //       breakpoint: 480,
      //       settings: {
      //          slidesToShow: 4,
      //       },
      //    },
      // ],
   };

   return (
      <div>
         <div>
            <div
               //  className="relative mx-10"
               style={{
                  position: "relative",
                  margin: "0 10px",
                  height: "150px",
               }}
            >
               <div
                  // className="absolute top-6 -left-14 md:-left-16"
                  style={{
                     position: "absolute",
                     top: "10px",
                     left: "0px",
                  }}
               >
                  <ChevronLeftIcon
                     onClick={() => sliderRef.current.slickPrev()}
                     fontSize="large"
                     // className="text-gray hover:text-textColor cursor-pointer  text-[20px] md:text-[27px] bg-lightGray hover:bg-teal  ease-in-out duration-300 px-3 py-[2px] w-auto h-auto"
                     style={{
                        color: "#000",
                        cursor: "pointer",
                     }}
                  />
               </div>
               <Slider
                  {...settings}
                  ref={sliderRef}
                  // className="relative"
                  style={{
                     position: "relative",
                     backgroundColor: "red",
                     // zIndex: "1000",
                     height: "50px",
                     width: "300px",
                  }}
               >
                  {children}
               </Slider>{" "}
               <div
                  // className="absolute top-6 -right-14 md:-right-16"
                  // style={{
                  //    position: "absolute",
                  //    top: "6px",
                  //    right: "14px",
                  // }}
                  style={{
                     position: "absolute",
                     top: "10px",
                     left: "20px",
                  }}
               >
                  <ChevronRightIcon
                     onClick={() => sliderRef.current.slickNext()}
                     fontSize="large"
                     // className="text-gray hover:text-textColor cursor-pointer text-[20px] md:text-[27px] bg-lightGray hover:bg-teal  ease-in-out duration-300 px-3 py-[2px] w-auto h-auto"
                     // style={{
                     //    color: "#000",
                     //    cursor: " pointer",
                     //    width: "20px",
                     //    backgroundColor: "gray",
                     // }}
                     style={{
                        color: "#000",
                        cursor: "pointer",
                     }}
                  />
               </div>
            </div>
         </div>
      </div>
   );
};

export default CustomSlider;
