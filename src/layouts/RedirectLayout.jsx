import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useGetSingleCompanyQuery } from "../apis/companyApi";
import { setDynamicData } from "../rootRedux/utilsSlice";
import { isPwa } from "../utils/helpers";

const RedirectLayout = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();
   const { user } = useSelector((state) => state?.auth);
   const FIRM = useMemo(() => user?.accounting_firms?.[0], [user]);

   const company = useMemo(
      () => JSON.parse(localStorage?.getItem("company")),
      [localStorage?.getItem("company")]
   );

   console.log({ isPwa: isPwa() });

   const { data: singleItem } = useGetSingleCompanyQuery(
      { id: company?.id },
      { skip: !company?.id }
   );

   const companyDetail = useMemo(
      () => JSON.parse(localStorage?.getItem("company") || null),
      [localStorage?.getItem("company")]
   );

   const token = localStorage.getItem("account_access_token") || "";

   // useEffect(() => {
   //   if (!token) {
   //     localStorage.clear();
   //     navigate(`/login`);
   //   }
   // }, [token]);

   useEffect(() => {
      singleItem?.data &&
         dispatch(
            setDynamicData({ ...singleItem?.data, type: "company" })
         );
   }, [singleItem?.data]);

   useEffect(() => {
      if (token && companyDetail?.id) {
         navigate(location?.pathname + location?.search || "/");
      } else if (
         token &&
         FIRM?.id &&
         location?.pathname?.includes("firm")
      ) {
         navigate(
            location?.pathname + location?.search || "/switch-company"
         );
      } else if (token && !companyDetail?.id && !FIRM?.id) {
         navigate("/switch-company");
      }
   }, [token, companyDetail, FIRM]);
   return (
      <Box sx={{ minWidth: "1200px" }}>
         <Outlet />
      </Box>
   );
};

export default RedirectLayout;
