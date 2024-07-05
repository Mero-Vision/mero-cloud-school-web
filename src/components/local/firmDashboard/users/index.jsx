import { Add, Delete, Edit, Person } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetFirmUserQuery } from "../../../../apis/accountingFirmApi";
import { useDeleteCompanyMutation } from "../../../../apis/companyApi";
import useModal from "../../../../hooks/useModal";
import useTabs from "../../../../hooks/useTabs";
import { replaceFunction } from "../../../../utils/helpers";
import AllModals from "../../../common/AllModals/AllModals";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomMoreOptionButton from "../../../common/CustomMoreOptionButton/CustomMoreOptionButton";

const data = [
  {
    label: "Users",
    value: "Users",
    icon: <Person />,
  },
];

const items = [
  {
    icon: <Edit fontSize="small" />,
    text: "Edit",
    modalType: "edit_company",
  },
  {
    icon: <Delete fontSize="small" />,
    text: "Delete",
    modalType: "delete_company",
  },
];

const RenderName = ({ props }) => {
  const navigate = useNavigate();
  const url = `users?id=${props?.row?.id}&name=${props?.row?.short_name}`;
  return (
    <Box
      style={{ fontWeight: "600", cursor: "pointer" }}
      onClick={() => navigate(url)}
    >
      {props?.row?.short_name || props?.row?.name}
    </Box>
  );
};

const ManagePermissions = ({ props }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="purple"
      onClick={() =>
        navigate(
          `permissions/${replaceFunction(props?.row?.name)}?id=${
            props?.row?.id
          }`
        )
      }
    >
      Manage Permissions
    </Button>
  );
};
const FirmUsers = () => {
  const { search_keyword = "" } = useSelector((state) => state?.utils);
  const { user } = useSelector((state) => state?.auth);
  const FIRM = useMemo(() => user?.accounting_firms?.[0], [user]);
  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  console.log({ user });

  const { value, Tabs } = useTabs({
    data,
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add_users")}
      >
        Add New
      </Button>
    ),
  });
  const params = {
    page: paginationModel?.page + 1,
    limit: paginationModel?.pageSize,
    paginate: 1,
    search_keyword,
    id: FIRM?.id,
  };
  const {
    data: firmUsers,
    isFetching,
    isSuccess,
  } = useGetFirmUserQuery(params, { skip: !FIRM?.id });
  const [deleteCompany, { isSuccess: isDeleteSuccess, isLoading }] =
    useDeleteCompanyMutation();

  const { handleClose, handleOpen, modals, row } = useModal();

  const handleDelete = (row) => {
    deleteCompany(row?.id);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      handleClose("delete_company");
    }
  }, [isDeleteSuccess]);

  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: (props) => <RenderName props={props} />,
    },

    {
      flex: 1.5,
      field: "email",
      headerName: "Email",
      renderCell: (props) => (
        <Box style={{ fontWeight: "600" }}>
          <Box>{props?.row?.email}</Box>
        </Box>
      ),
    },
    {
      flex: 1,
      field: "permission",
      headerName: "",
      renderCell: (props) => <ManagePermissions props={props} />,
    },

    {
      flex: 0.5,
      field: "action",
      headerName: "Actions",
      renderCell: (params) => (
        <>
          <CustomMoreOptionButton
            items={items}
            handleOpenModal={handleOpen}
            row={params?.row}
          />
        </>
      ),
    },
  ];
  return (
    <>
      {Tabs}
      {isFetching && <CustomLoader />}

      {!isFetching && isSuccess && (
        <CustomDataGrid
          rows={firmUsers?.data || []}
          columns={columns}
          tabsData={data}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          pageInfo={firmUsers?.meta}
        />
      )}

      <AllModals
        modalType={"add_firm_users"}
        handleClose={() => handleClose("add_users")}
        open={modals?.add_users}
      />
      <AllModals
        modalType={"edit_company"}
        handleClose={() => handleClose("edit_company")}
        open={modals?.edit_company}
        row={row}
      />
      <AllModals
        modalType={"delete_company"}
        handleClose={() => handleClose("delete_company")}
        open={modals?.delete_company}
        row={row}
        handleConfirm={() => handleDelete(row)}
        isLoading={isLoading}
      />
      <AllModals
        modalType={"view_firm_client"}
        handleClose={() => handleClose("view_firm_client")}
        open={modals?.view_firm_client}
        row={row}
      />
    </>
  );
};

export default FirmUsers;
