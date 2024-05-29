import { Grid } from "@mui/material";
import React, { useEffect, useId, useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";

import { ShoppingCart } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetAccountHeadQuery } from "../../../../apis/chartsOfAccountApi";
import { useChangeDocumentStatusMutation } from "../../../../apis/documentApi";
import { useGetPurchaseBillQuery } from "../../../../apis/purchaseBillApi";
import {
  usePostPurchaseReturnMutation,
  useUpdatePurchaseReturnMutation,
} from "../../../../apis/purchaseReturnApi";
import { useGetSuppliersQuery } from "../../../../apis/suppliersApi";
import useQuery from "../../../../hooks/useQuery";
import {
  changeDateFormat,
  findInArray,
  replaceFunction,
  returnNumberWithCommas,
} from "../../../../utils/helpers";
import SuppliersModal from "../../../local/purchase/suppliers/SuppliersModal";
import CustomButton from "../../CustomButton/CustomButton";
import { CustomInput } from "../../CustomInputs/CustomInput";
import CustomModal from "../../CustomModal/CustomModal";
import CustomCreatableSelect from "../../CustomSelects/CustomCreatableSelect";
import { CustomSearchSelect } from "../../CustomSelects/CustomSearchSelect";
import PurchaseReturnTable from "../SalesPurchaseTable/PurchaseReturnTable";
import TotalBox from "../TotalBox";

const CommonPurchaseReturn = ({ id, SingleInvoice }) => {
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
  } = useGetPurchaseBillQuery(
    {
      vendor_id: watch()?.vendor_id?.id,
      "multiple_status[0]": "paid",
      "multiple_status[1]": "unpaid",
      "multiple_status[2]": "partial",
    },
    { skip: !watch()?.vendor_id }
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
  ] = usePostPurchaseReturnMutation();

  const [
    editInvoice,
    {
      error: editError,
      isError: isEditError,
      isLoading: isEditLoading,
      isSuccess: isEditSuccess,
      data: successData,
    },
  ] = useUpdatePurchaseReturnMutation();

  const { data: suppliers } = useGetSuppliersQuery();
  const handleNavigate = (res) => {
    navigate(
      `/purchase/purchase-return/${replaceFunction(
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
        `/purchase/purchase-return/${replaceFunction(
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

  const onSubmit = (data) => {
    const finalData = {
      ...data,
      vendor_id: data?.vendor_id?.value,
      products: data?.products?.map((item) => {
        return { ...item, product_id: item?.product_id?.value };
      }),
      id,
      purchase_return_date: changeDateFormat(
        data?.purchase_return_date,
        "YYYY-MM-DD"
      ),
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
    setValue("bill_id", "");
  }, [watch("vendor_id")]);

  useEffect(() => {
    !watch("bill_id") && setValue("products", []);
  }, [watch("bill_id")]);
  const INVOICE_DATA = useMemo(
    () =>
      watch()?.vendor_id
        ? invoice?.data?.map((item) => {
            return {
              value: item?.id,
              label: `${item?.bill_number} - Rs. ${returnNumberWithCommas(
                item?.amount
              )} (${changeDateFormat(item?.bill_date)}) `,
              products: item?.products,
            };
          })
        : [],
    [invoice?.data, watch()?.vendor_id]
  );

  const selectedInvoice = findInArray(INVOICE_DATA, "value", watch("bill_id"));
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
  }, [watch("bill_id"), INVOICE_DATA]);

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
          <Grid item xs={4}>
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
          <Grid item xs={4}>
            <CustomSearchSelect
              control={control}
              errors={errors}
              name="bill_id"
              title={"Bill"}
              data={INVOICE_DATA}
              key={INVOICE_DATA}
              placeholder={"PRV732"}
            />
          </Grid>
          <Grid item xs={4}>
            <CustomSearchSelect
              control={control}
              errors={errors}
              name="receiver_id"
              title={"Received Account"}
              data={ACCOUNTS_DATA}
              placeholder={"0001"}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="purchase_return_date"
              title={"Return Date"}
              type={"date"}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <CustomInput
              control={control}
              errors={errors}
              name="reference_number"
              title={"Reference"}
              placeholder="7832hdu"
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
            <PurchaseReturnTable
              handleReset={handleReset}
              selectedInvoice={selectedInvoice}
            />{" "}
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

export default CommonPurchaseReturn;
