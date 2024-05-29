import React from "react";
const CustomNumberFormatter = ({ num }) => {
   const options = { maximumFractionDigits: 2 };
   const formattedNumber = Intl.NumberFormat("en-US", options).format(
      num
   );

   return <>{formattedNumber}</>;
};

export default CustomNumberFormatter;
