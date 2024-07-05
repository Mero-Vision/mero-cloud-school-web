import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { usePostTeachersMutation } from "../../../../../apis/teachers";
import CustomButton from "../../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../../common/CustomInputs/CustomInput";

const schema = Yup.object().shape({
   name: Yup.string().required("User role is required"),
});

const AddCompanyUserRole = ({
   row,
   handleClose,
   uuid,
   inputValue,
}) => {
   const userData = JSON.parse(localStorage?.getItem("user") || "{}");

   console.log({ userData });

   const dispatch = useDispatch();
   const [
      postUsersRole,
      {
         error,
         isLoading: isPostLoading,
         isSuccess: isPostSuccess,
         data: successData,
      },
   ] = usePostTeachersMutation();
   const [
      updateUsersRole,
      {
         error: editError,
         isLoading: isEditLoading,
         isSuccess: isEditSuccess,
         data: editSuccessData,
      },
   ] = useUpdateTeachersMutation();
   console.log({ successData, editSuccessData });

   const {
      control,
      formState: { errors },
      watch,
      setValue,
      register,
      handleSubmit,
      reset,
   } = useForm({ resolver: yupResolver(schema) });

   const onSubmit = (data) => {
      console.log({ data });
      const formData = new FormData();
      const finalValues = {
         ...data,
         company_id: getCompanyDetail().id,
      };
      const finalValuesEdit = {
         ...data,
         company_id: getCompanyDetail().id,
         _method: "PATCH",
         id: row?.id,
      };

      row && formData?.append("_method", "PATCH");
      console.log({ finalValues, formData });
      row
         ? updateUsersRole(finalValuesEdit)
         : postUsersRole(finalValues);
   };

   useEffect(() => {
      if (isPostSuccess || isEditSuccess) {
         handleClose();
      }
   }, [isPostSuccess, isEditSuccess, handleClose]);

   useEffect(() => {
      if (row) {
         Object.keys(row)?.map((key) => {
            setValue(key, row?.[key]);
         });
      }
   }, [row]);

   return (
      <Box>
         <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <CustomInput
                        control={control}
                        errors={errors}
                        name="name"
                        title={"User role"}
                        placeholder={"Cashier"}
                        required
                     />
                  </Grid>
               </Grid>
               <CustomButton
                  loading={isPostLoading || isEditLoading}
                  error={error || editError}
                  success={isPostSuccess || isEditSuccess}
                  successData={successData || editSuccessData}
                  buttonName={row?.id && "Edit"}
               />
            </form>
         </Box>
      </Box>
   );
};

export default AddCompanyUserRole;
