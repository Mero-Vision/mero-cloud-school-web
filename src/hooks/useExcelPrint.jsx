import { FileDownloadOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import React, { useRef } from "react";
import { DownloadTableExcel } from "react-export-table-to-excel";

const useExcelPrint = () => {
  const ref = useRef(null);
  const PrintButton = () => {
    return (
      <DownloadTableExcel
        filename="users table"
        sheet="users"
        currentTableRef={ref?.current}
      >
        <Button variant="outlinedButton" startIcon={<FileDownloadOutlined />}>
          Export Full Report
        </Button>
      </DownloadTableExcel>
    );
  };

  return { button: <PrintButton />, ref };
};

export default useExcelPrint;
