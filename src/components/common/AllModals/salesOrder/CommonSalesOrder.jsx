import { Grid } from "@mui/material";
import React, { useEffect, useId, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { Person } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetCustomersQuery } from "../../../../apis/customersApi";
import { useChangeDocumentStatusMutation } from "../../../../apis/documentApi";
import {
  usePostSalesOrderMutation,
  useUpdateSalesOrderMutation,
} from "../../../../apis/salesOrderApi";
import useQuery from "../../../../hooks/useQuery";
import { changeDateFormat, replaceFunction } from "../../../../utils/helpers";
import CustomersModal from "../../../local/sales/customers/CustomersModal";
import CustomButton from "../../CustomButton/CustomButton";
import { CustomInput } from "../../CustomInputs/CustomInput";
import CustomModal from "../../CustomModal/CustomModal";
import CustomCreatableSelect from "../../CustomSelects/CustomCreatableSelect";
import CommonSalesAddTable from "../SalesPurchaseTable/CommonSalesAddTable";
import TotalBox from "../TotalBox";

const CommonSalesOrder = ({ id, SingleInvoice }) => {
  const uuid = useId();
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { latestAccount } = useSelector((state) => state?.utils);
  const LATEST = useMemo(() => latestAccount, [latestAccount]);
  const navigate = useNavigate();

  const [
    postInvoice,
    {
      error,
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
      data: responseData,
    },
  ] = usePostSalesOrderMutation();

  const [
    editInvoice,
    {
      error: editError,
      isError: isEditError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      data: successData,
    },
  ] = useUpdateSalesOrderMutation();

  const { data: customers } = useGetCustomersQuery();
  const handleNavigate = (res) => {
    navigate(
      `/sales/sales-order/${replaceFunction(res?.customer_detail?.name)}?id=${
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
        `/sales/sales-order/${replaceFunction(
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

  const handleOpen = (item) => {
    setInputValue(item?.inputValue);
    setModal(true);
  };
  const handleClose = () => setModal(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useFormContext();

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      customer_id: data?.customer_id?.value,
      products: data?.products?.map((item) => {
        return { ...item, product_id: item?.product_id?.value };
      }),
      id,
      delivery_date: changeDateFormat(data?.delivery_date, "YYYY-MM-DD"),
      order_date: changeDateFormat(data?.order_date, "YYYY-MM-DD"),
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
    setValue("delivery_date", "");
  }, [watch("order_date")]);

  console.log({ SingleInvoice });

  useEffect(() => {
    const timeout = setTimeout(() => {
      SingleInvoice?.delivery_date &&
        setValue(
          "delivery_date",
          changeDateFormat(SingleInvoice?.delivery_date, "YYYY-MM-DD")
        );
    }, [500]);

    return () => clearTimeout(timeout);
  }, [SingleInvoice?.delivery_date]);

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
            <CustomInput
              control={control}
              errors={errors}
              name="order_date"
              title={"Order Date"}
              type={"date"}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="delivery_date"
              title={"Delivery Date"}
              type={"date"}
              min={changeDateFormat(watch("order_date"), "YYYY-MM-DD")}
              disabled={!watch("order_date")}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="order_number"
              title={"Order Number"}
              disabled
              placeholder="DRAFT"
            />
          </Grid>
          <Grid item xs={6}>
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
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="reference"
              title={"Reference"}
              placeholder={"Reference"}
            />
          </Grid>

          <Grid item xs={12}>
            <CommonSalesAddTable />
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

export default CommonSalesOrder;
