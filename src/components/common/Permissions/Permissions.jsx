import { Box, Typography } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { useGetPermissionsQuery } from "../../../apis/permissionsApi";
import {
   useAssignPermissionRolesMutation,
   useGetSingleRoleQuery,
} from "../../../apis/usersApi";
import useQuery from "../../../hooks/useQuery";
import {
   replaceFunction,
   stringifyData,
} from "../../../utils/helpers";
import CustomBackButton from "../CustomButton/CustomBackButton";
import CustomButton from "../CustomButton/CustomButton";
import CustomLoader from "../CustomLoader/CustomLoader";
import styles from "./styles";

const Permissions = ({ LIST = [], type }) => {
   const { data: permissions, isLoading: isPermissionLoading } =
      useGetPermissionsQuery({
         show_in: "admin_panel",
      });

   const modifiedPermissionWithCategory = permissions?.data?.data;

   const groupedData =
      modifiedPermissionWithCategory?.length > 0 &&
      modifiedPermissionWithCategory?.reduce((result, item) => {
         const category = item?.category;

         result[category] = result[category] || {
            name: category,
            data: [],
         };
         result[category]?.data?.push(item.name);

         return result;
      }, {});

   const List = groupedData && Object.values(groupedData);

   console.log({ groupedData, List });

   const [permissionsState, setPermissionsState] = useState({});
   const { query: id } = useQuery();

   const { data: singleUser, isLoading: singleRoleLoading } =
      useGetSingleRoleQuery({
         id,
      });

   const [
      assignPermission,
      {
         error,
         data: successData,
         isLoading: isPostLoading,
         isSuccess: isPostSuccess,
      },
   ] = useAssignPermissionRolesMutation();

   const SINGLE_USER_PERMISSIONS = useMemo(() => {
      const inputArray = singleUser?.data?.permissions;
      const outputObject = {};

      inputArray?.forEach((item) => {
         outputObject[item] = true;
      });

      return outputObject;
   }, stringifyData([singleUser?.data?.permissions]));

   useEffect(() => {
      SINGLE_USER_PERMISSIONS &&
         setPermissionsState(SINGLE_USER_PERMISSIONS);
   }, stringifyData([singleUser?.data?.permissions]));

   const handlePermissions = (e) => {
      setPermissionsState((prev) => {
         return { ...prev, [e.target.name]: e.target.checked };
      });
   };

   const onSubmit = (e) => {
      e.preventDefault();
      const LIST = List?.map((item) => item?.name);
      const permissions =
         permissionsState &&
         Object.keys(permissionsState)?.filter(
            (key) => permissionsState?.[key]
         );
      const finalData = {
         id: id,
         permissions: permissions?.filter(
            (item) => !LIST?.includes(item)
         ),
      };

      assignPermission(finalData);
   };
   const handleSelectAll = (e) => {
      const flatList = List?.map((item) => item?.data)?.flat();
      const list = flatList?.reduce((obj, item) => {
         obj[item] = e.target.checked;
         return obj;
      }, {});
      setPermissionsState(list);
   };

   return (
      <Box>
         <form onSubmit={onSubmit}>
            <Box>
               <Box
                  display={"flex"}
                  alignItems="baseline"
                  justifyContent={"space-between"}
                  sx={{
                     backgroundColor: "#fff !important",
                     borderRadius: "6px",
                     marginBottom: "10px",
                     padding: "0px 10px",
                     //  position: "sticky",
                     //  top: 0,
                     //  zIndex: "1000",
                  }}
               >
                  <CustomBackButton />

                  <Box
                     sx={{
                        display: "flex",
                        alignItems: "center",
                        columnGap: "20px",
                     }}
                  >
                     <Box
                        sx={{
                           display: "flex",
                           alignItems: "center",
                           columnGap: "4px",
                        }}
                        mt={3}
                     >
                        <input
                           type="checkbox"
                           name={"select_all"}
                           id={"select_all"}
                           onChange={handleSelectAll}
                           key={"select_all"}
                        />
                        <Typography
                           component={"label"}
                           fontSize="small"
                           for={"select_all"}
                           className="title"
                        >
                           Select All{" "}
                        </Typography>
                     </Box>
                     <CustomButton
                        loading={isPostLoading}
                        error={error}
                        success={isPostSuccess}
                        successData={successData}
                     />
                  </Box>
               </Box>
            </Box>
            {singleRoleLoading || isPermissionLoading ? (
               <CustomLoader />
            ) : (
               <Box
                  sx={{
                     height: "calc(100vh - 180px )",
                     overflowY: "auto",
                  }}
               >
                  {List?.length > 0 &&
                     List?.map((item) => (
                        <InnerPermission
                           key={item?.name}
                           item={item}
                           handlePermissions={handlePermissions}
                           permissionsState={permissionsState}
                           setPermissionsState={setPermissionsState}
                        />
                     ))}
               </Box>
            )}
            {/* )} */}
         </form>
      </Box>
   );
};

export default Permissions;

const InnerPermission = ({
   item,
   handlePermissions,
   permissionsState,
   setPermissionsState,
}) => {
   const classes = styles();
   const checkList = item?.data
      ?.map((item) => permissionsState?.[item])
      ?.filter((item) => item);

   useEffect(() => {
      if (checkList?.length === item?.data?.length) {
         setPermissionsState((prev) => {
            return { ...prev, [item?.name]: true };
         });
      } else {
         setPermissionsState((prev) => {
            return { ...prev, [item?.name]: false };
         });
      }
   }, stringifyData([checkList, permissionsState?.[item?.name]]));

   const handleParentClick = (e) => {
      const childList = item?.data?.map((item) => item);
      let outputObject = {};

      childList?.forEach((item) => {
         outputObject[item] = e.target.checked ? true : false;
      });
      setPermissionsState((prev) => {
         return { ...prev, ...outputObject };
      });
   };
   return (
      <Box className={classes.div}>
         <Box px="1rem">
            {" "}
            <Box className={classes.checkBox}>
               <input
                  type="checkbox"
                  name={item?.name}
                  id={item?.name}
                  onChange={handleParentClick}
                  checked={permissionsState?.[item?.name]}
                  key={item?.name}
               />
               <Typography
                  component={"label"}
                  fontSize="small"
                  for={item?.name}
                  sx={{ px: "10px" }}
               >
                  {replaceFunction(
                     item?.name?.toUpperCase(),
                     "-",
                     " "
                  )}
               </Typography>
            </Box>
         </Box>
         <Box className={classes.singleContainer}>
            {item?.data?.map((row) => (
               <SinglePermission
                  row={{
                     name: row,
                     parent_name: item?.name,
                  }}
                  name={item?.name}
                  key={row}
                  handlePermissions={handlePermissions}
                  permissionsState={permissionsState}
                  setPermissionsState={setPermissionsState}
                  item={item}
               />
            ))}
         </Box>
      </Box>
   );
};

const SinglePermission = ({
   row,
   handlePermissions,
   permissionsState,
}) => {
   const classes = styles();

   return (
      <Box>
         <Box className={classes.checkBox}>
            <input
               type="checkbox"
               name={row?.name}
               id={row?.name}
               onChange={handlePermissions}
               checked={permissionsState?.[row?.name]}
            />
            <Typography
               component={"label"}
               fontSize="small"
               for={row?.name}
               sx={{ paddingX: "10px" }}
            >
               {replaceFunction(row?.name, "-", " ")}
            </Typography>
         </Box>
      </Box>
   );
};
