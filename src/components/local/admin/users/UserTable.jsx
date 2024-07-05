import { Edit, PersonOff } from "@mui/icons-material";
import { Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetTeachersQuery } from "../../../../apis/teachers";
import useModal from "../../../../hooks/useModal";
import AllModals from "../../../common/AllModals/AllModals";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomDeleteModal from "../../../common/CustomModal/CustomDeleteModal";

const items = [
   {
      icon: <Edit fontSize="small" />,
      text: "Edit",
      modalType: "edit_user",
      permission: "company-user-data-update",
   },

   {
      icon: <PersonOff fontSize="small" />,
      text: "Unassign User",
      modalType: "unassign_user",
      permission: "company-unassign-user",
   },
   //   {
   //     icon: <Delete fontSize="small" />,
   //     text: "Delete",
   //     modalType: "delete_user",
   //     permission: "user-delete",
   //   },
];
const UserTable = ({ setTab = () => {} }) => {
   const { search_keyword = "" } = useSelector(
      (state) => state?.utils
   );
   const { modals, handleOpen, handleClose, row } = useModal();

   const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
   });
   const params = {
      search_keyword,
      page: paginationModel?.page + 1,
      pagination_limit: paginationModel?.pageSize,
   };
   const {
      data: userInfo,
      isFetching,
      isLoading,
      isSuccess,
      error,
      data: successData,
   } = useGetTeachersQuery();

   const columns = [
      {
         flex: 1,
         field: "name",
         headerName: "Full Name",
      },

      {
         flex: 1,
         field: "mobile_no",
         headerName: "Contact Number",
      },
      {
         flex: 1,
         field: "email",
         headerName: "Email Address",
      },
      {
         flex: 1,
         field: "role_name",
         headerName: "Role",
         renderCell: (params) => (
            <>
               <Typography>
                  {params?.row?.roles?.map((item) => item)}
               </Typography>
            </>
         ),
      },
      {
         flex: 1,
         field: "location",
         headerName: "Address",
      },

      {
         flex: 0.3,
         field: "action",
         headerName: "Actions",
         //  renderCell: ActionComponent,
         renderCell: (params) => (
            <>
               <CustomMoreOptionButton
                  items={items}
                  handleOpenModal={handleOpen}
                  row={params?.row}
               />
            </>
         ),
      },
   ];

   const handleButtonClick = () => {
      handleOpen("add_user");
   };

   return (
      <>
         {isFetching && <CustomLoader />}

         {!isFetching && isSuccess && (
            <CustomDataGrid
               rows={userInfo?.data?.data || []}
               columns={columns}
               //   tabsData={data}
               // paginationModel={paginationModel}
               // setPaginationModel={setPaginationModel}
               // pageInfo={userInfo?.data?.meta}
               handleButtonClick={handleButtonClick}
               // value={value}
               name="User"
               isSingleTab
               paginationMode={"client"}
            />
         )}

         <AllModals
            modalType={"edit_user"}
            open={modals?.edit_user}
            handleClose={() => handleClose("edit_user")}
            // value={value}
            modalTitle={"Edit users"}
            row={row}
         />

         <CustomDeleteModal
            handleClose={() => handleClose("unassign_user")}
            open={modals?.unassign_user}
            message={
               "Do you want to unassign this user from the company"
            }
            buttonName={"Unassign"}
            isLoading={isFetching}
            error={error}
            successData={successData}
         />
      </>
   );
};

export default UserTable;
