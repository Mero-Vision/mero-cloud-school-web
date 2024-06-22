"use client";
import { motion } from "framer-motion";

const CommonSectionHeading = ({
   children,
   hasPadding = true,
   subtitle = null,
   isCenter = true,
}) => {
   const isMobile = window.innerWidth < 768; //Add the width you want to check for here (now 768px)

   return (
      <>
         <motion.div
            initial={
               isMobile
                  ? {}
                  : {
                       opacity: 0,
                       y: 200,
                    }
            }
            transition={{
               duration: 0.5,
               bounce: 0.5,
            }}
            whileInView={
               isMobile
                  ? {}
                  : {
                       opacity: 1,
                       y: 0,
                    }
            }
            viewport={{ once: true }}
            className={`flex ${
               isCenter ? " justify-center" : "justify-start"
            } ${hasPadding ? "pt-[72px]" : "pt-0"} `}
         >
            <div>
               {subtitle && (
                  <motion.p
                     className={`${
                        isCenter ? "text-center" : "text-left"
                     } text-[#A6A6A6] pb-[20px]`}
                  >
                     {subtitle}
                  </motion.p>
               )}

               <h2
                  className={`text-white text-[40px] md:text-[70px] font-normal ${
                     isCenter ? "text-center" : "text-left"
                  }  md:leading-[75px] leading-[40px]`}
               >
                  {children}
               </h2>
            </div>
         </motion.div>
      </>
   );
};

export default CommonSectionHeading;
