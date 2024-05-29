import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, useTheme } from "@mui/material";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CustomInput } from "../CustomInputs/CustomInput";

export const CounterBtnInputKotBot = ({
   toppings,
   toppingsFavoutite,
   value,
   handleIncrease,
   handleDecrease,
   tableIndex,
   id,
   onQuantityChange,
}) => {
   const theme = useTheme();

   const {
      control,
      formState: { errors },
      watch,
      setValue,
   } = useForm();

   const dispatch = useDispatch();

   const quantityValue = watch("order_value_old");

   console.log(
      "djklasldjljsda------>>>",
      watch("order_value_old"),
      value
   );

   useEffect(() => {
      setValue("order_value_old", value);
   }, [value, setValue]);

   const debounceTimeoutRef = useRef(null);

   useEffect(() => {
      if (onQuantityChange && quantityValue !== undefined) {
         // Clear the previous timeout if it exists
         if (debounceTimeoutRef.current) {
            clearTimeout(debounceTimeoutRef.current);
         }

         // Set a new timeout
         debounceTimeoutRef.current = setTimeout(() => {
            onQuantityChange(
               Number(quantityValue) < 0 ? 0 : quantityValue
            );
         }, 100);
      }
   }, [quantityValue, onQuantityChange]);

   Number(quantityValue) < 0 ? 0 : quantityValue;

   // useEffect(() => {
   //    if (onQuantityChange && quantityValue !== undefined) {
   //       onQuantityChange(quantityValue);
   //    }
   // }, [quantityValue, onQuantityChange]);

   return (
      <Box
         sx={{
            display: "flex",
            alignItems: "center",
            width: "auto",
            "& .button-minus": {
               border: "transparent",
               background: "#fff",
               borderRadius: "4px 0px 0px 4px",
               color: "#fff",
               width: toppingsFavoutite ? "42px" : "48px",
               height: toppings ? "30px" : "36px",
               cursor: "pointer",
               flexShrink: "0",
               borderRight: "1px solid #F3F3F6",
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
               width: toppingsFavoutite ? "42px" : "48px",
               height: toppings ? "30px" : "36px",
               cursor: "pointer",
               flexShrink: "0",
               borderLeft: "1px solid #F3F3F6",
            },
            "& .input-box": {
               border: "transparent",
               background: "#fff",
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

         <Box sx={{ width: "50px" }}>
            <CustomInput
               control={control}
               errors={errors}
               name="order_value_old"
               type="number"
               itemOrderInput
            />
         </Box>

         <button className="button-plus" onClick={handleIncrease}>
            <AddIcon sx={{ color: "#FF9E2A" }} />
         </button>
      </Box>
   );
};
