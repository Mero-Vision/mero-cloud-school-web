import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import * as yup from "yup";
import CustomButton from "../../../common/CustomButton/CustomButton";
import CustomFileUpload from "../../../common/CustomFileUpload/CustomFileUpload";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";

const AddCompany = ({ handleClose, row }) => {
   const { user } = useSelector((state) => state?.auth);
   // const [
   //   createCompany,
   //   {
   //     error,
   //     isLoading: isPostLoading,
   //     isSuccess: isPostSuccess,
   //     data: successData,
   //   },
   // ] = useCreateCompanyMutation();
   // const [
   //   updateCompany,
   //   {
   //     error: editError,
   //     isLoading: isEditLoading,
   //     isSuccess: isEditSuccess,
   //     data: editSuccessData,
   //   },
   // ] = useUpdateCompanyMutation();
   const validationSchema = yup.object().shape({
      name: yup.string().required("Name is required"),
      short_name: yup.string().required("Display name is required"),
      address: yup.string().required("Address is required"),
      primary_email: yup
         .string()
         .email("Invalid email address")
         .required("Primary email is required"),
      vat_number: yup
         .number()
         .positive("Vat/PAN No. must be a positive number"),
      registration_number: yup
         .number()
         .positive("Registration No. must be a positive number"),
   });
   const {
      control,
      formState: { errors },
      handleSubmit,
      watch,
      setValue,
   } = useForm({ resolver: yupResolver(validationSchema) });

   console.log({ watch: watch() });

   useEffect(() => {
      if (row) {
         Object.keys(row)?.map((key) => setValue(key, row?.[key]));
      }
   }, [row]);

   console.log({ "watch===>": watch() });
   const onSubmit = (values) => {
      console.log({ values });
      // const formData = new FormData();
      // const finalValues = {
      //   ...values,
      //   accounting_firm_id: user?.accounting_firms?.[0]?.id,
      //   status: "PENDING",
      //   logo: values?.image?.[0] ?? "",
      // };

      // finalValues &&
      //   Object?.keys(finalValues)?.map((key) =>
      //     formData.append(key, finalValues?.[key] ?? "")
      //   );

      // row && formData?.append("_method", "PATCH");
      // console.log({ finalValues });
      // row
      //   ? updateCompany({ id: row?.id, data: formData })
      //   : createCompany(formData);
   };

   useEffect(() => {
      if (isPostSuccess || isEditSuccess) {
         handleClose();
      }
   }, [isPostSuccess, isEditSuccess]);

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3}>
               <Grid item xs={4}>
                  <CustomInput
                     name="name"
                     control={control}
                     errors={errors}
                     title={"Name"}
                     required
                  />
               </Grid>
               <Grid item xs={4}>
                  <CustomInput
                     name="short_name"
                     control={control}
                     errors={errors}
                     title={"Display Name"}
                     required
                  />
               </Grid>
               <Grid item xs={4}>
                  <CustomInput
                     name="address"
                     control={control}
                     errors={errors}
                     title={"Address"}
                     required
                  />
               </Grid>

               <Grid item xs={4}>
                  <CustomInput
                     name="primary_email"
                     control={control}
                     errors={errors}
                     title={"Primary Email"}
                     type="email"
                     required
                  />
               </Grid>

               <Grid item xs={4}>
                  <CustomInput
                     name="primary_phone"
                     control={control}
                     errors={errors}
                     title={"Primary Phone"}
                     type="tel"
                  />
               </Grid>

               <Grid item xs={4}>
                  <CustomInput
                     name="vat_number"
                     control={control}
                     errors={errors}
                     title={"Vat/PAN No."}
                     type="number"
                  />
               </Grid>

               <Grid item xs={4}>
                  <CustomInput
                     name="registration_number"
                     control={control}
                     errors={errors}
                     type="number"
                     title={"Registration No."}
                  />
               </Grid>

               <Grid item xs={4}>
                  <CustomInput
                     name="start_date"
                     control={control}
                     errors={errors}
                     title={"Start Date"}
                     type="date"
                  />
               </Grid>

               {/* <Grid item xs={4}>
            <CustomSearchSelect
              name="accounting_firm_id"
              control={control}
              errors={errors}
              title={"Accounting Firm"}
            />
          </Grid> */}

               <Grid item xs={12}>
                  <CustomFileUpload
                     control={control}
                     errors={errors}
                     name="image"
                     buttonName={"Upload Logo"}
                  />
                  <Box display={"flex"} flexWrap={"wrap"} mt={2}>
                     {watch("image") ? (
                        Object.values(watch("image"))?.map((item) => (
                           <Box key={item?.name}>
                              <img
                                 style={{ height: "50px" }}
                                 src={URL?.createObjectURL(item)}
                              />
                           </Box>
                        ))
                     ) : (
                        <Box>
                           <img
                              style={{ height: "50px" }}
                              src={row?.thumbnail_logo}
                           />
                        </Box>
                     )}
                  </Box>
               </Grid>
            </Grid>

            <CustomButton
               loading={isPostLoading || isEditLoading}
               error={error || editError}
               success={isPostSuccess || isEditSuccess}
               successData={successData || editSuccessData}
            />
         </form>
      </>
   );
};

export default AddCompany;
