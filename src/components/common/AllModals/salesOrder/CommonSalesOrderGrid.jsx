import { yupResolver } from "@hookform/resolvers/yup";
import { InsertDriveFileOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { useGetSingleSalesOrderQuery } from "../../../../apis/salesOrderApi";
import useQuery from "../../../../hooks/useQuery";
import { changeDateFormat } from "../../../../utils/helpers";
import CustomBackButton from "../../CustomButton/CustomBackButton";
import CustomLoader from "../../CustomLoader/CustomLoader";
import CustomPaper from "../../CustomPaper/CustomPaper";
import CommonSalesOrder from "./CommonSalesOrder";

const CommonSalesOrderGrid = () => {
  const [searchParams] = useSearchParams();
  const { query: user_id } = useQuery("user_id");
  const { query: name } = useQuery("name");
  const id = useMemo(() => searchParams.get("id"), [searchParams.get("id")]);
  const params = { id };

  const validationSchema = yup.object().shape({
    customer_id: yup
      .object()
      .required("Customer Name is required")
      .typeError("Customer Name is required"),
    order_date: yup.date().required("Order Date is required"),
    delivery_date: yup
      .date()
      .required("Delivery Date is required")
      .typeError("Delivery Date is required"),
    products: yup.array().of(
      yup.object().shape({
        quantity: yup
          .number()
          .required("Quantity is required")
          .typeError("* Required")
          .positive("Quantity must be a positive number"),
        rate: yup
          .number()
          .required("Rate is required")
          .typeError("* Required")
          .positive("Rate must be a positive number"),
      })
    ),
  });

  const methods = useForm({
    defaultValues: {
      customer_id: "",
      products: [],
    },
    resolver: yupResolver(validationSchema),
  });
  const { setValue, reset, watch } = methods;
  const {
    data: singleInvoice,
    isError: isInvoiceError,
    isLoading: isInvoiceLoading,
    isSuccess: isInvoiceSuccess,
  } = useGetSingleSalesOrderQuery(params, { skip: !id });

  const SingleInvoice = useMemo(() => {
    return singleInvoice?.data;
  }, [singleInvoice?.data]);
  useEffect(() => {
    user_id &&
      setValue("customer_id", {
        value: Number(user_id),
        title: name,
        id: Number(user_id),
      });
  }, [user_id]);
  useEffect(() => {
    if (SingleInvoice) {
      reset(SingleInvoice);
    }
  }, [SingleInvoice]);

  useEffect(() => {
    if (SingleInvoice) {
      setValue("customer_id", {
        value: SingleInvoice?.customer_id,
        title: SingleInvoice?.customer_detail?.name,
        ...SingleInvoice?.customer_detail,
      });

      setValue(
        "order_date",
        changeDateFormat(SingleInvoice?.order_date, "YYYY-MM-DD")
      );
    }
  }, [SingleInvoice]);
  useEffect(() => {
    if (SingleInvoice) {
      SingleInvoice?.products?.map((item, index) => {
        setValue(`products.${index}.product_id`, {
          title: `${item?.name}`,
          value: item?.id,
        });
      });
    }
  }, [SingleInvoice]);

  return (
    <Box>
      <CustomBackButton />
      <FormProvider {...methods}>
        {id && isInvoiceLoading && <CustomLoader />}
        {id && isInvoiceSuccess && (
          <CustomPaper
            modalTitle={id ? "Edit Sales Order" : "Add New Sales Order"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonSalesOrder id={id} SingleInvoice={SingleInvoice} />{" "}
          </CustomPaper>
        )}
        {!id && (
          <CustomPaper
            modalTitle={id ? "Edit Sales Order" : "Add New Sales Order"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonSalesOrder id={id} />{" "}
          </CustomPaper>
        )}
      </FormProvider>
    </Box>
  );
};

export default CommonSalesOrderGrid;
