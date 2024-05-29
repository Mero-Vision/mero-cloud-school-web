import RemoveIcon from "@mui/icons-material/Remove";
import { Box, useTheme } from "@mui/material";

export const CounterButtonCustom = ({
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
            // paddingRight: "5px",
            "& .button-minus": {
               border: "transparent",
               // background: theme.palette.red.medium,
               background: "#fff",
               borderRadius: "4px 0px 0px 4px",
               color: "#fff",
               // width: toppingsFavoutite ? "42px" : "42px",
               width: "50%",
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
               // width: toppingsFavoutite ? "42px" : "42px",
               width: "50%",
               height: toppings ? "30px" : "36px",
               cursor: "pointer",
               flexShrink: "0",
            },
         }}
      >
         {/* {value !== 0 && ( */}
         <button
            className="button-minus"
            disabled={value <= 0}
            onClick={handleDecrease}
            style={
               value <= 0
                  ? { cursor: "default" }
                  : { cursor: "pointer" }
            }
         >
            <RemoveIcon
               sx={
                  value <= 0
                     ? { color: "gray" }
                     : { color: "#F87171" }
               }
            />
         </button>
         {/* )} */}
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
