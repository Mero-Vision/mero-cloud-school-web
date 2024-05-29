import { ExpandCircleDown, Restore } from "@mui/icons-material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {
  Box,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";

import { memo, useId } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { useSelector } from "react-redux";
import { useGetAccountHeadQuery } from "../../../../apis/chartsOfAccountApi";
import { useGetProductsQuery } from "../../../../apis/productsApi";
import { useGetWarehouseQuery } from "../../../../apis/warehouseApi";
import { TAX_DATA } from "../../../../constants/constants";
import { filterInArray, flattenArray } from "../../../../utils/helpers";
import CreatableProductsModal from "../../../local/inventory/products/CreatableProductsModal";
import { CustomInput } from "../../CustomInputs/CustomInput";
import CustomCreatableSelect from "../../CustomSelects/CustomCreatableSelect";
import { CustomSearchSelect } from "../../CustomSelects/CustomSearchSelect";
import { CustomSelect } from "../../CustomSelects/CustomSelect";

const fieldData = {
  account_head_id: "",
  quantity: "",
  rate: "",
  tax: "",
  amount: "",
  remarks: "",
  product_id: "",
  discount: "",
};

function PurchaseReturnTable({ handleReset, selectedInvoice }) {
  const [open, setOpen] = useState("");
  const params = {
    parent_slug: "purchase",
    tree_view: 1,
  };
  const { data: accountHead } = useGetAccountHeadQuery(params);

  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "products",
  });
  const status = "active";
  const { data: warehouse } = useGetWarehouseQuery(
    { status },
    { skip: !status }
  );

  const WAREHOUSE_DATA = useMemo(() => {
    const data = warehouse?.data?.map((item) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
    return data;
  }, [warehouse?.data]);

  const { latestAccount } = useSelector((state) => state?.utils);
  const LATEST = useMemo(() => latestAccount, [latestAccount]);

  const { data: products } = useGetProductsQuery();

  const PRODUCTS_DATA = useMemo(
    () =>
      products?.data?.map((item) => {
        return {
          title: `${item?.name}`,
          value: item?.id,
          ...item,
        };
      }),
    [products?.data]
  );

  return (
    <Box mb={2}>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"end"}
        mb={2}
      >
        <Box>
          <Typography fontSize={"small"} fontWeight={600}>
            {fields?.length ?? 0} ENTRY
          </Typography>
        </Box>
        <Box>
          <Button
            variant={"blue"}
            type={"button"}
            startIcon={<Restore />}
            onClick={() => handleReset()}
          >
            Reset
          </Button>
        </Box>
      </Box>
      <TableContainer style={{ maxHeight: "300px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>PRODUCT / SERVICES</TableCell>
              <TableCell width={"80px"} align="center">
                QTY
              </TableCell>
              <TableCell width={"120px"} align="center">
                RATE
              </TableCell>
              {/* <TableCell width={"80px"} align="center">
                Discount
              </TableCell> */}
              <TableCell width={"110px"} align="center">
                TAX
              </TableCell>
              <TableCell width={"120px"} align="center">
                AMOUNT
              </TableCell>
              <TableCell width="50px"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields?.map((item, index) => (
              <SingleRow
                key={item?.id}
                item={item}
                index={index}
                PRODUCTS_DATA={PRODUCTS_DATA}
                control={control}
                errors={errors}
                remove={remove}
                setValue={setValue}
                open={open}
                setOpen={setOpen}
                LATEST={LATEST}
                watch={watch}
                accountHead={accountHead}
                WAREHOUSE_DATA={WAREHOUSE_DATA}
                selectedInvoice={selectedInvoice}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default memo(PurchaseReturnTable);

function SingleRow({
  item,
  index,
  control,
  errors,
  PRODUCTS_DATA,
  remove,
  setValue,
  open,
  setOpen,
  LATEST,
  accountHead,
  watch,
  WAREHOUSE_DATA,
  selectedInvoice,
}) {
  const uuid = useId();
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const max = useMemo(
    () => selectedInvoice?.products?.[index]?.quantity,
    [selectedInvoice]
  );

  const ACCOUNT_HEAD_DATA = useMemo(
    () =>
      flattenArray(
        filterInArray(
          accountHead?.data,
          "slug",
          watch(`products.${index}.product_id.is_service`)
            ? "purchase-services"
            : "purchase-goods"
        )
      )?.map((item) => {
        return {
          label: `${item?.name}`,
          value: item?.id,
        };
      }),
    [accountHead?.data, watch(`products.${index}.product_id`)]
  );

  const handleOpen = (item) => {
    setInputValue(item?.inputValue);
    setModal(true);
  };
  const handleClose = () => setModal(false);

  useEffect(() => {
    const findValue = PRODUCTS_DATA?.find(
      (item) => item?.title === `${LATEST?.name}`
    );

    LATEST?.uuid === uuid &&
      setValue(`products.${index}.product_id`, findValue);
  }, [LATEST, PRODUCTS_DATA, uuid]);

  useEffect(() => {
    if (watch(`products.${index}.product_id`)) {
      const product = watch(`products.${index}.product_id`);
      setValue(
        `products.${index}.rate`,
        product?.purchase_rate || watch(`products.${index}.rate`)
      );
      setValue(
        `products.${index}.account_head_id`,
        product?.purchase_account ||
          watch(`products.${index}.account_head_id`) ||
          ACCOUNT_HEAD_DATA?.[0]?.value
      );
    }
  }, [watch(`products.${index}.product_id`)]);
  useEffect(() => {
    const amount =
      Number(watch(`products.${index}.quantity`) ?? 0) *
        Number(watch(`products.${index}.rate`) ?? 0) -
      Number(watch(`products.${index}.discount`) ?? 0);
    const tax = Number(watch(`products.${index}.tax`));
    const vat_amount = tax > 0 && (tax * amount) / 100;
    const amountWithVat = tax > 0 ? vat_amount + amount : amount;
    setValue(`products.${index}.amount`, amountWithVat);
    setValue(`products.${index}.vat_amount`, vat_amount);
  }, [
    watch(`products.${index}.quantity`),
    watch(`products.${index}.rate`),
    watch(`products.${index}.discount`),
    watch(`products.${index}.tax`),
  ]);
  useEffect(() => {
    const vatless_amount =
      Number(watch(`products.${index}.quantity`) ?? 0) *
        Number(watch(`products.${index}.rate`) ?? 0) -
      Number(watch(`products.${index}.discount`) ?? 0);

    setValue(`products.${index}.vatless_amount`, vatless_amount);
  }, [
    watch(`products.${index}.quantity`),
    watch(`products.${index}.rate`),
    watch(`products.${index}.discount`),
  ]);

  useEffect(() => {
    WAREHOUSE_DATA &&
      setValue(
        `products.${index}.warehouse_id`,
        watch(`products.${index}.warehouse_id`) || WAREHOUSE_DATA?.[0]?.value
      );
  }, [WAREHOUSE_DATA, watch(`products`)]);

  return (
    <>
      <CreatableProductsModal
        handleClose={handleClose}
        inputValue={inputValue}
        uuid={uuid}
        open={modal}
      />
      <TableRow
        style={{ borderBottom: "none" }}
        sx={{
          "& .MuiTableCell-root": {
            border: "0",
          },
        }}
      >
        <TableCell>
          <CustomCreatableSelect
            control={control}
            errors={errors}
            name={`products.${index}.product_id`}
            data={PRODUCTS_DATA}
            handleOpen={handleOpen}
            disabled
          />
        </TableCell>
        <TableCell>
          {" "}
          <CustomInput
            control={control}
            errors={errors}
            name={`products.${index}.quantity`}
            placeholder={"0.00"}
            type={"number"}
            max={max}
          />
        </TableCell>
        <TableCell>
          {" "}
          <CustomInput
            control={control}
            errors={errors}
            name={`products.${index}.rate`}
            placeholder={"0.00"}
            type={"number"}
          />
        </TableCell>
        {/* <TableCell>
          {" "}
          <CustomInput
            control={control}
            errors={errors}
            name={`products.${index}.discount`}
            placeholder={"0.00"}
            type={"number"}
            max={
              Number(watch(`products.${index}.quantity`) ?? 0) *
              Number(watch(`products.${index}.rate`) ?? 0)
            }
          />
        </TableCell> */}
        <TableCell>
          {" "}
          <CustomSelect
            control={control}
            errors={errors}
            name={`products.${index}.tax`}
            data={TAX_DATA}
          />
        </TableCell>
        <TableCell>
          {" "}
          <CustomInput
            control={control}
            errors={errors}
            name={`products.${index}.amount`}
            placeholder={"0.00"}
            type={"number"}
            disabled
          />
        </TableCell>
        <TableCell align="right">
          <Box display={"flex"} justifyContent={"end"} columnGap={".5rem"}>
            <ExpandCircleDown
              onClick={() =>
                setOpen((prev) => (prev === item?.id ? "" : item?.id))
              }
              sx={{
                color: "#9D9CAF",
                cursor: "pointer",
                transition: "transform 0.3s",
                transform:
                  open === item?.id ? "rotate(-180deg)" : "rotate(0deg)",
              }}
            />
            <RemoveCircleIcon
              onClick={() => remove(index)}
              sx={{ color: "#D24848", cursor: "pointer" }}
            />
          </Box>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={6} style={{ paddingBlock: 0 }}>
          <Collapse in={open === item?.id} timeout="auto" unmountOnExit>
            {" "}
            <Table>
              <TableBody>
                <TableRow
                  sx={{
                    "& .MuiTableCell-root": {
                      padding: "0 10px 10px 0 !important",
                      border: "0",
                    },
                  }}
                >
                  <TableCell>
                    <CustomInput
                      control={control}
                      errors={errors}
                      name={`products.${index}.description`}
                      placeholder={"Description"}
                      title="Description"
                    />
                  </TableCell>
                  <TableCell width="150px">
                    <CustomSelect
                      control={control}
                      errors={errors}
                      name={`products.${index}.account_head_id`}
                      data={ACCOUNT_HEAD_DATA}
                      placeholder={"Buildings"}
                      title="Ledger"
                    />
                  </TableCell>
                  <TableCell width="150px">
                    <CustomSearchSelect
                      control={control}
                      errors={errors}
                      name={`products.${index}.warehouse_id`}
                      data={WAREHOUSE_DATA}
                      key={WAREHOUSE_DATA}
                      placeholder={"Brooklyn"}
                      title="Warehouse"
                    />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
