import { Add } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AllModals from "../../components/common/AllModals/AllModals";
import HasPermission from "../../components/common/Permissions/HasPermission";
import { SidebarConstants } from "../../constants/SidebarConstants";
import useStyles from "./styles";
const Others = {
   label: "Others",
   children: [
      {
         label: "Products",
         url: "/inventory/products",
         pageUrl: "/inventory/products/add",
         permission: "product-view",
      },
      {
         label: "Services",
         url: "/inventory/services",
         permission: "service-view",
      },
      {
         label: "Employees",
         url: "/payroll/employees",
      },
      {
         label: "Charts of Account",
         url: "/accounts/charts-of-account",
         permission: "charts-of-account-view",
      },
      {
         label: "Journal Voucher",
         url: "/accounts/journal-voucher",
         permission: "journal-voucher-view",
      },
   ],
};

const AddAll = () => {
   const classes = useStyles();
   let array = [];
   array = SidebarConstants?.[0]?.items?.slice(2, 4);
   array.push(Others);

   return (
      <Box className={classes.addAllContainer}>
         {array?.map(
            (item, index) =>
               item?.children?.length !== 0 && (
                  <Box key={index}>
                     <Box className={classes.title}>
                        <Typography fontSize={"small"}>
                           {item?.label}
                        </Typography>
                     </Box>
                     {item?.children?.map((item, index) => (
                        <SingleAddAll
                           key={index}
                           item={{ ...item, index }}
                           classes={classes}
                        />
                     ))}
                  </Box>
               )
         )}
      </Box>
   );
};

export default AddAll;

const SingleAddAll = ({ item, classes }) => {
   const [open, setOpen] = useState(false);
   const navigate = useNavigate();
   const handleOpen = () => {
      setOpen(true);
   };
   const handleClose = () => {
      setOpen(false);
   };
   return (
      <Box>
         <HasPermission of={item?.permission}>
            <Box>
               <Button
                  startIcon={<Add />}
                  onClick={() =>
                     item?.pageUrl
                        ? navigate(item?.pageUrl)
                        : handleOpen()
                  }
               >
                  {item?.label}
               </Button>
            </Box>
         </HasPermission>

         <AllModals
            modalType={item?.url?.split("/")?.pop()}
            open={open}
            handleClose={() => handleClose()}
         />
      </Box>
   );
};
