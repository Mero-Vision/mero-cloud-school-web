import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useCallback, useEffect, useState } from "react";
import fallbackImage from "../../../assets/images/fallbackimagepng.png";

export default function CustomDataGrid({
   rows = [],
   columns,
   setPage,
   rowCount = 0,
   isFetching,
   hidePagination,
   apiRef,
   setSearchQuery,
   showQuickFilter,
}) {
   const [paginationModel, setPaginationModel] = useState({
      page: 0,
      pageSize: 10,
   });

   useEffect(() => {
      if (setPage) {
         setPage(() => paginationModel.page + 1);
      }
   }, [paginationModel, setPage]);

   const onFilterChange = useCallback(
      (filterModel) => {
         setSearchQuery(...filterModel.quickFilterValues);
      },
      [setSearchQuery]
   );

   return (
      <Box
         sx={{
            marginBlock: "10px",
            "& .MuiDataGrid-overlayWrapper": {
               minHeight: isFetching ? "" : "450px",
            },
         }}
      >
         <DataGrid
            rows={rows || []}
            columns={columns}
            rowHeight={39}
            columnHeaderHeight={39}
            pageSizeOptions={[10]}
            paginationMode="server"
            paginationModel={paginationModel}
            onPaginationModelChange={setPaginationModel}
            rowCount={rowCount || 0}
            loading={isFetching}
            disableRowSelectionOnClick
            filterMode="server"
            onFilterModelChange={onFilterChange}
            slots={{
               noRowsOverlay: EmptyTable,
               toolbar: GridToolbar,
               // loadingOverlay: LinearProgress,
            }}
            disableColumnMenu
            disableDensitySelector
            disableColumnFilter
            disableColumnSelector
            hideFooterPagination={hidePagination}
            apiRef={apiRef}
            // initialState={{
            //   pagination: {
            //     paginationModel: {
            //       pageSize: 10,
            //       page: 2,
            //     },
            //   },
            // }}
            // checkboxSelection
            slotProps={{
               toolbar: {
                  printOptions: { disableToolbarButton: true },
                  csvOptions: { disableToolbarButton: true },

                  showQuickFilter: showQuickFilter,
                  quickFilterProps: { debounceMs: 500 },
               },
            }}
            sx={{
               [`& .MuiDataGrid-cell:focus-within, & .MuiDataGrid-columnHeaderTitleContainer:focus`]:
                  {
                     outline: "none",
                  },
               fontSize: "13px",
               "& .MuiInputBase-input": {
                  paddingBlock: "2px  !important",
                  paddingRight: "24px !important",
               },
            }}
            // getRowHeight={() => "auto"}
            // disableColumnFilter
         />
      </Box>
   );
}

function EmptyTable() {
   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
            paddingBlock: "15px",
         }}
      >
         <img src={fallbackImage} alt="Empty table" />
         <Box>Looks Empty</Box>
      </Box>
   );
}
