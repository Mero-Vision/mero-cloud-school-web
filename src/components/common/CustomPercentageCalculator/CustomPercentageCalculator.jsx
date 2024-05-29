import React, { useEffect, useState } from "react";
import { returnNepaliNumberWithCommas } from "../../../utils/helpers";

const CustomPercentageCalculator = ({
   todaysAmount,
   yesterdaysAmount,
}) => {
   const [differencePercentage, setDifferencePercentage] =
      useState(0);

   useEffect(() => {
      if (
         (todaysAmount === 0 || todaysAmount === null) &&
         (yesterdaysAmount === 0 || yesterdaysAmount === null)
      ) {
         setDifferencePercentage(0);
         return;
      }

      let calculatedDifferencePercentage;
      if (yesterdaysAmount === 0 || yesterdaysAmount === null) {
         calculatedDifferencePercentage = 100; // Set a default value if yesterday's amount is 0
      } else {
         calculatedDifferencePercentage =
            Math.abs(
               (todaysAmount - yesterdaysAmount) / yesterdaysAmount
            ) * 100;
      }

      setDifferencePercentage(calculatedDifferencePercentage);
   }, [todaysAmount, yesterdaysAmount]);

   return <>{returnNepaliNumberWithCommas(differencePercentage)}%</>;
};

export default CustomPercentageCalculator;
