import { Box, TablePagination } from "@mui/material";
import React, { useState } from "react";

const useTablePagination = (data) => {
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
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

  const Pagination = () => {
    return (
      <Box>
        {" "}
        <TablePagination
          sx={{
            fontSize: "13px",
            "& input": {
              padding: "0 !important",
            },
          }}
          rowsPerPageOptions={[5, 10, 25]}
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
  return { Pagination, paginationModel };
};

export default useTablePagination;
