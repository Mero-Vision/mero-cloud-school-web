import { Button } from "@mui/material";
import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const RecordPaymentButton = ({
  styles = {},
  variant,
  color = "",
  row,
  url,
}) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(
      `${url || `/sales/record-payment`}/add?invoice_id=${
        searchParams.get("id") || row?.id
      }`
    );
  };
  return (
    <Button
      variant={variant || "blue"}
      color={color}
      sx={{ ...styles }}
      onClick={() => handleNavigate()}
    >
      Record Payment
    </Button>
  );
};

export default RecordPaymentButton;
