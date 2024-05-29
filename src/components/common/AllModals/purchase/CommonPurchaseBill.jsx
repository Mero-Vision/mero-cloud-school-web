import { Grid } from "@mui/material";
import React, { useEffect, useId, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useChangeDocumentStatusMutation } from "../../../../apis/documentApi";
import {
  usePostPurchaseBillMutation,
  useUpdatePurchaseBillMutation,
} from "../../../../apis/purchaseBillApi";
import { useGetSuppliersQuery } from "../../../../apis/suppliersApi";
import useQuery from "../../../../hooks/useQuery";
import { changeDateFormat, replaceFunction } from "../../../../utils/helpers";
import SuppliersModal from "../../../local/purchase/suppliers/SuppliersModal";
import CustomButton from "../../CustomButton/CustomButton";
import { CustomInput } from "../../CustomInputs/CustomInput";
import CustomModal from "../../CustomModal/CustomModal";
import CustomCreatableSelect from "../../CustomSelects/CustomCreatableSelect";
import CommonPurchaseAddTable from "../SalesPurchaseTable/CommonPurchaseAddTable";
import TotalBox from "../TotalBox";

const CommonPurchaseBill = ({ id, SingleInvoice }) => {
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
  ] = usePostPurchaseBillMutation();

  const [
    editInvoice,
    {
      error: editError,
      isError: isEditError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      data: successData,
    },
  ] = useUpdatePurchaseBillMutation();

  const { data: suppliers } = useGetSuppliersQuery();
  const handleNavigate = (res) => {
    navigate(
      `/purchase/purchase-bills/${replaceFunction(
        res?.vendor_detail?.name
      )}?id=${res?.id}`
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
        `/purchase/purchase-bills/${replaceFunction(
          SingleInvoice?.vendor_detail?.name
        )}?id=${SingleInvoice?.id}`
      );
  }, [isEditSuccess, SingleInvoice]);

  const SUPPLIERS_DATA = useMemo(
    () =>
      suppliers?.data?.map((item) => {
        return {
          title: `${item?.name}`,
          value: item?.id,
          ...item,
        };
      }),
    [suppliers?.data]
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
      vendor_id: data?.vendor_id?.value,
      products: data?.products?.map((item) => {
        return { ...item, product_id: item?.product_id?.value };
      }),
      id,
      bill_date: changeDateFormat(data?.invoice_date, "YYYY-MM-DD"),
      due_date: changeDateFormat(data?.due_date, "YYYY-MM-DD"),
    };
    id ? editInvoice(finalData) : postInvoice(finalData);
  };
  useEffect(() => {
    const findValue = SUPPLIERS_DATA?.find(
      (item) => item?.title === `${LATEST?.name}`
    );

    LATEST?.uuid === uuid && setValue(`vendor_id`, findValue);
  }, [LATEST, SUPPLIERS_DATA, uuid]);

  useEffect(() => {
    setValue("due_date", "");
  }, [watch("invoice_date")]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      SingleInvoice?.due_date &&
        setValue(
          "due_date",
          changeDateFormat(SingleInvoice?.due_date, "YYYY-MM-DD")
        );
    }, [500]);

    return () => clearTimeout(timeout);
  }, [SingleInvoice?.due_date]);

  return (
    <>
      <CustomModal
        open={modal}
        handleClose={handleClose}
        modalTitle={`New Supplier`}
        icon={<ShoppingCart />}
        width={"500px"}
      >
        {
          <SuppliersModal
            handleClose={handleClose}
            inputValue={inputValue}
            uuid={uuid}
          />
        }
      </CustomModal>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <CustomCreatableSelect
              control={control}
              errors={errors}
              name="vendor_id"
              title={"Suppliers Name"}
              data={SUPPLIERS_DATA}
              placeholder={"ABC Enterprises"}
              handleOpen={handleOpen}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <CustomInput
              control={control}
              errors={errors}
              name="reference_number"
              title={"Reference"}
              placeholder={"Reference"}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="invoice_date"
              title={"Bill Date"}
              type={"date"}
              required
            />
          </Grid>
          <Grid item xs={4}>
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
          </Grid>
          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="bill_number"
              title={"Bill Number"}
              disabled
              placeholder="DRAFT"
            />
          </Grid>
          <Grid item xs={12}>
            <CommonPurchaseAddTable />
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

export default CommonPurchaseBill;
