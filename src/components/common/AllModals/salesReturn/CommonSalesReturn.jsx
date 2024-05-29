import { Grid } from "@mui/material";
import React, { useEffect, useId, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Person } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAccountHeadQuery } from "../../../../apis/chartsOfAccountApi";
import { useGetCustomersQuery } from "../../../../apis/customersApi";
import { useChangeDocumentStatusMutation } from "../../../../apis/documentApi";
import { useGetInvoiceQuery } from "../../../../apis/invoiceApi";
import {
  usePostSalesReturnMutation,
  useUpdateSalesReturnMutation,
} from "../../../../apis/salesReturnApi";
import useQuery from "../../../../hooks/useQuery";
import {
  changeDateFormat,
  findInArray,
  replaceFunction,
  returnNumberWithCommas,
} from "../../../../utils/helpers";
import CustomersModal from "../../../local/sales/customers/CustomersModal";
import CustomButton from "../../CustomButton/CustomButton";
import { CustomInput } from "../../CustomInputs/CustomInput";
import CustomModal from "../../CustomModal/CustomModal";
import CustomCreatableSelect from "../../CustomSelects/CustomCreatableSelect";
import { CustomSearchSelect } from "../../CustomSelects/CustomSearchSelect";
import SalesReturnTable from "../SalesPurchaseTable/SalesReturnTable";
import TotalBox from "../TotalBox";

