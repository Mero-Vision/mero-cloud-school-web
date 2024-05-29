import { Route, Routes } from "react-router-dom";

import NotFound from "../components/common/404";
import PublicSiteView from "../components/local/PublicSiteView";
import Login from "../components/local/login";
import MainSiteLayout from "../layouts/MainSiteLayout";

const SidebarRoutes = () => {
   return (
      <Routes>
         <Route path="/" element={<MainSiteLayout />}>
            <Route index element={<PublicSiteView />} />
            {/* <Route path="/dashboard/users">
                  <Route index element={<Users />} />
               </Route>
               <Route path="enquiry/enquiry" element={<Enquiry />} /> */}
         </Route>

         <Route path="/login" element={<Login />} />
         <Route path="*" element={<NotFound />} />
      </Routes>
   );
};

export default SidebarRoutes;
