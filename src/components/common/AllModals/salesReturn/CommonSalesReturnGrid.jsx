import { yupResolver } from "@hookform/resolvers/yup";
import { InsertDriveFileOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { useGetSingleSalesReturnQuery } from "../../../../apis/salesReturnApi";
import useQuery from "../../../../hooks/useQuery";
import { changeDateFormat } from "../../../../utils/helpers";
import CustomBackButton from "../../CustomButton/CustomBackButton";
import CustomLoader from "../../CustomLoader/CustomLoader";
import CustomPaper from "../../CustomPaper/CustomPaper";
import CommonSalesReturn from "./CommonSalesReturn";

const CommonSalesReturnGrid = () => {
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
    sales_return_date: yup.date().required("Sales Return Date is required"),
    // due_date: yup
    //   .date()
    //   .required("Due Date is required")
    //   .typeError("Due Date is required"),
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
  } = useGetSingleSalesReturnQuery(params, { skip: !id });

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
        "sales_return_date",
        changeDateFormat(SingleInvoice?.sales_return_date, "YYYY-MM-DD")
      );
    }
  }, [SingleInvoice]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (SingleInvoice) {
        setValue("invoice_id", SingleInvoice?.invoice?.id);
      }
    }, [100]);

    return () => clearTimeout(timeout);
  }, [SingleInvoice]);
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (SingleInvoice) {
        setValue("products", SingleInvoice?.products);
        SingleInvoice?.products?.map((item, index) => {
          setValue(`products.${index}.product_id`, {
            title: `${item?.name}`,
            value: item?.id,
          });
        });
      }
    }, [2000]);

    return () => clearTimeout(timeout);
  }, [SingleInvoice]);

  return (
    <Box>
      <CustomBackButton />
      <FormProvider {...methods}>
        {id && isInvoiceLoading && <CustomLoader />}
        {id && isInvoiceSuccess && (
          <CustomPaper
            modalTitle={id ? "Edit Sales Return" : "Add New Sales Return"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonSalesReturn id={id} SingleInvoice={SingleInvoice} />{" "}
          </CustomPaper>
        )}
        {!id && (
          <CustomPaper
            modalTitle={id ? "Edit Sales Return" : "Add New Sales Return"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonSalesReturn id={id} />{" "}
          </CustomPaper>
        )}
      </FormProvider>
    </Box>
  );
};

export default CommonSalesReturnGrid;
