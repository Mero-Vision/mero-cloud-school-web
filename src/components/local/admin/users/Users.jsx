import { MailOutline } from "@mui/icons-material";
import PeopleIcon from "@mui/icons-material/People";
import { Button } from "@mui/material";
import React from "react";

import useModal from "../../../../hooks/useModal";
import useTabs from "../../../../hooks/useTabs";
import AllModals from "../../../common/AllModals/AllModals";
import UserTable from "./UserTable";

const data = [
   {
      label: "Users",
      value: "customers",
      icon: <PeopleIcon />,
   },

   {
      label: "User Invitations",
      value: "user_invitations",
      icon: <MailOutline />,
   },
];

const Users = () => {
   const { modals, handleOpen, handleClose, row } = useModal();

   const { value, Tabs, setTab } = useTabs({
      data: data,
      button: (
         <Button
            variant="contained"
            startIcon={<MailOutline />}
            onClick={() => handleOpen("add_user")}
         >
            Invite User
         </Button>
      ),
   });

   return (
      <div>
         {Tabs}

         <UserTable setTab={setTab} />

         <AllModals
            modalType={"add_user"}
            open={modals?.add_user}
            handleClose={() => {
               handleClose("add_user");
            }}
            value={value}
         />
      </div>
   );
};

export default Users;
