import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setToppingsOrderQuantity } from "../../../slices/orderSlice";
import { CustomInput } from "../CustomInputs/CustomInput";

export const CounterButtonWithInputToppings = ({
   toppings,
   toppingsFavoutite,
   value,
   handleIncrease,
   handleDecrease,
   tableIndex,
   id,
   variationId,
}) => {
   const theme = useTheme();

   // const defaultValues = {
   //    order_value_topping: value || 0,
   // };

   const {
      control,
      formState: { errors },
      watch,
      setValue,
      register,
      handleSubmit,
      reset,
      clearErrors,
   } = useForm();

   const dispatch = useDispatch();

   // const handleQuantityChange = (e) => {
   //    const newQuantity = parseInt(e.target.value, 10);
   //    if (!isNaN(newQuantity) && newQuantity >= 0) {
   //       dispatch(
   //          setQuantity({ tableIndex, id, quantity: newQuantity })
   //       );
   //    }
   // };

   // const handleQuantityChange = (e) => {
   //    const newQuantity = parseFloat(e.target.value);
   //    if (!isNaN(newQuantity) && newQuantity >= 0) {
   //       setQuantity(e.target.value);
   //       dispatch(
   //          setQuantity({ tableIndex, id, quantity: newQuantity })
   //       );
   //    } else {
   //       setQuantity(e.target.value); // Update the state even if it's not a valid number to reflect the input field
   //    }
   // };

   const quantityValue = watch("order_value_topping"); // Watch the 'quantity' input field

   useEffect(() => {
      let newQuantity = 0; // Default value
      if (quantityValue !== "") {
         newQuantity = parseFloat(quantityValue);
         if (isNaN(newQuantity) || newQuantity < 0) {
            newQuantity = 0; // Set to 0 if NaN or negative
         }
      }
      console.log("newQuantityTop", { newQuantity });

      dispatch(
         setToppingsOrderQuantity({
            toppingsId: id,
            tableIndex,
            variationId,
            quantity: newQuantity,
         })
      );
   }, [quantityValue, dispatch, tableIndex, id, variationId]);

   useEffect(() => {
      setValue("order_value_topping", value);
   }, [value, setValue]);

   console.log(
      "djklasldjljsdas",
      watch("order_value_topping"),
      value
   );

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
               // height: toppings ? "30px" : "36px",
               height: "36px",
               cursor: "pointer",
               flexShrink: "0",
               // borderRight: "3px solid #EF4444",
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
               height: "36px",
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
               // height: toppings ? "30px" : "36px",
               height: "36px",
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
               name="order_value_topping"
               type="number"
               itemOrderInput
            />
         </Box>

         <button
            className="button-plus"
            // disabled={value <= 0}
            onClick={handleIncrease}
         >
            <AddIcon sx={{ color: "#FF9E2A" }} />
         </button>
      </Box>
   );
};
