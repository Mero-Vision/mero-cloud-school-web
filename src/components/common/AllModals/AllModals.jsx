import { Person } from "@mui/icons-material";
import React from "react";

import AddCompanyUser from "../../local/admin/users/AddCompanyUser";
import CustomDeleteModal from "../CustomModal/CustomDeleteModal";
import CustomModal from "../CustomModal/CustomModal";

const AllModals = ({
   modalType,
   open,
   value,
   handleClose,
   row,
   handleConfirm,
   isLoading,
   isService,
   id,
   inputValue = "",
   uuid,
   account_type,
   modalTitle,
   parentCategory,
   rosterTime,
   initialRow,
   employees,
   isEditMode,
   selectedDate,
   closeModal,
   pos,
   deliveryForm,
}) => {
   const returnModal = () => {
      console.log("llcllcllvlllll", { initialRow });

      switch (modalType) {
         case "edit_user":
         case "add_user":
            return (
               <CustomModal
                  open={open}
                  handleClose={handleClose}
                  modalTitle={` ${modalTitle ?? "New user"}`}
                  icon={<Person />}
                  width={"500px"}
               >
                  <AddCompanyUser
                     type={value}
                     handleClose={handleClose}
                     row={row}
                  />
               </CustomModal>
            );
         case "delete_user":
            return (
               <>
                  <CustomDeleteModal
                     open={open}
                     handleClose={handleClose}
                     isLoading={isLoading}
                     handleConfirm={handleConfirm}
                  />
               </>
            );

         case "edit_user_role":
         // case "add_user_role":
         //    return (
         //       <CustomModal
         //          open={open}
         //          handleClose={handleClose}
         //          modalTitle={` ${modalTitle ?? "New user role"}`}
         //          icon={<Person />}
         //          width={"500px"}
         //       >
         //          <AddCompanyUserRole
         //             type={value}
         //             handleClose={handleClose}
         //             row={row}
         //          />
         //       </CustomModal>
         //    );
         // case "delete_user_role":
         //    return (
         //       <>
         //          <CustomDeleteModal
         //             open={open}
         //             handleClose={handleClose}
         //             isLoading={isLoading}
         //             handleConfirm={handleConfirm}
         //          />
         //       </>
         //    );
      }
   };
   return <div>{returnModal()}</div>;
};

export default AllModals;
