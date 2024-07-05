import { Box } from "@mui/material";
import React, { useState } from "react";
import DashboardHeader from "./header/DashboardHeader";

const Dashboard = () => {
   const [toggle, setToggle] = useState(false);

   // const {
   //    data: dashboardData,
   //    isLoading: dashboardLoading,
   //    isFetching: dashboardFetching,
   // } = useGetDashboardDataQuery();
   return (
      <>
         <Box
            display={"flex"}
            flexDirection={"column"}
            rowGap="28px"
            mb={"2rem"}
         >
            <DashboardHeader dashboardData={[]} />
         </Box>
      </>
   );
};

export default Dashboard;
