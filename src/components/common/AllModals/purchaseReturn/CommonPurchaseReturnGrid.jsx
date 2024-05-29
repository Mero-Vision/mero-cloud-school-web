import { yupResolver } from "@hookform/resolvers/yup";
import { InsertDriveFileOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import * as yup from "yup";
import { useGetSinglePurchaseReturnQuery } from "../../../../apis/purchaseReturnApi";
import useQuery from "../../../../hooks/useQuery";
import { changeDateFormat } from "../../../../utils/helpers";
import CustomBackButton from "../../CustomButton/CustomBackButton";
import CustomLoader from "../../CustomLoader/CustomLoader";
import CustomPaper from "../../CustomPaper/CustomPaper";
import CommonPurchaseReturn from "./CommonPurchaseReturn";

const CommonPurchaseReturnGrid = () => {
  const [searchParams] = useSearchParams();
  const { query: user_id } = useQuery("user_id");
  const { query: name } = useQuery("name");
  const id = useMemo(() => searchParams.get("id"), [searchParams.get("id")]);
  const params = { id };

  const validationSchema = yup.object().shape({
    vendor_id: yup
      .object()
      .required("Supplier Name is required")
      .typeError("Supplier Name is required"),
    purchase_return_date: yup
      .date()
      .required("Purchase Return Date is required"),
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
  } = useGetSinglePurchaseReturnQuery(params, { skip: !id });

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
        "purchase_return_date",
        changeDateFormat(SingleInvoice?.purchase_return_date, "YYYY-MM-DD")
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
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (SingleInvoice) {
        setValue("bill_id", SingleInvoice?.bill?.id);
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
            modalTitle={id ? "Edit Purchase Return" : "Add New Purchase Return"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonPurchaseReturn id={id} SingleInvoice={SingleInvoice} />{" "}
          </CustomPaper>
        )}
        {!id && (
          <CustomPaper
            modalTitle={id ? "Edit Purchase Return" : "Add New Purchase Return"}
            icon={<InsertDriveFileOutlined />}
          >
            <CommonPurchaseReturn id={id} />{" "}
          </CustomPaper>
        )}
      </FormProvider>
    </Box>
  );
};

export default CommonPurchaseReturnGrid;
