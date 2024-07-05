import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import {
   usePostTeachersMutation,
   useUpdateTeachersMutation,
} from "../../../../apis/teachers";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";

// import CustomButton from "../common/CustomButton/CustomButton";
const schema = Yup.object().shape({
   email: Yup.string().email("Invalid email address"),
   role: Yup.string().required("Role is required"),
   // branch: Yup.array().required("Branch is required"),
});

const AddCompanyUser = ({ row, handleClose, uuid, inputValue }) => {
   const userData = JSON.parse(localStorage?.getItem("user"));

   console.log({ userData });

   const [
      postUsersAdmin,
      {
         error,
         isLoading: isPostLoading,
         isSuccess: isPostSuccess,
         data: successData,
      },
   ] = usePostTeachersMutation();

   const [
      updateUsersAdmin,
      {
         error: editError,
         isLoading: isEditLoading,
         isSuccess: isEditSuccess,
         data: editSuccessData,
      },
   ] = useUpdateTeachersMutation();

   const defaultValue = {
      role: "",
   };

   const {
      control,
      formState: { errors },
      watch,
      setValue,
      register,
      handleSubmit,
      reset,
   } = useForm({ resolver: yupResolver(schema), defaultValue });

   useEffect(() => {
      if (row) {
         reset(row?.customer_detail);
         setValue("pan_number", row?.pan_number);
         setValue("role", row?.roles[0]);
      }
   }, [row?.customer_detail]);

   const onSubmit = (data) => {
      console.log({ data });
      const formData = new FormData();
      const finalValues = {
         ...data,
         company_id: Number(userData?.company?.id),
         roles: [data?.role],
         branch_ids: data?.branch,
      };
      const finalValuesEdit = {
         //  ...data,
         company_id: Number(userData?.company?.id),
         user_id: row?.id,
         roles: [data?.role],
         branch_ids: data?.branch
            ? data?.branch?.map((item) => item)
            : data?.branches?.map((item) => item?.id),
         _method: "PUT",
         id: row?.id,
      };

      row && formData?.append("_method", "PUT");
      console.log({ finalValues, formData });
      row
         ? updateUsersAdmin({
              data: finalValuesEdit,
              id: Number(company_id),
           })
         : postUsersAdmin(finalValues);
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

   console.log({ watch: watch("role") });

   return (
      <>
         <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
               <Grid container spacing={2}>
                  <Grid item xs={12}>
                     <CustomInput
                        control={control}
                        errors={errors}
                        name="email"
                        title={"Email"}
                        type="email"
                        placeholder={"davidcross@gmail.com"}
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
      </>
   );
};

export default AddCompanyUser;
