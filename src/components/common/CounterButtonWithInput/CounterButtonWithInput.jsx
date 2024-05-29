import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Box, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setQuantity } from "../../../slices/orderSlice";
import { CustomInput } from "../CustomInputs/CustomInput";

export const CounterButtonWithInput = ({
   toppings,
   toppingsFavoutite,
   value,
   handleIncrease,
   handleDecrease,
   tableIndex,
   id,
}) => {
   const theme = useTheme();

   const defaultValues = {
      order_value: value || 0,
   };

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

   const quantityValue = watch("order_value"); // Watch the 'quantity' input field

   useEffect(() => {
      let newQuantity = 0; // Default value
      if (quantityValue !== "") {
         newQuantity = parseFloat(quantityValue);
         if (isNaN(newQuantity) || newQuantity < 0) {
            newQuantity = 0; // Set to 0 if NaN or negative
         }
      }
      console.log({ newQuantity });
      dispatch(
         setQuantity({ tableIndex, id, quantity: newQuantity })
      );
   }, [quantityValue, dispatch, tableIndex, id]);

   // useEffect(() => {
   //    const newQuantity = parseFloat(quantityValue);
   //    if (!isNaN(newQuantity) && newQuantity >= 0) {
   //       dispatch(
   //          setQuantity({ tableIndex, id, quantity: newQuantity })
   //       );
   //    }
   // }, [quantityValue, dispatch, tableIndex, id]);

   useEffect(() => {
      // Set the value of 'input_value' based on 'inputChange'
      setValue("order_value", value);
   }, [value, setValue]);

   // const handleQuantityChange = (event) => {
   //    const value = event.target.value;
   //    setQuantity(Number(value));
   //  };

   console.log(
      "djklasldjljsda------>>>",
      watch("order_value"),
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
               // background: theme.palette.red.medium,
               background: "#fff",
               borderRadius: "4px 0px 0px 4px",
               color: "#fff",
               width: toppingsFavoutite ? "42px" : "48px",
               height: toppings ? "30px" : "36px",
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
         {/* <button
            className="input-box"
            onClick={handleIncrease}
            style={{ fontWeight: "600" }}
         >
            {value}
         </button> */}
         <Box sx={{ width: "50px" }}>
            {/* <TextField
               sx={{
                  width: "100% !important",
                  marginRight: "5px",
                  "& .MuiInputBase-input": {
                     padding: "10px 5px !important",
                  },
               }}
               value={value}
               onChange={handleQuantityChange}
               variant="outlined"
               // type="number"
               type="text" // Use "text" type to allow proper decimal handling
               inputProps={{ inputMode: "decimal" }} // Helps with mobile input
            /> */}
            <CustomInput
               value={value}
               // onChange={handleQuantityChange}
               control={control}
               errors={errors}
               name="order_value"
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
