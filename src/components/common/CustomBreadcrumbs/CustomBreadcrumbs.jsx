import { Link, useLocation, useMatch } from "react-router-dom";
function CustomBreadcrumbs({ data }) {
   const location = useLocation();
   const matches = useMatch(":path/*");
   const paths = location.pathname.split("/").filter(Boolean);
   const isClickable = (path) => {
      // Define the paths where you want to disable the onClick event
      const disabledPaths = [
         "accounts",
         "payroll",
         "firm",
         "permissions",
         "sales",
         "purchase",
         "cash-&-bank",
         "inventory",
      ];
      return !disabledPaths.includes(path);
   };
   const generateBreadcrumbs = (segments, currentIndex = 0) => {
      const currentPath = segments[currentIndex];
      const to = `/${segments.slice(0, currentIndex + 1).join("/")}`;
      const isActive =
         matches &&
         matches?.pathname?.split("/")?.slice(-1)?.[0] ===
            currentPath;
      const clickable = isClickable(currentPath);

      return (
         <span key={to} style={{ textTransform: "capitalize" }}>
            {clickable && currentIndex !== segments?.length - 1 ? (
               <Link
                  to={to}
                  style={{
                     textDecoration: "none",
                     color: isActive ? "#000" : "#383751",
                     fontSize: isActive && "13px",
                     fontWeight: isActive && "500",
                  }}
               >
                  {currentPath?.replaceAll("-", " ")}
               </Link>
            ) : (
               <span
                  style={{
                     textDecoration: "none",
                     color: isActive ? "#000" : "#383751",
                     fontSize: isActive && "13px",
                     fontWeight: isActive && "500",
                  }}
               >
                  {currentPath?.replaceAll("-", " ")}
               </span>
            )}
            {currentIndex < segments?.length - 1 && (
               <span>{" > "}</span>
            )}
            {currentIndex < segments?.length - 1 &&
               generateBreadcrumbs(segments, currentIndex + 1)}
         </span>
      );
   };
   return (
      <nav>{paths?.length > 1 && generateBreadcrumbs(paths)}</nav>
   );
}

export default CustomBreadcrumbs;
