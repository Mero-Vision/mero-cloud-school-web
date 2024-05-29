import { Box } from "@mui/material";
import React, { useEffect, useRef } from "react";
import styles from "./styles";

const OTP = ({ numberOfDigits = 6, otp, setOtp }) => {
  const classes = styles();
  const otpBoxReference = useRef([]);

  function handleChange(value, index) {
    const copy = Array.from(String(value))?.slice(0, numberOfDigits);
    const remaining = numberOfDigits - copy?.length;
    if (copy?.length > 1 && copy?.length <= numberOfDigits) {
      setOtp([...copy, ...Array(remaining)]);
    } else {
      let newArr = [...otp];
      newArr[index] = value;
      setOtp(newArr);
      if (value && index < numberOfDigits - 1) {
        otpBoxReference.current[index + 1].focus();
      }
    }
  }
  useEffect(() => {
    otpBoxReference.current[0] && otpBoxReference.current[0].focus();
  }, []);

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < numberOfDigits - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  }
  return (
    <Box>
      <Box className={classes.otpDiv}>
        {otp?.map((item, index) => (
          <Box key={index}>
            <input
              value={item}
              min={0}
              max={9}
              maxLength={item && 1}
              onWheel={(e) => e.target.blur()}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
              ref={(reference) => (otpBoxReference.current[index] = reference)}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default OTP;
