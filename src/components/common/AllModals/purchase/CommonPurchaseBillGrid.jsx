import { yupResolver } from "@hookform/resolvers/yup";
import { InsertDriveFileOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { useGetSinglePurchaseBillQuery } from "../../../../apis/purchaseBillApi";
import { useGetSinglePurchaseOrderQuery } from "../../../../apis/purchaseOrderApi";
import useQuery from "../../../../hooks/useQuery";
import { changeDateFormat, stringifyData } from "../../../../utils/helpers";
import CustomBackButton from "../../CustomButton/CustomBackButton";
import CustomLoader from "../../CustomLoader/CustomLoader";
import CustomPaper from "../../CustomPaper/CustomPaper";
import { default as CommonPurchaseBill } from "./CommonPurchaseBill";

const CommonPurchaseBillGrid = () => {
  const [searchParams] = useSearchParams();
  const { query: user_id } = useQuery("user_id");
  const { query: name } = useQuery("name");
  const { query: order_id } = useQuery("order_id");
  const id = useMemo(() => searchParams.get("id"), [searchParams.get("id")]);
  const params = { id };

  const validationSchema = yup.object().shape({
    vendor_id: yup
      .object()
      .required("Supplier Name is required")
      .typeError("Supplier Name is required"),
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
      vendor_id: "",
      products: [],
    },
    resolver: yupResolver(validationSchema),
  });
  const { setValue, reset } = methods;
  const {
    data: singleInvoice,
    isError: isInvoiceError,
    isLoading: isInvoiceLoading,
    isSuccess: isInvoiceSuccess,
  } = useGetSinglePurchaseBillQuery(params, { skip: !id });
  const { data: SinglePurchaseOrder } = useGetSinglePurchaseOrderQuery(
    { id: order_id },
    { skip: !order_id }
  );

  const generateInvoiceId = order_id;
  const generateInvoiceData = SinglePurchaseOrder?.data;

  useEffect(() => {
    if (generateInvoiceId || generateInvoiceData) {
      const data = generateInvoiceData;
      setValue("vendor_id", {
        title: data?.vendor_detail?.name,
        value: data?.vendor_detail?.id,
        ...data?.vendor_detail,
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
      setValue("vendor_id", {
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
      setValue("vendor_id", {
        value: SingleInvoice?.vendor_id,
        title: SingleInvoice?.vendor_detail?.name,
        ...SingleInvoice?.vendor_detail,
      });

      setValue(
        "invoice_date",
        changeDateFormat(SingleInvoice?.bill_date, "YYYY-MM-DD")
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
            modalTitle={id ? "Edit Purchase Bill" : "Add New Purchase Bill"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonPurchaseBill id={id} SingleInvoice={SingleInvoice} />{" "}
          </CustomPaper>
        )}
        {!id && (
          <CustomPaper
            modalTitle={id ? "Edit Purchase Bill" : "Add New Purchase Bill"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonPurchaseBill id={id} />{" "}
          </CustomPaper>
        )}
      </FormProvider>
    </Box>
  );
};

export default CommonPurchaseBillGrid;
