import { Skeleton } from "@mui/material";
import CustomDataGrid from "./CustomDataGrid";

export default function DataGridLoader({ columns, showQuickFilter }) {
   columns = columns.map((item) => {
      return { ...item, renderCell: () => <Skeleton width="70%" /> };
   });
   const rows = [...Array(10)].map((item, index) => ({ id: index }));

   return (
      <>
         {showQuickFilter && (
            <Skeleton
               sx={{
                  ml: "auto",
                  height: "45px",
                  width: "220px",
                  marginBlock: "10px",
               }}
            />
         )}
         <CustomDataGrid columns={columns} rows={rows} />
      </>
   );
}
