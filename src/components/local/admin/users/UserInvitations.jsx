import { Delete } from "@mui/icons-material";
import React from "react";
import {
   useDeleteUsersInvitationRoleMutation,
   useGetInvitationQuery,
} from "../../../apis/usersApi";
import useModal from "../../../hooks/useModal";
import { changeDateFormat } from "../../../utils/helpers";
import CustomDataGrid from "../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../common/CustomLoader/CustomLoader";
import CustomDeleteModal from "../../common/CustomModal/CustomDeleteModal";
import CustomMoreOptionButton from "../../common/CustomMoreOptionButton/CustomMoreOptionButton";

const items = [
   //   {
   //     icon: <Edit fontSize="small" />,
   //     text: "Edit",
   //     modalType: "edit_user_role",
   //     permission: "user-role-update",
   //   },
   {
      icon: <Delete fontSize="small" />,
      text: "Remove Invitaion",
      modalType: "remove_invitation",
      permission: "role-delete",
   },
];

const UserInvitations = () => {
   const { modals, handleOpen, handleClose, row } = useModal();

   const userData = JSON.parse(localStorage?.getItem("user"));
   const { data, isFetching } = useGetInvitationQuery({
      company_id: userData?.company?.id,
   });

   console.log({ data, userData });

   const [
      deleteUsersInvitationRole,
      {
         isLoading: customerLoading,
         isSuccess: isDeleteSuccess,
         error,
         data: successData,
      },
   ] = useDeleteUsersInvitationRoleMutation();

   const handleDelete = () => {
      const finalData = {
         company_id: userData?.company?.id,
         user_id: row?.id,
      };
      deleteUsersInvitationRole(finalData);
   };

   const columns = [
      {
         flex: 0.5,
         field: "email",
         headerName: "Email",
         renderCell: ({ row }) => (
            <>
               {row?.user?.name} ({row?.user?.email})
            </>
         ),
      },
      {
         flex: 0.5,
         field: "created_at",
         headerName: "Created At",
         renderCell: ({ row }) => (
            <>{changeDateFormat(row?.created_at)}</>
         ),
      },
      {
         flex: 0.1,
         field: "action",
         headerName: "Actions",
         renderCell: ({ row }) => (
            <>
               {row?.company !== null && (
                  <CustomMoreOptionButton
                     items={items}
                     handleOpenModal={handleOpen}
                     row={row}
                  />
               )}
            </>
         ),
      },
   ];

   return (
      <div>
         {isFetching ? (
            <CustomLoader />
         ) : (
            <CustomDataGrid
               rows={data?.data?.data || []}
               columns={columns}
               //   tabsData={data}
               //   paginationModel={paginationModel}
               //   setPaginationModel={setPaginationModel}
               //   pageInfo={userInfo?.meta}
            />
         )}
         {/* <AllModals
            modalType={"remove_invitation"}
            handleClose={() => handleClose("remove_invitation")}
            open={modals?.remove_invitation}
            row={row}
            // handleConfirm={deleteRole}
            // isLoading={isDeleteLoading}
         /> */}
         <CustomDeleteModal
            handleClose={() => handleClose("remove_invitation")}
            open={modals?.remove_invitation}
            isLoading={customerLoading}
            handleConfirm={handleDelete}
            success={isDeleteSuccess}
            error={error}
            successData={successData}
         />
      </div>
   );
};

export default UserInvitations;
