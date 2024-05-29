import { Box } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useGetAccountHeadLedgerQuery } from "../../../apis/chartsOfAccountApi";
import {
  changeDateFormat,
  returnNumberWithCommas,
} from "../../../utils/helpers";
import CustomDataGrid from "../CustomDataGrid/CustomDataGrid";
import CustomLoader from "../CustomLoader/CustomLoader";

const TransactionTable = ({ id, labelData }) => {
  const columns = [
    {
      flex: 1,
      field: "entry_date",
      headerName: "Date",
      valueGetter: (props) =>
        props?.row?.entry_date ? changeDateFormat(props?.row?.entry_date) : "",
    },
    {
      flex: 1,
      field: "particulars",
      headerName: "Particulars",
      valueGetter: (props) => {
        return props?.row?.type === "opening-balance"
          ? "Opening Balance"
          : props?.row?.particular_detail?.name || "-";
      },
    },
    {
      flex: 1,
      field: "dr_amount",
      headerName: labelData?.cash_in || "Cash In",
      valueGetter: (props) => returnNumberWithCommas(props?.row?.dr_amount),
    },
    {
      flex: 1,
      field: "cr_amount",
      headerName: labelData?.cash_out || "Cash Out",
      valueGetter: (props) => returnNumberWithCommas(props?.row?.cr_amount),
    },
    {
      flex: 1,
      field: "approved_by",
      headerName: "Approved By",
      valueGetter: (props) => "-",
    },
  ];
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });
  const params = {
    account_head_id: id,
    page: paginationModel?.page + 1,
    limit: paginationModel?.pageSize,
    paginate: 1,
  };
  const { data, isFetching, isSuccess } = useGetAccountHeadLedgerQuery(params, {
    skip: !id,
  });

  const SingleData = useMemo(() => {
    return data?.data;
  }, [data?.data]);

  return (
    <div>
      {isFetching && <CustomLoader />}
      {!isFetching && isSuccess && (
        <Box>
          <CustomDataGrid
            rows={SingleData?.data}
            columns={columns}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            pageInfo={data?.data?.meta}
          />
        </Box>
      )}
    </div>
  );
};

export default TransactionTable;
