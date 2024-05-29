import {
   Table,
   TableBody,
   TableCell,
   TableContainer,
   TableHead,
   TablePagination,
   TableRow,
   useTheme,
} from "@mui/material";

export default function DisplayTablePayment({
   columns,
   rows = [],
   sx,
   count,
   hidePagination,
   handleRowClick,
   page,
   setPage,
   rowsPerPage,
   setRowsPerPage,
   invoiceData,
   // pageState,
   // paginationLimitState,
}) {
   const theme = useTheme();
   // const [page, setPage] = pageState;
   // const [rowsPerPage, setRowsPerPage] = paginationLimitState;

   const handleChangePage = (event, newPage) => {
      setPage(newPage);
   };

   const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPage(0);
   };

   return (
      <>
         <TableContainer sx={{ mt: "12px", ...sx }}>
            <Table sx={{ minWidth: 550 }} aria-label="table">
               <TableHead>
                  <TableRow
                     sx={{
                        "& .MuiTableCell-root": {
                           // fontSize: "12px",
                           fontSize: "14px",
                           fontWeight: 500,
                           // padding: "6px 7px 7px",
                           padding: "10px 7px",
                           lineHeight: "1.4",
                           background: theme.palette.blue.light,
                           borderBottom: "transparent",
                        },
                     }}
                  >
                     {columns.map((column) => {
                        return (
                           <TableCell
                              key={column.id}
                              sx={
                                 !column?.type
                                    ? {
                                         textAlign: "start",
                                         ...column?.style,
                                      }
                                    : {
                                         textAlign: "end",
                                         ...column?.style,
                                      }
                              }
                           >
                              {column.label}
                           </TableCell>
                        );
                     })}
                  </TableRow>
               </TableHead>
               <TableBody>
                  {rows.map((row) => {
                     return (
                        <TableRow
                           key={row.id}
                           onClick={() => handleRowClick(row)}
                           sx={
                              handleRowClick
                                 ? {
                                      cursor: "pointer",
                                      "& .MuiTableCell-root": {
                                         fontSize: "14px",
                                         padding: "10px 7px",
                                         lineHeight: "1.4",
                                         color: theme.palette
                                            .grey[800],
                                      },
                                   }
                                 : {
                                      "& .MuiTableCell-root": {
                                         fontSize: "14px",
                                         padding: "10px 7px",
                                         lineHeight: "1.4",
                                         color: theme.palette
                                            .grey[800],
                                      },
                                   }
                           }
                        >
                           {columns.map((column) => {
                              return (
                                 <TableCell
                                    key={column.id}
                                    sx={
                                       !column?.type
                                          ? {
                                               textAlign: "start",
                                               ...column?.style,
                                            }
                                          : {
                                               textAlign: "end",
                                               ...column?.style,
                                            }
                                    }
                                 >
                                    {row[column.field]}
                                 </TableCell>
                              );
                           })}
                        </TableRow>
                     );
                  })}
               </TableBody>
               {invoiceData && (
                  <TableHead>
                     <TableRow
                        sx={{
                           "& .MuiTableCell-root": {
                              // fontSize: "12px",
                              fontSize: "14px",
                              fontWeight: 500,
                              // padding: "6px 7px 7px",
                              padding: "10px 7px",
                              lineHeight: "1.4",
                              background:
                                 theme.palette.blue.lightFoot,

                              borderBottom: "transparent",
                           },
                        }}
                     >
                        <TableCell
                           // key={column.id}
                           sx={{
                              textAlign: "center",
                              //  ...column?.style,
                           }}
                        >
                           Total
                        </TableCell>
                        <TableCell
                           // key={column.id}
                           sx={{
                              textAlign: "center",
                              //  ...column?.style,
                           }}
                        ></TableCell>
                        <TableCell
                           // key={column.id}
                           sx={{
                              textAlign: "center",
                              //  ...column?.style,
                           }}
                        ></TableCell>
                        <TableCell
                           // key={column.id}
                           sx={{
                              textAlign: "center",
                              //  ...column?.style,
                           }}
                        >
                           {invoiceData?.total_net_amount}
                        </TableCell>
                     </TableRow>
                  </TableHead>
               )}
            </Table>
         </TableContainer>
         {!hidePagination && (
            <TablePagination
               rowsPerPageOptions={[5, 10, 25]}
               component="div"
               count={count}
               rowsPerPage={rowsPerPage}
               page={page}
               onPageChange={handleChangePage}
               onRowsPerPageChange={handleChangeRowsPerPage}
               sx={{ background: "white" }}
            />
         )}
      </>
   );
}
