import { Box } from "@chakra-ui/react";

const CommonWrapper = ({ children, type }) => {
   return (
      <>
         <Box
            padding={{
               base: "0px 20px",
               md: "0px 50px",
               lg: type === "tight" ? "0px 300px" : "0px 117px",
               // xl: "0px 200px",
            }}
            margin={"0 auto"}
         >
            {children}
         </Box>
      </>
   );
};

export default CommonWrapper;
