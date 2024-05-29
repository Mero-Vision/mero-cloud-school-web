import AddIcon from "@mui/icons-material/Add";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const CounterButton = ({
   toppings,
   toppingsFavoutite,
   value,
   handleIncrease,
   handleDecrease,
}) => {
   const theme = useTheme();

   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "center",
            width: "auto",
            "& .button-minus": {
               border: "transparent",
               // background: theme.palette.red.medium,
               background: "#fff",
               borderRadius: "4px 0px 0px 4px",
               color: "#fff",
               width: toppingsFavoutite ? "42px" : "62px",
               height: toppings ? "30px" : "36px",
               cursor: "pointer",
               flexShrink: "0",
               // borderRight: "3px solid #EF4444",
               borderRight: "3px solid #F3F3F6",
               "& svg": {
                  mt: "3px",
               },
            },
            "& .button-plus": {
               border: "transparent",
               background: "#fff",
               borderRadius: "0px 4px 4px 0px",
               color: "#000",
               outline: "none",
               width: toppingsFavoutite ? "42px" : "62px",
               height: toppings ? "30px" : "36px",
               cursor: "pointer",
               flexShrink: "0",
            },
         }}
      >
         {value !== 0 && (
            <button
               className="button-minus"
               disabled={value <= 0}
               onClick={handleDecrease}
            >
               <RemoveIcon sx={{ color: "#F87171" }} />
            </button>
         )}
         {/* <Typography sx={{ width: "10px" }}>{value}</Typography> */}
         <button
            className="button-plus"
            onClick={handleIncrease}
            style={{ fontWeight: "600" }}
         >
            {value}
         </button>
      </Box>
   );
};

export const SecondaryCounterButton = ({
   amount,
   handleDecrease,
   handleIncrease,
}) => {
   const theme = useTheme();

   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            width: "78px",
            "& button": {
               border: "transparent",
               background: theme.palette.grey[500],
               color: "#fff",
               width: "18px",
               height: "18px",
               borderRadius: "50%",
               cursor: "pointer",
               flexShrink: "0",
               "&:active": {
                  boxShadow:
                     "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
               },
               "&[disabled]": {
                  cursor: "initial",
                  background: theme.palette.grey[400],
                  boxShadow: "none",
               },
               "& svg": {
                  width: "10px",
                  height: "10px",
               },
            },
         }}
      >
         <button disabled={amount <= 0} onClick={handleDecrease}>
            <RemoveIcon sx={{ width: "" }} />
         </button>
         <Typography
            sx={{
               width: "10px",
               fontSize: "14px",
               color: theme.palette.grey[700],
            }}
         >
            {amount}
         </Typography>
         <button onClick={handleIncrease}>
            <AddIcon />
         </button>
      </Box>
   );
};

export const GoBackButton = ({ label, sx, ...props }) => {
   const navigate = useNavigate();

   return (
      <Button
         onClick={() => navigate(-1)}
         sx={{
            backgroundColor: " #F9F9FB",
            color: "black !important",
            fontWeight: 400,
            "& span": {},
            ...sx,
         }}
         startIcon={
            <KeyboardBackspaceIcon
               sx={{
                  backgroundColor: "#F9F9FB !important",
                  color: "black",
                  background: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  strokeWidth: "1.5",
                  padding: "4.5px",
               }}
            />
         }
         {...props}
      >
         {label}
      </Button>
   );
};

export const ImageButton = ({
   isActive,
   sizeSmall,
   image,
   label,
   ...props
}) => {
   const theme = useTheme();
   return (
      <Button
         sx={{
            borderRadius: "7px",
            border: "2px solid",
            borderColor: isActive
               ? theme.palette.red.medium
               : theme.palette.grey[300],
            background: isActive ? theme.palette.red.light : "#fff",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            height: sizeSmall
               ? "50px"
               : isActive
               ? "82px !important"
               : "82px !important",
            width: sizeSmall ? " 100px" : "119px",
            padding: sizeSmall ? "5px" : "11.76px 22px 10.76px",
            whiteSpace: "nowrap",
            "& img": {
               width: "28px",
               height: "26.47px",
            },
         }}
         {...props}
      >
         {image && <img src={image} alt={label} />}
         <Typography
            sx={{
               fontSize: "14px",
               fontWeight: isActive ? 600 : 500,
               lineHeight: "18px",
               color: isActive
                  ? theme.palette.red[600]
                  : theme.palette.grey[500],
            }}
         >
            {label}
         </Typography>
      </Button>
   );
};
