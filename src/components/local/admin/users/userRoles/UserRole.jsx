import { Add, Delete } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const items = [
   //   {
   //     icon: <Edit fontSize="small" />,
   //     text: "Edit",
   //     modalType: "edit_user_role",
   //     permission: "user-role-update",
   //   },
   {
      icon: <Delete fontSize="small" />,
      text: "Delete",
      modalType: "delete_user",
      permission: "role-delete",
   },
];

function ActionComponent(props) {
   const [openModal, setOpenModal] = useState(false);
   const [modalType, setModalType] = useState("");
   const handleOpenModal = (modalType) => {
      setOpenModal(true);
      setModalType(modalType);
   };
   const handleCloseModal = () => {
      setOpenModal(false);
   };

   return (
      <Box>
         <CustomMoreOptionButton
            items={items}
            handleOpenModal={handleOpenModal}
         />

         <CustomModal
            open={openModal && modalType === "edit_role_user"}
            handleClose={() => handleCloseModal()}
            modalTitle={`Edit`}
         >
            edit
            <pre>{JSON.stringify(props?.row, null, 2)}</pre>
         </CustomModal>
         <CustomModal
            open={openModal && modalType === "delete"}
            handleClose={() => handleCloseModal()}
            modalTitle={`DELETE`}
         >
            DELETE{" "}
         </CustomModal>
      </Box>
   );
}

const data = [
   {
      label: "All User Roles",
      value: "userRole",
      icon: <PeopleIcon />,
   },
];

const UserRole = () => {
   const { modals, handleOpen, handleClose, row } = useModal();

   const navigate = useNavigate();

   const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
   });

   const params = {
      page: paginationModel?.page + 1,
      pagination_limit: paginationModel?.pageSize,
   };

   const {
      data: userRoleInfo,
      isFetching,
      isSuccess,
   } = useGetUsersRoleQuery(params);

   const [
      deleteUsersRole,
      { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess },
   ] = useDeleteUsersRoleMutation();

   const { value, Tabs } = useTabs({
      data,
      button: (
         <HasPermission of="role-create">
            <Button
               variant="contained"
               startIcon={<Add />}
               onClick={() => handleOpen("add_user_role")}
            >
               Add New
            </Button>
         </HasPermission>
      ),
      hideSearch: true,
   });

   const columns = [
      {
         flex: 1,
         field: "name",
         headerName: "Role Name",
         renderCell: ({ row }) => {
            const userRole = getCompanyDetail()?.roles;
            const permissions = getCompanyDetail()?.permissions;

            const isAdmin = userRole?.includes("admin");
            const hasRoleViewPermission = permissions?.includes(
               "role-assign-permission"
            );

            const handleClick = () => {
               if (isAdmin) {
                  navigate(`permission?id=${row?.id}`);
               } else if (!isAdmin && hasRoleViewPermission) {
                  navigate(`permission?id=${row?.id}`);
               } else {
                  // nothing
               }
            };
            return (
               <Typography
                  className={row?.company !== null && "title"}
                  onClick={
                     row?.company !== null ? handleClick : undefined
                  }
               >
                  {row?.name}
               </Typography>
            );
         },
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

   console.log({ row });
   const deleteRole = () => {
      deleteUsersRole(row?.id);
   };

   useEffect(() => {
      if (isDeleteSuccess) {
         handleClose("delete_user");
      }
   }, [isDeleteSuccess]);

   const handleButtonClick = () => {
      handleOpen("add_user_role");
   };

   return (
      <div>
         {Tabs}

         {isFetching && <CustomLoader />}

         {!isFetching && isSuccess && (
            <CustomDataGrid
               rows={userRoleInfo?.data?.data || []}
               columns={columns}
               tabsData={data}
               // paginationModel={paginationModel}
               // setPaginationModel={setPaginationModel}
               // pageInfo={userRoleInfo?.meta}
               // getRowClassName={(params) =>
               //    (params?.row?.is_default === 1 ||
               //       params?.row?.company === null) &&
               //    "is_default"
               // }
               handleButtonClick={handleButtonClick}
               value={value}
               name="User Role"
               isSingleTab
               paginationMode={"client"}
            />
         )}

         <AllModals
            modalType={"add_user_role"}
            open={modals?.add_user_role}
            handleClose={() => handleClose("add_user_role")}
            value={value}
         />
         <AllModals
            modalType={"edit_user_role"}
            open={modals?.edit_user_role}
            handleClose={() => handleClose("edit_user_role")}
            value={value}
            modalTitle={"Edit user role"}
            row={row}
         />
         <AllModals
            modalType={"delete_user"}
            handleClose={() => handleClose("delete_user")}
            open={modals?.delete_user}
            row={row}
            handleConfirm={deleteRole}
            isLoading={isDeleteLoading}
         />
      </div>
   );
};

export default UserRole;
