import { Search } from "@mui/icons-material";
import { Box, Button, Grid, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../apis/authApi";
import {
   useGetUsersCompanyBranchQuery,
   useGetUsersCompanyQuery,
} from "../../../../apis/companyApi";
import { useGetPermissionsQuery } from "../../../../apis/permissionsApi";
import NoCompany from "../../../../assets/login/NoCompany.png";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import {
   getCompanyDetail,
   getToken,
   stringifyData,
} from "../../../../utils/helpers";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import HasPermission from "../../../common/Permissions/HasPermission";
import SingleCompanyCard from "./SingleCompanyCard";
import styles from "./styles";

const SwitchCompanyPage = () => {
   const classes = styles();
   return (
      <>
         <CompanySection />
      </>
   );
};

export default SwitchCompanyPage;

const CompanySection = () => {
   const classes = styles();
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const [searchTerm, setSearchTerm] = useState("");
   const { handleNavigate } = useCustomNavigate();
   //  const { user } = useSelector((state) => state?.auth);
   const userData = JSON.parse(localStorage?.getItem("user"));

   useEffect(() => {
      dispatch(auth(getToken()));
   }, []);

   console.log({ userData });

   const {
      data: usersCompanyData,
      isFetching: isUsersCompanyFetching,
      isSuccess: isUsersCompanySuccess,
   } = useGetUsersCompanyQuery();

   const {
      data: permissionsData,
      isFetching: isPermissionsFetching,
      isSuccess: isPermissionsSuccess,
   } = useGetPermissionsQuery();

   const {
      data: branchesData,
      isFetching: isBranchesFetching,
      isSuccess: isBranchesSuccess,
   } = useGetUsersCompanyBranchQuery();

   console.log({ branchesData });

   const items = useMemo(() => {
      // return usersCompanyData?.data?.data?.filter((item) => {
      return branchesData?.data?.data?.filter((item) => {
         if (searchTerm === "") {
            return item;
         } else if (
            // item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
            item?.address
               ?.toLowerCase()
               ?.includes(searchTerm?.toLowerCase())
         ) {
            return item;
         }
      });
   }, stringifyData([branchesData?.data?.data, searchTerm]));

   console.log({ items });

   const {
      control,
      formState: { errors },
   } = useForm({});

   const handleChange = (e) => {
      setSearchTerm(e.target.value);
   };

   const permissions = getCompanyDetail()?.permissions;
   const roles = getCompanyDetail()?.roles;

   const handleCompanySwitch = (item) => {
      if (
         roles?.includes("admin") ||
         permissions?.includes("company-panel-view")
      ) {
         if (item?.status?.toLowerCase() === "active") {
            handleNavigate("/");
            localStorage.setItem(
               "company",
               JSON.stringify(item) || ""
            );
            localStorage.setItem(
               "is_company",
               JSON.stringify(true) || ""
            );
         }
      } else if (
         !roles?.includes("admin") &&
         !permissions?.includes("company-panel-view") &&
         permissions?.includes("company-pos-view")
      ) {
         if (item?.status?.toLowerCase() === "active") {
            handleNavigate("/pos");
            localStorage.setItem(
               "company",
               JSON.stringify(item) || ""
            );
            localStorage.setItem(
               "is_company",
               JSON.stringify(true) || ""
            );
         }
      }
   };

   const companyName = getCompanyDetail()?.business_name;

   console.log("getCom", getCompanyDetail());

   return (
      <Box>
         <Box className={classes.mainDiv}>
            <Box>
               <Typography className={classes.companyTitle}>
                  {companyName}
               </Typography>
               <Typography className={classes.title}>
                  Select Your Branch
               </Typography>
               <Box className={classes.addCompanyDiv}>
                  <HasPermission of="branch-create">
                     <Typography>
                        Want to add a new branch?
                     </Typography>
                     <Typography
                        onClick={() => navigate("/add-branch")}
                     >
                        Add Branch
                     </Typography>
                  </HasPermission>
               </Box>
            </Box>
            <Box className={classes.searchbar}>
               <Box className={classes.inputDiv}>
                  <input
                     name={"searchWord"}
                     placeholder="Search branch"
                     value={searchTerm}
                     onChange={handleChange}
                     type="search"
                  />
               </Box>
               <Box className={classes.searchIcon}>
                  <Search />
               </Box>
            </Box>
            <Box className={classes.companyCards}>
               {isBranchesFetching && <CustomLoader />}
               {!isBranchesFetching &&
                  isBranchesSuccess &&
                  (items?.length ? (
                     <Grid
                        container
                        spacing={2}
                        justifyContent={items?.length < 6 && "center"}
                     >
                        {items?.map((item, index) => (
                           <SingleCompanyCard
                              item={item}
                              key={item?.id}
                              index={index}
                              handleCompanySwitch={
                                 handleCompanySwitch
                              }
                           />
                        ))}
                     </Grid>
                  ) : (
                     <Box
                        sx={{
                           display: "flex",
                           justifyContent: "center",
                        }}
                     >
                        {" "}
                        <Box className={classes.noCompanyDiv}>
                           <img
                              src={NoCompany}
                              style={{
                                 width: "105px",
                                 height: "80px",
                              }}
                           />
                           <Box>
                              <Typography
                                 sx={{
                                    color: "#4C4B63",
                                    fontSize: "16px",
                                    fontWeight: "600",
                                 }}
                              >
                                 No Branch Found!
                              </Typography>
                              <Typography
                                 sx={{
                                    color: "#4C4B63",
                                    fontSize: "13px",
                                    fontWeight: "300",
                                 }}
                              >
                                 Want to add a new branch?
                              </Typography>
                           </Box>
                           <Button
                              variant="blue"
                              onClick={() => navigate("/add-branch")}
                           >
                              Add New Branch
                           </Button>
                        </Box>
                     </Box>
                  ))}
            </Box>
            {/* {userData?.branches?.length ? (
               <Box width={"255px"}>
                  <Button
                     startIcon={<SubdirectoryArrowRight />}
                     onClick={() => handleNavigate("/")}
                     className={classes.dashboardButton}
                     fullWidth
                  >
                     Go To Dashboard
                  </Button>
               </Box>
            ) : (
               <></>
            )} */}
         </Box>
      </Box>
   );
};