const CommonSalesReturn = ({ id, SingleInvoice }) => {
  const uuid = useId();
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { latestAccount } = useSelector((state) => state?.utils);
  const LATEST = useMemo(() => latestAccount, [latestAccount]);
  const navigate = useNavigate();
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useFormContext();
  const params = {
    parent_slug: "cash-and-bank",
  };
  const { data: accountHead } = useGetAccountHeadQuery(params);
  const {
    data: invoice,
    isFetching: isInvoiceFetching,
    isSuccess: isInvoiceSuccess,
  } = useGetInvoiceQuery(
    {
      customer_id: watch()?.customer_id?.id,
      "multiple_status[0]": "paid",
      "multiple_status[1]": "unpaid",
      "multiple_status[2]": "partial",
    },
    { skip: !watch()?.customer_id }
  );

  const ACCOUNTS_DATA = useMemo(
    () =>
      accountHead?.data?.map((item) => {
        return {
          label: `${item?.name}`,
          value: item?.id,
        };
      }),
    [accountHead?.data]
  );

  const [
    postInvoice,
    {
      error,
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
      data: responseData,
    },
  ] = usePostSalesReturnMutation();

  const [
    editInvoice,
    {
      error: editError,
      isError: isEditError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      data: successData,
    },
  ] = useUpdateSalesReturnMutation();

  const { data: customers } = useGetCustomersQuery();
  const handleNavigate = (res) => {
    navigate(
      `/sales/sales-return/${replaceFunction(res?.customer_detail?.name)}?id=${
        res?.id
      }`
    );
  };
  const { query: document_id } = useQuery("document_id");
  const [changeDocumentStatus] = useChangeDocumentStatusMutation();
  useEffect(() => {
    if (isPostSuccess && document_id) {
      changeDocumentStatus({ id: document_id, status: "complete" });
    }
  }, [isPostSuccess]);

  useEffect(() => {
    isPostSuccess && responseData?.data && handleNavigate(responseData?.data);
  }, [isPostSuccess, responseData?.data]);
  useEffect(() => {
    isEditSuccess &&
      navigate(
        `/sales/sales-return/${replaceFunction(
          SingleInvoice?.customer_detail?.name
        )}?id=${SingleInvoice?.id}`
      );
  }, [isEditSuccess, SingleInvoice]);

  const CUSTOMERS_DATA = useMemo(
    () =>
      customers?.data?.map((item) => {
        return {
          title: `${item?.name}`,
          value: item?.id,
          ...item,
        };
      }),
    [customers?.data]
  );
  const INVOICE_DATA = useMemo(
    () =>
      watch()?.customer_id
        ? invoice?.data?.map((item) => {
            return {
              value: item?.id,
              label: `${item?.invoice_number} - Rs. ${returnNumberWithCommas(
                item?.amount
              )} (${changeDateFormat(item?.invoice_date)}) `,
              products: item?.products,
            };
          })
        : [],
    [invoice?.data, watch()?.customer_id]
  );

  const selectedInvoice = findInArray(
    INVOICE_DATA,
    "value",
    watch("invoice_id")
  );
  const handleReset = () => {
    setValue(
      "products",
      selectedInvoice?.products?.map((item) => {
        return {
          ...item,
          product_id: { title: item?.name, value: item?.id },
        };
      })
    );
  };
  useEffect(() => {
    handleReset();
  }, [watch("invoice_id"), INVOICE_DATA]);

  console.log({ INVOICE_DATA });

  const handleOpen = (item) => {
    setInputValue(item?.inputValue);
    setModal(true);
  };
  const handleClose = () => setModal(false);

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      customer_id: data?.customer_id?.value,
      products: data?.products?.map((item) => {
        return { ...item, product_id: item?.product_id?.value };
      }),
      id,
      sales_return_date: changeDateFormat(
        data?.sales_return_date,
        "YYYY-MM-DD"
      ),
    };
    id ? editInvoice(finalData) : postInvoice(finalData);
  };
  useEffect(() => {
    const findValue = CUSTOMERS_DATA?.find(
      (item) => item?.title === `${LATEST?.name}`
    );

    LATEST?.uuid === uuid && setValue(`customer_id`, findValue);
  }, [LATEST, CUSTOMERS_DATA, uuid]);

  useEffect(() => {
    setValue("invoice_id", "");
  }, [watch("customer_id")]);

  useEffect(() => {
    !watch("invoice_id") && setValue("products", []);
  }, [watch("invoice_id")]);

  return (
    <>
      <CustomModal
        open={modal}
        handleClose={handleClose}
        modalTitle={`New Customer`}
        icon={<Person />}
        width={"500px"}
      >
        {
          <CustomersModal
            handleClose={handleClose}
            inputValue={inputValue}
            uuid={uuid}
          />
        }
      </CustomModal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CustomCreatableSelect
              control={control}
              errors={errors}
              name="customer_id"
              title={"Customers Name"}
              data={CUSTOMERS_DATA}
              placeholder={"ABC Enterprises"}
              handleOpen={handleOpen}
              required
            />
          </Grid>

          <Grid item xs={4}>
            <CustomSearchSelect
              control={control}
              errors={errors}
              name="invoice_id"
              title={"Invoice"}
              data={INVOICE_DATA}
              key={INVOICE_DATA}
              placeholder={"INV732"}
            />
          </Grid>

          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="reference"
              title={"Reference"}
              placeholder={"Reference"}
            />
          </Grid>

          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="sales_return_date"
              title={"Sales Return Date"}
              type={"date"}
              required
            />
          </Grid>
          {/* <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="due_date"
              title={"Due Date"}
              type={"date"}
              min={changeDateFormat(watch("invoice_date"), "YYYY-MM-DD")}
              disabled={!watch("invoice_date")}
              required
            />
          </Grid> */}
          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="invoice_number"
              title={"Order Number"}
              disabled
              placeholder="DRAFT"
            />
          </Grid>
          <Grid item xs={4}>
            <CustomSearchSelect
              control={control}
              errors={errors}
              name="receiver_id"
              title={"Paid Account"}
              data={ACCOUNTS_DATA}
              placeholder={"0001"}
              required
            />
          </Grid>

          <Grid item xs={12}>
            <SalesReturnTable
              handleReset={handleReset}
              selectedInvoice={selectedInvoice}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="note"
              placeholder="Leave a note here..."
              rows={11}
            />
          </Grid>
          <Grid item xs={6}>
            <TotalBox />
          </Grid>
        </Grid>
        <CustomButton
          success={isPostSuccess || isEditSuccess}
          loading={isPostLoading || isEditLoading}
          buttonName={id && "Edit"}
          error={error || editError}
          successData={responseData || successData}
        />
      </form>
    </>
  );
};

export default CommonSalesReturn;
