import { Box } from "@mui/material";
import React from "react";

const StatusButtons = ({ row }) => {
  const ButtonStyle = ({ background, text }) => {
    return (
      <Box
        style={{
          width: "60px",
          height: "22px",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "2px",
          background: background,
        }}
      >
        {text}
      </Box>
    );
  };
  const SwitchButtons = () => {
    switch (row?.status?.toLowerCase()) {
      case "draft":
        return <ButtonStyle background={"#F3F3F6"} text={"Draft"} />;
      case "partial":
      default:
        return <ButtonStyle background={"#FFEEB9"} text={"Partial"} />;
    }
  };
  return (
    <>
      <SwitchButtons />
    </>
  );
};

export default StatusButtons;
