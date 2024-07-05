import useModal from "../hooks/useModal";
import Sidebar from "./sidebar";

import { BugReport } from "@mui/icons-material";
import { Box } from "@mui/material";

import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { CaptureElement } from "react-capture-element";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import * as yup from "yup";
import { useCreateBugMutation } from "../apis/bugfeedbackApi";
import { useGetSingleUserInfoQuery } from "../apis/usersApi";
import CustomButton from "../components/common/CustomButton/CustomButton";
import { CustomInput } from "../components/common/CustomInputs/CustomInput";
import CustomModal from "../components/common/CustomModal/CustomModal";
import { setDynamicData } from "../rootRedux/utilsSlice";
import Navbar from "./dashboardNavbar";
import useStyles from "./styles";

const MainLayout = () => {
   const classes = useStyles();
   const dispatch = useDispatch();
   const location = useLocation();
   const [img, setImg] = useState();
   const { modals, handleClose, handleOpen } = useModal();
   const { data: userDetails } = useGetSingleUserInfoQuery();

   useEffect(() => {
      if (userDetails) {
         dispatch(
            setDynamicData({
               type: "userDetails",
               ...userDetails?.data,
            })
         );
      }
   }, [dispatch, userDetails]);

   return (
      <>
         <CaptureElement
            onCapture={({ dataUrl, blob }) => {
               console.log({ dataUrl, blob });
               handleOpen("add_report");
               setImg(dataUrl);
            }}
         >
            {({ onStartCapture, onStopCapture }) => (
               <>
                  <Box className={classes.rootDashboard}>
                     {location?.pathname !== "/document/new" && (
                        <Sidebar />
                     )}
                     <Box
                        sx={{ background: "#F9F9FB", width: "100%" }}
                     >
                        <Box
                           sx={{
                              paddingInline: "46px",
                           }}
                        >
                           <Navbar />
                        </Box>
                        {/* <Divider /> */}
                        <Box className={classes.contentDashboard}>
                           <Outlet />
                        </Box>

                        {/* <Box className={classes.floatingButtonWrapper}>
                  <Box className={classes.floatingButton}>
                    <IconButton onClick={onStartCapture}>
                      <BugReport />
                    </IconButton>
                  </Box>
                </Box> */}
                     </Box>
                  </Box>

                  {modals?.add_report && (
                     <CustomModal
                        open={modals?.add_report}
                        handleClose={() => handleClose("add_report")}
                        modalTitle={"Report a bug"}
                        icon={<BugReport />}
                        width={"900px"}
                     >
                        <ReportBugForm
                           image={img}
                           onStopCapture={onStopCapture}
                           handleClose={() =>
                              handleClose("add_report")
                           }
                        />
                     </CustomModal>
                  )}
               </>
            )}
         </CaptureElement>
      </>
   );
};

export default MainLayout;

function dataURItoBlob(dataURI) {
   // convert base64/URLEncoded data component to raw binary data held in a string
   var byteString;
   if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
   else byteString = unescape(dataURI.split(",")[1]);

   // separate out the mime component
   var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

   // write the bytes of the string to a typed array
   var ia = new Uint8Array(byteString?.length);
   for (var i = 0; i < byteString?.length; i++) {
      ia[i] = byteString.charCodeAt(i);
   }

   return new Blob([ia], { type: mimeString });
}

const ReportBugForm = ({ image, onStopCapture, handleClose }) => {
   const [createBug, { isLoading, isSuccess, data }] =
      useCreateBugMutation();
   const validationSchema = yup.object().shape({
      description: yup.string().required("Description is required"),
   });

   const {
      control,
      formState: { errors },
      handleSubmit,
   } = useForm({
      resolver: yupResolver(validationSchema),
   });

   const dispatch = useDispatch();
   useEffect(() => {
      onStopCapture();
   }, []);

   const onSubmit = (values) => {
      const formData = new FormData();
      formData.append("screenshot", dataURItoBlob(image));
      formData.append("description", values?.description);
      dispatch(createBug(formData));
   };

   useEffect(() => {
      if (isSuccess) {
         handleClose();
      }
   }, [isSuccess]);

   return (
      <>
         <form onSubmit={handleSubmit(onSubmit)}>
            <Box
               style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "30px",
               }}
            >
               <img
                  src={image}
                  style={{
                     height: "400px",
                     width: "700px",
                     objectFit: "contain",
                  }}
               />
            </Box>
            <CustomInput
               control={control}
               errors={errors}
               name="description"
               title="Description"
               rows={10}
            />

            <CustomButton
               buttonName={"Submit"}
               loading={isLoading}
               success={isSuccess}
               successData={data}
            />
         </form>
      </>
   );
};
