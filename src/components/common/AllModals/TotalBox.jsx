import { Box, Divider, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import {
  renderArrayTotal,
  returnNumberWithCommas,
  stringifyData,
} from "../../../utils/helpers";
import styles from "./styles";
const totalArray = [
  { title: "Sub Total", value: "subTotal" },
  { title: "Discount", value: "discountTotal" },
  { title: "Non-Taxable Total", value: "nonTaxableTotal" },
  { title: "Taxable Total", value: "taxableTotal" },
  { title: "VAT", value: "VAT" },
];

const TotalBox = () => {
  const classes = styles();
  const {
    control,
    formState: { errors },
    watch,
  } = useFormContext();

  const TOTAL_ARRAY = useMemo(() => {
    const products = watch()?.products;
    const subTotal = renderArrayTotal(products, "vatless_amount");
    const grandTotal = renderArrayTotal(products, "amount");
    const discountTotal = renderArrayTotal(products, "discount");

    const nonTaxableProducts = products?.filter((item) => item?.tax <= 0);
    const nonTaxableTotal = renderArrayTotal(nonTaxableProducts, "amount");

    const taxableProducts = products?.filter((item) => item?.tax > 0);
    const taxableTotal = renderArrayTotal(taxableProducts, "vatless_amount");

    const VAT = renderArrayTotal(products, "vat_amount");

    return {
      products,
      subTotal,
      discountTotal,
      nonTaxableTotal,
      taxableTotal,
      VAT,
      grandTotal,
    };
  }, stringifyData([watch()?.products]));
  return (
    <Box className={classes.totalBoxContainer}>
      <Box className={classes.totalItems}>
        <Box className={classes.totalItems}>
          {" "}
          {totalArray?.map((item) => {
            return (
              <Box key={item?.title} className={classes.singleItem}>
                <Typography>{item?.title}</Typography>

                <Typography>
                  {returnNumberWithCommas(TOTAL_ARRAY?.[item?.value])}
                </Typography>
              </Box>
            );
          })}
        </Box>
        <Divider />
        <Box className={[classes.singleItem, classes.grandTotal]}>
          <Typography>{"Grand Total"}</Typography>
          <Typography>
            {returnNumberWithCommas(TOTAL_ARRAY?.grandTotal)}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default TotalBox;
