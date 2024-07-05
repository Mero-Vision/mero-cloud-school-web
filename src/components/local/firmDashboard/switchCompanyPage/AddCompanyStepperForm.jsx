import { yupResolver } from "@hookform/resolvers/yup";
import { Upload } from "@mui/icons-material";
import {
   Box,
   Button,
   Grid,
   LinearProgress,
   Stack,
   Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
   FormProvider,
   useForm,
   useFormContext,
} from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useCreateCompanyByUserMutation, useUpdateCompanyMutation } from "../../../../apis/companyApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import CustomFileUpload from "../../../common/CustomFileUpload/CustomFileUpload";
import { CustomInput } from "../../../common/CustomInputs/CustomInput";
import { CustomSwitch } from "../../../common/CustomSwitch/CustomSwitch";

import { useLocation } from "react-router-dom";
import styles from "./styles";

const STEPS = [
   "Register Branch Details",
   "Contact Person Detail",
   
];

const validationSchema = [
   //validation for step1
   yup.object({
      address: yup.string().required("Name is required"),
      
   }),
   //validation for step2
   yup.object({
      vat_number: yup
         .number()
         .positive("Vat/PAN No. must be a positive number"),
      registration_number: yup
         .number()
         .positive("Registration No. must be a positive number"),
      address: yup.string().required("Address is required"),
   }),
   //validation for step3
   yup.object({
      primary_email: yup
         .string()
         .email("Invalid email address")
         .required("Email Address is required"),
      primary_phone: yup.number().required("Phone No. is required"),
   }),
];

const AddCompanyStepperForm = () => {
   const [activeStep, setActiveStep] = useState(0);
   const { state } = useLocation()
   const [updateCompany,{isLoading:isUpdateLoading,isSuccess: isUpdateSuccess,data:updateSuccessData,error:updateErrorData}]  = useUpdateCompanyMutation()

   console.log({state})
   const currentValidationSchema = validationSchema[activeStep];
   const userData = JSON.parse(localStorage?.getItem("user"));
   console.log({ userData });
   const classes = styles();
   const methods = useForm({
      resolver: yupResolver(currentValidationSchema),
   });
   const navigate = useNavigate();
   const { handleSubmit, trigger,reset } = methods;
   const lastStep = activeStep === STEPS?.length - 1;
   const [
      createCompany,
      {
         error,
         isLoading: isPostLoading,
         isSuccess: isPostSuccess,
         data: successData,
      },
   ] = useCreateCompanyByUserMutation();

   useEffect(() => {
      (isPostSuccess || isUpdateSuccess) && navigate("/switch-branch");
   }, [isPostSuccess,isUpdateSuccess]);


   const onSubmit = (data) => {
      const formData = new FormData();
      const finalValues = {
         ...data,
         // status: "PENDING",
         company_id: userData?.company?.id,
         is_tax: data?.is_tax ? "active" : "inactive",
         "_method":"PUT"
      };

      !state && delete(finalValues)["_method"]

      finalValues &&
         Object?.keys(finalValues)?.map((key) =>
            formData.append(key, finalValues?.[key] || "")
         );

      lastStep &&  state ? updateCompany({body: formData, id: state?.id})  : createCompany(formData);
   };
   const switchSteps = () => {
      switch (activeStep) {
         case 0:
            return <Step1 />;
         case 1:
            return <Step2 />;
         case 2:
            return <Step3 />;
      }
   };

   const handleNext = async (step) => {
      const isStepValid = await trigger();
      if (isStepValid)
         setActiveStep((prevActiveStep) =>
            step ? Number(step) : prevActiveStep + 1
         );
   };

   const handleBack = () => {
      activeStep === 0 && navigate("/switch-branch");
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
   };

   useEffect(() => {
      if (state) {
         reset({...state,is_tax: state?.is_tax === "active" ? true : false})
      }

   },[state])
   return (
      <Box>
         <FormProvider {...methods}>
            <form
               onSubmit={handleSubmit(onSubmit)}
               className={classes.form}
            >
               <Box>
                  <Stack
                     direction={"row"}
                     justifyContent={"space-between"}
                     alignItems={"center"}
                  >
                     <Typography className={classes.stepTitle}>
                        {STEPS?.[activeStep]}
                     </Typography>
                     <Typography className={classes.number}>
                        <span style={{ color: "#383751" }}>
                           {activeStep + 1}
                        </span>{" "}
                        of {STEPS?.length}
                     </Typography>
                  </Stack>
                  <Stack
                     direction={"row"}
                     alignItems={"center"}
                     columnGap={"12px"}
                     mt={"16px"}
                  >
                     {STEPS?.map((item, index) => (
                        <Box key={index} width={"100%"}>
                           <LinearProgress
                              // onClick={() => handleNext(String(index))}
                              variant="determinate"
                              value={activeStep >= index ? 100 : 0}
                              className={classes.step}
                           />
                        </Box>
                     ))}
                  </Stack>
               </Box>
               <Grid container spacing={3}>
                  {switchSteps()}
               </Grid>
               <Box sx={{ display: "flex", justifyContent: "end" }}>
                  <Button onClick={() => handleBack()}>Back</Button>
                  {lastStep ? (
                     <CustomButton
                        loading={isPostLoading || isUpdateLoading }
                        success={isPostSuccess || isUpdateSuccess}
                        successData={successData || updateSuccessData}
                        justifyContent={"start"}
                        margin={"0"}
                        error={error || updateErrorData}
                     />
                  ) : (
                     <Button
                        variant="contained"
                        onClick={() => handleNext()}
                     >
                        {"Continue"}
                     </Button>
                  )}
               </Box>
            </form>
         </FormProvider>
      </Box>
   );
};

