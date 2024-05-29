import { Grid } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";

import {
  useGetSuppliersQuery,
  usePostSupplierMutation,
} from "../../../apis/suppliersApi";
import { CREDIT_TERMS_DATA } from "../../../constants/constants";
import CustomButton from "../CustomButton/CustomButton";
import { CustomInput } from "../CustomInputs/CustomInput";
import { CustomSearchSelect } from "../CustomSelects/CustomSearchSelect";
import AddOrderTable from "./AddOrderTable";
import TotalBox from "./TotalBox";
const fieldData = {
  account_head_id: "",
  quantity: "",
  rate: "",
  tax: "",
  amount: "",
  remarks: "",
};

const OrderModal = ({ type, handleClose }) => {
  const [
    postSupplier,
    {
      error,
      isError: isPostError,
      isLoading: isPostLoading,
      isSuccess: isPostSuccess,
      data: successData,
    },
  ] = usePostSupplierMutation();
  const {
    data: suppliers,
    isError: isSuppliersError,
    isLoading: isSuppliersLoading,
    isSuccess: isSuppliersSuccess,
  } = useGetSuppliersQuery();

  const SUPPLIERS_DATA = useMemo(
    () =>
      suppliers?.data?.map((item) => {
        return {
          label: `${item?.name}`,
          value: item?.id,
        };
      }),
    [suppliers?.data]
  );

  const methods = useForm({
    defaultValues: {
      orders: [fieldData],
    },
  });
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = methods;

  const onSubmit = (data) => {
    const finalData = {
      ...data,
    };
    postSupplier(finalData);
  };

  useEffect(() => {
    if (isPostSuccess) {
      handleClose && handleClose();
    }
  }, [isPostSuccess, handleClose]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="date"
              title={"Date"}
              type={"date"}
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
              name="order_number"
              title={"Order Number"}
              placeholder={"YH32657"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSearchSelect
              control={control}
              errors={errors}
              name="suppliers_name"
              title={"Suppliers Name"}
              data={SUPPLIERS_DATA}
              placeholder={"ABC Enterprises"}
            />
          </Grid>
          <Grid item xs={6}>
            <CustomSearchSelect
              control={control}
              errors={errors}
              name="credit_terms"
              title={"Credit Terms"}
              data={CREDIT_TERMS_DATA}
            />
          </Grid>
          <Grid item xs={12}>
            <AddOrderTable />
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
        <CustomButton loading={isPostLoading} error={error} />
      </form>
    </FormProvider>
  );
};

export default OrderModal;
