import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";

const ExcelDownloadButton = ({ data, fileName, followers }) => {
   const downloadExcel = () => {
      const extractedData = data?.sales_by_type?.map((item) => ({
         Type: item.sale_type,
         Total: item?.total ?? "-",
         Orders: item?.order ?? "-",
      }));

      const extractedDatafollowers =
         data?.sales_by_payment_methods.map((item) => ({
            Payment: item?.payment_option_name ?? "-",
            Amount: item?.total ?? "-",
         }));
      const merggedArray = [
         { folowers: extractedData },
         { PPPP: extractedDatafollowers },
      ];
      const ws = XLSX.utils.json_to_sheet(merggedArray);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
      XLSX.writeFile(wb, `${fileName}.xlsx`);

      // --------------------------------------------------------

      // const wb = XLSX.utils.book_new();

      // // Create worksheet for extractedData
      // const ws1 = XLSX.utils.json_to_sheet(extractedData);
      // XLSX.utils.book_append_sheet(wb, ws1, "Sales by Type");

      // // Create worksheet for extractedDatafollowers
      // const ws2 = XLSX.utils.json_to_sheet(extractedDatafollowers);
      // XLSX.utils.book_append_sheet(wb, ws2, "Sales by Payment Methods");

      // // Save the workbook to a file
      // XLSX.writeFile(wb, `${fileName}.xlsx`);
   };

   return (
      <Button
         startIcon={<ArticleOutlinedIcon />}
         variant="contained"
         onClick={downloadExcel}
         sx={{
            color: "#fff",
            backgroundColor: "#37b057",
            "&:hover": {
               backgroundColor: "#37b057",
            },
         }}
      >
         {" "}
         Download excel sheet{" "}
      </Button>
   );
};

export default ExcelDownloadButton;
