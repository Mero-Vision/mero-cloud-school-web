import { Route, Routes } from "react-router-dom";

import NotFound from "../components/common/404";
import PublicSiteView from "../components/local/PublicSiteView";
import OurStory from "../components/local/PublicSiteView/OurStory/Index";
import TestPage from "../components/local/admin/heloTest";
import Users from "../components/local/admin/users/Users";
import Dashboard from "../components/local/dashboard/Dashboard";
import Login from "../components/local/login";
import MainLayout from "../layouts";
import MainSiteLayout from "../layouts/MainSiteLayout";
import RedirectLayout from "../layouts/RedirectLayout";

const SidebarRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<MainSiteLayout />}>
            <Route index element={<PublicSiteView />} />
            <Route path="/our-story" element={<OurStory />} />
            {/* <Route path="/dashboard/users">
                  <Route index element={<Users />} />
               </Route>
               <Route path="enquiry/enquiry" element={<Enquiry />} /> */}
         </Route>
         <Route element={<RedirectLayout />}>
            {/* <Route path="/dashboard" element={<MainLayout />}>
               <Route index element={<Dashboard />} />
               <Route path="/dashboard/users">
                  <Route index element={<Users />} />
               </Route>
               <Route path="/dashboard/reports">
                  <Route index element={<TestPage />} />
               </Route>
            </Route> */}
            <Route element={<MainLayout />}>
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/reports" element={<TestPage />} />
               <Route path="/users" element={<Users />} />
            </Route>
         </Route>

         <Route path="/login" element={<Login />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};

export default SidebarRoutes;
