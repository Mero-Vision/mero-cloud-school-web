import { Add, ExpandCircleDown, Inventory2Outlined } from "@mui/icons-material";
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
import { useGetProductCategoryQuery } from "../../../apis/productCategoriesApi";
import { useGetProductsQuery } from "../../../apis/productsApi";
import { TAX_DATA } from "../../../constants/constants";
import ProductsModal from "../../local/inventory/products/ProductsModal";
import { CustomInput } from "../CustomInputs/CustomInput";
import CustomModal from "../CustomModal/CustomModal";
import CustomCreatableSelect from "../CustomSelects/CustomCreatableSelect";
import { CustomSearchSelect } from "../CustomSelects/CustomSearchSelect";
const fieldData = {
  account_head_id: "",
  quantity: "",
  rate: "",
  tax: "",
  amount: "",
  remarks: "",
};

function AddOrderTable() {
  const [open, setOpen] = useState("");
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const { fields, remove, append } = useFieldArray({
    control,
    name: "orders",
  });

  const { latestAccount } = useSelector((state) => state?.utils);
  const LATEST = useMemo(() => latestAccount, [latestAccount]);

  const {
    data: products,
    isError: isProductsError,
    isLoading: isProductsLoading,
    isSuccess: isProductsSuccess,
  } = useGetProductsQuery();
  const {
    data: product_categories,
    isError: isProductCategoryError,
    isLoading: isProductCategoryLoading,
    isSuccess: isProductCategorySuccess,
  } = useGetProductCategoryQuery();

  const getParent = (id) => {
    const findData = product_categories?.data?.find(
      (item) => Number(item?.id) === Number(id)
    );
    return findData?.title ?? "-";
  };

  console.log({ products, product_categories });
  const PRODUCTS_DATA = useMemo(
    () =>
      products?.data?.map((item) => {
        return {
          title: `${item?.name} (${getParent(item?.product_category_id)})`,
          value: item?.id,
        };
      }),
    [products?.data, product_categories?.data]
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
            startIcon={<Add />}
            onClick={() => append(fieldData)}
          >
            {"Add New"}
          </Button>
        </Box>
      </Box>
      <TableContainer style={{ maxHeight: "300px" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>PRODUCT / SERVICES</TableCell>
              <TableCell width={"100px"} align="center">
                QTY
              </TableCell>
              <TableCell width={"100px"} align="center">
                RATE
              </TableCell>
              <TableCell width={"150px"} align="center">
                TAX
              </TableCell>
              <TableCell width={"150px"} align="center">
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
                getParent={getParent}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}

export default memo(AddOrderTable);

function SingleRow({
  item,
  index,
  control,
  errors,
  PRODUCTS_DATA,
  remove,
  setValue,
  getParent,
  open,
  setOpen,
  LATEST,
}) {
  const uuid = useId();
  const [modal, setModal] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleOpen = (item) => {
    setInputValue(item?.inputValue);
    setModal(true);
  };
  const handleClose = () => setModal(false);

  useEffect(() => {
    const findValue = PRODUCTS_DATA?.find(
      (item) =>
        item?.title ===
        `${LATEST?.name} (${getParent(LATEST?.product_category_id)})`
    );
    console.log({ findValue, LATEST, PRODUCTS_DATA });

    LATEST?.uuid === uuid &&
      setValue(`orders.${index}.account_head_id`, findValue);
  }, [LATEST, PRODUCTS_DATA, uuid]);

  return (
    <>
      <CustomModal
        open={modal}
        handleClose={handleClose}
        modalTitle={`New Product`}
        icon={<Inventory2Outlined />}
        width={"500px"}
      >
        {
          <ProductsModal
            handleClose={handleClose}
            inputValue={inputValue}
            uuid={uuid}
          />
        }
      </CustomModal>
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
            name={`orders.${index}.account_head_id`}
            data={PRODUCTS_DATA}
            handleOpen={handleOpen}
          />
        </TableCell>
        <TableCell>
          {" "}
          <CustomInput
            control={control}
            errors={errors}
            name={`orders.${index}.quantity`}
            placeholder={"0.00"}
            type={"number"}
          />
        </TableCell>
        <TableCell>
          {" "}
          <CustomInput
            control={control}
            errors={errors}
            name={`orders.${index}.rate`}
            placeholder={"0.00"}
            type={"number"}
          />
        </TableCell>
        <TableCell>
          {" "}
          <CustomSearchSelect
            control={control}
            errors={errors}
            name={`orders.${index}.tax`}
            data={TAX_DATA}
          />
        </TableCell>
        <TableCell>
          {" "}
          <CustomInput
            control={control}
            errors={errors}
            name={`orders.${index}.amount`}
            placeholder={"0.00"}
            type={"number"}
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
                      padding: "0 0 10px 0 !important",
                      border: "0",
                    },
                  }}
                >
                  <TableCell>
                    <CustomInput
                      control={control}
                      errors={errors}
                      name={`orders.${index}.remarks`}
                      placeholder={"Remarks"}
                      rows={3}
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