export default AddCompanyStepperForm;

const Step1 = () => {
   const {
      control,
      formState: { errors },
   } = useFormContext();
   return (
      <>
         <Grid item xs={12}>
            <CustomInput
               name="address"
               control={control}
               errors={errors}
               title={"Address"}
               required
               placeholder="Scodus Innovations Pvt. Ltd."
            />
         </Grid>
         <Grid item xs={12}>
            <CustomInput
               name="primary_email"
               control={control}
               errors={errors}
               type="email"
               title={"Email"}
               placeholder={"branchemail@branch.com"}
            />
         </Grid>

         <Grid item xs={12}>
            <CustomInput
               name="primary_phone"
               control={control}
               errors={errors}
               title={"Phone Number"}
               type="tel"
               placeholder={"+977-12243443"}
            />
         </Grid>

         <Grid item xs={12}>
            <CustomSwitch control={control} errors={errors} name={"is_tax"} label={"Is Tax"} />
         </Grid>
      </>
   );
};
const Step2 = () => {
   const {
      control,
      formState: { errors },
   } = useFormContext();
   return (
      <>
         <Grid item xs={12}>
            <CustomInput
               name="contact_person_name"
               control={control}
               errors={errors}
               title={"Contact person's name"}
               placeholder="Elon musk"
            />
            
         </Grid>

         <Grid item xs={12}>
            <CustomInput
               name="contact_person_phone"
               control={control}
               errors={errors}
               type="tel"
               title={"Phone no"}
               placeholder="+977-8939383877"
            />
         </Grid>

         <Grid item xs={12}>
            <CustomInput
               name="contact_person_email"
               control={control}
               errors={errors}
               title={"Email"}
               type="email"
               placeholder="branchcontactperson@branch.com"
               background="#fff"
            />
         </Grid>
         <Grid item xs={12}>
            <CustomInput
               name="contact_person_designation"
               control={control}
               errors={errors}
               title={"Designation"}
               placeholder="Manager"
            />
         </Grid>
      </>
   );
};
const Step3 = () => {
   const {
      control,
      formState: { errors },
   } = useFormContext();
   return (
      <>
         <Grid item xs={12}>
            <CustomInput
               name="primary_email"
               control={control}
               errors={errors}
               title={"Email Address"}
               type="email"
               required
               placeholder={"stewart100james@gmail.com"}
            />
         </Grid>

         <Grid item xs={12}>
            <CustomInput
               name="primary_phone"
               control={control}
               errors={errors}
               title={"Phone No."}
               type="number"
               placeholder="9843908328"
               required
            />
         </Grid>
         <Grid item xs={12}>
            <CustomInput
               name="website"
               control={control}
               errors={errors}
               title={"Website"}
               placeholder="www.scodus.com"
            />
         </Grid>
         <Grid item xs={12}>
            <CustomFileUpload
               control={control}
               errors={errors}
               name="image"
               fileComponent={<FileUpload />}
            />
         </Grid>
      </>
   );
};

const FileUpload = () => {
   const classes = styles();
   const { watch } = useFormContext();
   return (
      <Box>
         <Typography
            sx={{
               color: "#121127",
               fontSize: "13px",
               fontWeight: 600,
               textAlign: "start",
            }}
            gutterBottom
         >
            LOGO
         </Typography>
         <Box className={classes.fileUpload}>
            <Upload />
            <Box>
               <Typography>Choose a file to upload</Typography>
            </Box>
         </Box>
         <Box display={"flex"} flexWrap={"wrap"} mt={2}>
            <Box>
               {watch("image") &&
                  Object.values(watch("image"))?.map((item) => (
                     <Box key={item?.name}>
                        <img
                           style={{ height: "50px" }}
                           src={URL?.createObjectURL(item)}
                        />
                     </Box>
                  ))}
            </Box>
         </Box>
      </Box>
   );
};
