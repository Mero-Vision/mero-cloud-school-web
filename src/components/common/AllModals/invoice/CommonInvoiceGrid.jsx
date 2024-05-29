import { yupResolver } from "@hookform/resolvers/yup";
import { InsertDriveFileOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { useGetSingleInvoiceQuery } from "../../../../apis/invoiceApi";
import { useGetSingleQuotationQuery } from "../../../../apis/quotationApi";
import { useGetSingleSalesOrderQuery } from "../../../../apis/salesOrderApi";
import useQuery from "../../../../hooks/useQuery";
import { changeDateFormat, stringifyData } from "../../../../utils/helpers";
import CustomBackButton from "../../CustomButton/CustomBackButton";
import CustomLoader from "../../CustomLoader/CustomLoader";
import CustomPaper from "../../CustomPaper/CustomPaper";
import CommonInvoice from "./CommonInvoice";

const CommonInvoiceGrid = () => {
  const [searchParams] = useSearchParams();
  const { query: user_id } = useQuery("user_id");
  const { query: name } = useQuery("name");
  const { query: order_id } = useQuery("order_id");
  const { query: quotation_id } = useQuery("quotation_id");

  const id = useMemo(() => searchParams.get("id"), [searchParams.get("id")]);
  const params = { id };

  const validationSchema = yup.object().shape({
    customer_id: yup.object().required("Customer Name is required"),
    invoice_date: yup.date().required("Invoice Date is required"),
    due_date: yup
      .date()
      .required("Due Date is required")
      .typeError("Due Date is required"),
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
    isLoading: isInvoiceLoading,
    isSuccess: isInvoiceSuccess,
  } = useGetSingleInvoiceQuery(params, { skip: !id });
  const { data: SingleSalesOrder } = useGetSingleSalesOrderQuery(
    { id: order_id },
    { skip: !order_id }
  );
  const { data: SingleQuotation } = useGetSingleQuotationQuery(
    { id: quotation_id },
    { skip: !quotation_id }
  );

  const generateInvoiceId = order_id || quotation_id;
  const generateInvoiceData = SingleSalesOrder?.data || SingleQuotation?.data;

  useEffect(() => {
    if (generateInvoiceId || generateInvoiceData) {
      const data = generateInvoiceData;
      setValue("customer_id", {
        title: data?.customer_detail?.name,
        value: data?.customer_detail?.id,
        ...data?.customer_detail,
      });
      setValue("products", data?.products || []);
      data?.products?.map((item, index) => {
        setValue(`products.${index}.product_id`, {
          title: `${item?.name}`,
          value: item?.id,
        });
      });
      setValue("note", data?.note || "");
    }
  }, stringifyData([generateInvoiceId, generateInvoiceData]));

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
        "invoice_date",
        changeDateFormat(SingleInvoice?.invoice_date, "YYYY-MM-DD")
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
            modalTitle={id ? "Edit Invoice" : "Add New Invoice"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonInvoice id={id} SingleInvoice={SingleInvoice} />{" "}
          </CustomPaper>
        )}
        {!id && (
          <CustomPaper
            modalTitle={id ? "Edit Invoice" : "Add New Invoice"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonInvoice id={id} />{" "}
          </CustomPaper>
        )}
      </FormProvider>
    </Box>
  );
};

export default CommonInvoiceGrid;
