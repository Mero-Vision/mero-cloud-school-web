import {
   Box,
   Divider,
   Grid,
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableRow,
   Typography,
} from "@mui/material";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import Logo from "../../../../../assets/logo.png";
import { TAX_DATA } from "../../../../../constants/constants";
import {
   changeDateFormat,
   findInArray,
   returnNumberWithCommas,
} from "../../../../../utils/helpers";
import styles from "./styles";

const Template1 = ({ row, singleData }) => {
   const classes = styles();
   return (
      <Box className={classes.printDiv}>
         <Header row={row} />
         <Divider />
         <Details row={row} />
         <DetailsTable row={row} />
         <Total row={row} />
         <Footer row={row} />
      </Box>
   );
};

export default Template1;

const Header = ({ row }) => {
   const { company } = useSelector((state) => state?.utils);
   const singleData = useMemo(() => company, [company]);
   return (
      <Box className="header">
         <Box>
            {" "}
            <img src={Logo} />
         </Box>
         <Box>
            <Typography className="bold">
               {singleData?.name}
            </Typography>
            <Typography>{singleData?.address}</Typography>
            <Typography>{singleData?.primary_phone}</Typography>
         </Box>
      </Box>
   );
};

const Details = ({ row }) => {
   return (
      <Box className="details">
         <Box>
            <Typography className="bold" style={{ color: "#4559BD" }}>
               Billed To
            </Typography>
            <Typography>{row?.name ?? "-"}</Typography>
         </Box>
         <Box>
            {" "}
            <Typography className="bold">Invoice</Typography>
            <Typography
               className="bold"
               style={{ color: "#4559BD", fontSize: "13px" }}
            >
               {row?.invoice_number ?? "-"}
            </Typography>
         </Box>
         <Box>
            {" "}
            <Typography className="bold">Reference</Typography>
            <Typography>{row?.reference_number ?? "-"}</Typography>
         </Box>
         <Box textAlign={"right"}>
            {" "}
            <Typography>
               Date Issued : {changeDateFormat(row?.invoice_date)}
            </Typography>
            <Typography>
               Due Date : {changeDateFormat(row?.due_date)}
            </Typography>
         </Box>
      </Box>
   );
};

const DetailsTable = ({ row }) => {
   const classes = styles();
   return (
      <Box className="detailsTable">
         <Table>
            <TableHead>
               <TableRow>
                  <TableCell>DESCRIPTION</TableCell>
                  <TableCell width={"100px"} align="center">
                     QTY
                  </TableCell>
                  <TableCell width={"100px"} align="center">
                     RATE
                  </TableCell>
                  <TableCell width={"100px"} align="center">
                     Discount
                  </TableCell>
                  <TableCell width={"100px"} align="center">
                     TAX
                  </TableCell>
                  <TableCell width={"100px"} align="right">
                     AMOUNT
                  </TableCell>
               </TableRow>
            </TableHead>
            <TableBody>
               {row?.products?.map((item, index) => (
                  <TableRow key={item?.id}>
                     <TableCell>{item?.name ?? "-"}</TableCell>
                     <TableCell align="center">
                        {item?.quantity ?? "-"}
                     </TableCell>
                     <TableCell align="center">
                        {item?.rate ?? "-"}
                     </TableCell>
                     <TableCell align="center">
                        {item?.discount ?? "-"}
                     </TableCell>
                     <TableCell align="center">
                        {findInArray(TAX_DATA, "value", item?.tax)
                           ?.label ?? "-"}
                     </TableCell>
                     <TableCell align="right">
                        {item?.amount ?? "-"}
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </Box>
   );
};

const Total = ({ row }) => {
   const totalArray = [
      { title: "Sub Total", value: "subTotal" },
      { title: "Discount", value: "totalDiscount" },
      { title: "Non-Taxable Total", value: "totalNonTaxableAccount" },
      { title: "Taxable Total", value: "totalTaxableAccount" },
      { title: "VAT", value: "totalTaxAmount" },
   ];
   const classes = styles();

   return (
      <Grid container spacing={2}>
         <Grid item xs={7}></Grid>
         <Grid item xs={5}>
            {" "}
            <Box className={classes.totalBoxContainer}>
               <Box className={classes.totalItems}>
                  <Box className={classes.totalItems}>
                     {" "}
                     {totalArray?.map((item) => {
                        return (
                           <Box
                              key={item?.title}
                              className={classes.singleItem}
                           >
                              <Typography>{item?.title}</Typography>

                              <Typography>
                                 {" "}
                                 Rs{" "}
                                 {returnNumberWithCommas(
                                    row?.extra?.[item?.value] ?? "-"
                                 )}
                              </Typography>
                           </Box>
                        );
                     })}
                  </Box>
                  <Divider />
                  <Box
                     className={[
                        classes.singleItem,
                        classes.grandTotal,
                     ]}
                  >
                     <Typography>{"Grand Total"}</Typography>
                     <Typography>
                        Rs{" "}
                        {returnNumberWithCommas(
                           row?.extra?.grandTotal
                        )}
                     </Typography>
                  </Box>
               </Box>
            </Box>
         </Grid>
      </Grid>
   );
};

const Footer = ({ row }) => {
   return (
      <Box mt={5}>
         <Grid container spacing={4}>
            <Grid item xs={6}>
               <Typography className="bold">Notes</Typography>
               <Typography>{row?.note ?? "-"}</Typography>
            </Grid>
            <Grid item xs={6}>
               <Box className="bankDetails">
                  <Typography>Bank : Kumari Bank Limited</Typography>
                  <Typography>Account Holder : Mero Tech</Typography>
                  <Typography>
                     Account Number : 02138912380122
                  </Typography>
                  <Typography>
                     Address : Baluwatar, Kathmandu
                  </Typography>
               </Box>
            </Grid>
         </Grid>
      </Box>
   );
};
