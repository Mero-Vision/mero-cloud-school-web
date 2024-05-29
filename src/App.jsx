import { CssBaseline } from "@mui/material";
import { Suspense } from "react";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomLoader from "./components/common/CustomLoader/CustomLoader";
import SidebarRoutes from "./routes/SidebarRoutes";
import ErrorBoundary from "./utils/ErrorBoundary";

function App() {
   return (
      <div>
         <ErrorBoundary>
            <Suspense fallback={<CustomLoader />}>
               <CssBaseline />
               <SidebarRoutes />
               <ToastContainer position="bottom-right" />
            </Suspense>
         </ErrorBoundary>
      </div>
   );
}

export default App;
