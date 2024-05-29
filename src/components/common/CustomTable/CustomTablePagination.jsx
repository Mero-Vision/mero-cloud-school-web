import { Box, TablePagination } from "@mui/material";
import React from "react";

const CustomTablePagination = ({
  setPaginationModel,
  paginationModel,
  data,
}) => {
  const handlePageChange = (e, page) => {
    setPaginationModel({
      ...paginationModel,
      page: page,
    });
  };
  const handleRowsPerPageChange = (e) => {
    setPaginationModel({
      ...paginationModel,
      page: 0,
      pageSize: e.target.value,
    });
  };
  return (
    <Box>
      {" "}
      <TablePagination
        sx={{
          fontSize: "13px",
          "& .MuiInputBase-input": {
            paddingBlock: "2px  !important",
            paddingRight: "24px !important",
          },
        }}
        // rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data?.meta?.total}
        rowsPerPage={paginationModel?.pageSize}
        page={paginationModel?.page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Box>
  );
};

export default CustomTablePagination;
