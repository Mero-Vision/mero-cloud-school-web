import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts";

const RouteList = () => {
   return (
      <Routes>
         <Route path="/dashboard" element={<MainLayout />}>
            {/* <Route index element={<>Home</>} />
        <Route path="/rtk" element={<Example />} />;
        <Route path="/rtk-query" element={<RtkQuery />} />;
        <Route path="/nepali-date-picker" element={<NepaliDatePicker />} />;
        <Route path="/inputs" element={<Inputs />} />;
        <Route path="/data-grid" element={<DataGridComponent />} />;
        <Route path="/tree-view" element={<TreeViewComponent />} />; */}
         </Route>
      </Routes>
   );
};

export default RouteList;
