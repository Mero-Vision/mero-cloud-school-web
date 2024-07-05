import { Delete, Edit } from "@mui/icons-material";
import {
   Avatar,
   Box,
   Button,
   Chip,
   Grid,
   IconButton,
   Tooltip,
   Typography,
   capitalize,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteCompanyMutation } from "../../../../apis/companyApi";
import useCheckAdmin from "../../../../hooks/useCheckAdmin";
import useModal from "../../../../hooks/useModal";
import { getCompanyDetail } from "../../../../utils/helpers";
import AllModals from "../../../common/AllModals/AllModals";
import CustomDeleteModal from "../../../common/CustomModal/CustomDeleteModal";
import CustomMoreOptionButton from "../../../common/CustomMoreOptionButton/CustomMoreOptionButton";
import styles from "./styles";

const items = [
   {
      icon: <Edit fontSize="small" />,
      text: "Edit",
      modalType: "edit",
   },
   {
      icon: <Delete fontSize="small" />,
      text: "Delete",
      modalType: "delete",
   },
];

const SingleCompanyCard = ({
   item,
   handleCompanySwitch = () => {},
}) => {
   const classes = styles();
   const navigate = useNavigate();
   const [showEdit, setShowEdit] = useState(false);
   const { modals, row, handleOpen, handleClose } = useModal();
   const { checkCompanyAdmin } = useCheckAdmin();
   const [
      deleteItem,
      { isLoading, isSuccess, error, data: successData },
   ] = useDeleteCompanyMutation();
   const handleConfirm = () => {
      deleteItem(item?.id);
   };

   const allBranches = getCompanyDetail()?.branches;

   const handleEditLink = (item) => {
      navigate("/add-branch", { state: item });
   };

   const handleShowEdit = () => {
      setShowEdit((prev) => !prev);
   };

   console.log({ item });

   return (
      <Grid item xs={12} md={3}>
         <Box
            className={classes.hoverDiv}
            onMouseEnter={handleShowEdit}
            onMouseLeave={handleShowEdit}
         >
            {showEdit && item?.type !== "head" && (
               <IconButton
                  onClick={() => handleEditLink(item)}
                  sx={{
                     position: "absolute",
                     top: 5,
                     right: 5,
                     height: "30px",
                     width: "30px",
                     backgroundColor: "#48484808",

                     "&:hover": {
                        outline: "2px solid #3DC0D7",
                     },
                  }}
               >
                  <Edit sx={{ fontSize: "16px" }} />
               </IconButton>
            )}

            <Box
               className={classes.singleCard}
               onClick={() => handleCompanySwitch(item)}
               sx={
                  item?.status?.toLowerCase() !== "active" && {
                     cursor: "not-allowed",
                  }
               }
            >
               <Box
                  className={classes.companyDetails}
                  sx={
                     item?.status?.toLowerCase() !== "active" && {
                        cursor: "not-allowed !important",
                     }
                  }
               >
                  <Avatar
                     src={item?.logo?.url}
                     sx={{ textTransform: "capitalize" }}
                     variant="square"
                  >
                     {!item?.logo?.url &&
                        (item?.short_name?.charAt(0) ||
                           item?.name?.charAt(0))}
                  </Avatar>{" "}
                  <Box className="nameBox">
                     <Tooltip title={item?.address || item?.name}>
                        <Typography
                           className={["name", "line-clamp"]}
                           sx={{
                              maxWidth: "150px",
                              overflow: "hidden",
                           }}
                        >
                           {item?.address || item?.name || "-"}
                        </Typography>
                     </Tooltip>
                     <Box className="branchTypeButtonBoxWrap">
                        <Box className="branchTypeButtonBox">
                           {/* <Button className="branchTypeButton">
                     {item?.type}
                  </Button> */}
                           <Chip
                              sx={{
                                 padding: "0px",
                                 backgroundColor: "#599BF9",
                                 color: "#fff",
                                 fontSize: "11px",
                                 width: "55px",
                                 height: "18px",
                                 textTransform: "capitalize",
                              }}
                              label={item?.type}
                           />
                        </Box>
                        <Status item={item} />
                     </Box>
                  </Box>
               </Box>
            </Box>
            {item?.package?.pivot?.is_expired && (
               <Box className="updatePlan">
                  <Button
                     variant="blue"
                     onClick={() => navigate("/renew-plan")}
                  >
                     Renew Plan
                  </Button>
               </Box>
            )}
            {checkCompanyAdmin(item?.admin_id) && (
               <Box className="options">
                  <CustomMoreOptionButton
                     items={items}
                     handleOpenModal={handleOpen}
                     row={item}
                     size="small"
                     position="left"
                  />
               </Box>
            )}
         </Box>
         <CustomDeleteModal
            open={modals?.delete}
            handleClose={() => handleClose("delete")}
            isLoading={isLoading}
            handleConfirm={handleConfirm}
            success={isSuccess}
            error={error}
            successData={successData}
         />
         <AllModals
            modalType={"edit_company"}
            handleClose={() => handleClose("edit")}
            open={modals?.edit}
            row={item}
         />
      </Grid>
   );
};

export default SingleCompanyCard;

const Status = ({ item }) => {
   const status = item?.status?.toLowerCase() || "pending";
   const switchColor = () => {
      switch (status) {
         case "active":
            return "#24C046";
         case "inactive":
            return "#FF4B12";
         case "pending":
         default:
            return "#FD8515";
      }
   };
   return (
      <Box>
         <Typography
            sx={{
               color: item?.package?.pivot?.is_expired
                  ? "red"
                  : switchColor(),
               fontSize: "13px",
               display: "flex",
            }}
         >
            <Box sx={{ marginRight: "2px" }}>• </Box>
            {item?.package?.pivot?.is_expired
               ? "Expired"
               : capitalize(status)}
         </Typography>
      </Box>
   );
};
