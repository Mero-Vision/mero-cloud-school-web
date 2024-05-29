import { Delete, SwapHorizOutlined } from "@mui/icons-material";
import {
   Box,
   Button,
   CircularProgress,
   IconButton,
} from "@mui/material";
import { useEffect } from "react";
import customToaster from "../../../utils/customToaster";
import CustomModal from "./CustomModal";

const CustomChangeModal = ({
   open,
   handleClose,
   handleConfirm,
   isLoading,
   success,
   error,
   successData,
   favouriteStatus,
   itemStatus,
   isFavourite,
}) => {
   useEffect(() => {
      if (success) {
         customToaster({
            type: "success",
            message: successData?.message || "Success",
         });
         handleClose();
      }
   }, [success]);
   useEffect(() => {
      error?.data?.message &&
         customToaster({
            type: "error",
            message: error?.data?.message,
         });
   }, [error?.data?.message]);

   return (
      <>
         <CustomModal
            open={open}
            width={"500px"}
            height={"230px"}
            icon={<Delete />}
            handleClose={handleClose}
         >
            <Box>
               <Box>
                  <Box
                     style={{
                        fontSize: "17px",
                        textAlign: "center",
                        margin: 0,
                        padding: 0,
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        width: "100%",
                        marginTop: "20px",
                     }}
                  >
                     <IconButton
                        style={{
                           backgroundColor: "#4e8ae733",
                           width: "40px",
                           height: "40px",
                        }}
                     >
                        <SwapHorizOutlined
                           style={{ color: "#4E8AF4" }}
                        />
                     </IconButton>

                     <p
                        style={{
                           fontWeight: "500",
                           margin: 0,
                           padding: 0,
                           marginTop: "10px",
                        }}
                     >
                        Do you want to change the status?
                     </p>
                     {favouriteStatus && (
                        <p
                           style={
                              favouriteStatus == "inactive"
                                 ? {
                                      fontWeight: "300",
                                      margin: 0,
                                      padding: 0,
                                      marginTop: "2px",
                                      fontSize: "16px",
                                      color: "#08C975",
                                   }
                                 : {
                                      fontWeight: "300",
                                      margin: 0,
                                      padding: 0,
                                      marginTop: "2px",
                                      fontSize: "16px",
                                      color: "#E34444",
                                   }
                           }
                        >
                           {isFavourite && (
                              <>
                                 {itemStatus == "active"
                                    ? "Want to remove the item from favourites?"
                                    : "Want to add the item to favourites?"}
                              </>
                           )}
                        </p>
                     )}
                     <p
                        style={
                           favouriteStatus == "inactive"
                              ? {
                                   fontWeight: "300",
                                   margin: 0,
                                   padding: 0,
                                   marginTop: "2px",
                                   fontSize: "16px",
                                   color: "#E34444",
                                }
                              : {
                                   fontWeight: "300",
                                   margin: 0,
                                   padding: 0,
                                   marginTop: "2px",
                                   fontSize: "16px",
                                   color: "#08C975",
                                }
                        }
                     >
                        {!isFavourite && (
                           <>Current status is {favouriteStatus}</>
                        )}
                     </p>

                     <p
                        style={{
                           margin: 0,
                           padding: 0,
                           fontSize: "14px",
                           marginTop: "5px",
                           color: "#43434390",
                        }}
                     >
                        {/* This action is permanent and cannot be undone. */}
                     </p>
                  </Box>
               </Box>

               <Box
                  style={{
                     display: "flex",
                     justifyContent: "center",
                     alignItems: "flex-end",
                     //   height: "60px",
                     gap: "10px",
                     marginTop: "30px",
                  }}
               >
                  <Button
                     onClick={() => handleConfirm()}
                     disabled={isLoading}
                     style={{
                        backgroundColor: "#4E8AF4",
                        color: "white",
                     }}
                  >
                     {isLoading ? (
                        <Box
                           display={"flex"}
                           alignItems={"center"}
                           gap={"10px"}
                        >
                           <CircularProgress
                              size={15}
                              style={{ color: "#fff" }}
                           />
                           Change
                        </Box>
                     ) : (
                        "Change"
                     )}
                  </Button>
                  <Button
                     variant="outlined"
                     onClick={() => handleClose()}
                     style={{
                        color: "#4E8AF4",
                        borderColor: "#4E8AF4",
                     }}
                  >
                     Cancel
                  </Button>
               </Box>
            </Box>
         </CustomModal>
      </>
   );
};

export default CustomChangeModal;
