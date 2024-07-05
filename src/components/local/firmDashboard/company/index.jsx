import { Add, Apartment, Delete, Edit } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDeleteCompanyMutation,
  useGetAllCompanyQuery,
} from "../../../../apis/companyApi";
import useModal from "../../../../hooks/useModal";
import useTabs from "../../../../hooks/useTabs";
import AllModals from "../../../common/AllModals/AllModals";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import CustomModal from "../../../common/CustomModal/CustomModal";
import CustomMoreOptionButton from "../../../common/CustomMoreOptionButton/CustomMoreOptionButton";
import AddCompanyAdmin from "./AddCompanyAdmin";

const data = [
  {
    label: "Company",
    value: "Company",
    icon: <Apartment />,
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
  {
    icon: <Add fontSize="small" />,
    text: "Add Admin",
    modalType: "add_admin",
  },
];

function ActionComponent(props) {
  const [openModal, setOpenModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const handleOpenModal = (modalType) => {
    setOpenModal(true);
    setModalType(modalType);
  };
  const handleCloseModal = () => {
    setOpenModal(false);
  };
  return (
    <Box>
      <CustomMoreOptionButton items={items} handleOpenModal={handleOpenModal} />
      <AllModals
        modalType={"journal-voucher"}
        open={openModal && modalType === "edit"}
        handleClose={() => handleCloseModal()}
        row={props?.row}
      />

      <CustomModal
        open={openModal && modalType === "add_admin"}
        handleClose={() => handleCloseModal()}
        modalTitle={`Add Admin`}
        width={"400px"}
      >
        <AddCompanyAdmin
          row={props?.row}
          handleClose={() => handleCloseModal()}
        />{" "}
      </CustomModal>
      <CustomModal
        open={openModal && modalType === "delete"}
        handleClose={() => handleCloseModal()}
        modalTitle={`DELETE`}
      >
        DELETE{" "}
      </CustomModal>
    </Box>
  );
}

const RenderName = ({ props }) => {
  const navigate = useNavigate();
  const url = `users?id=${props?.row?.id}&name=${props?.row?.short_name}`;
  return (
    <Box
      style={{ fontWeight: "600", cursor: "pointer" }}
      // onClick={() => navigate(url)}
    >
      {props?.row?.short_name || props?.row?.name}
    </Box>
  );
};
const Company = () => {
  const navigate = useNavigate();
  const { data: companyData, isFetching, isSuccess } = useGetAllCompanyQuery();
  const [deleteCompany, { isSuccess: isDeleteSuccess, isLoading }] =
    useDeleteCompanyMutation();

  // const [getCompanyUser] = useGetCompanyUserQuery();

  // console.log({ data });

  const { handleClose, handleOpen, modals, row } = useModal();

  const handleDelete = (row) => {
    deleteCompany(row?.id);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      handleClose("delete_company");
    }
  }, [isDeleteSuccess]);

  const { value, Tabs } = useTabs({
    data,
    button: (
      <Button
        variant="contained"
        startIcon={<Add />}
        onClick={() => handleOpen("add_company")}
      >
        Add New
      </Button>
    ),
  });

  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
      renderCell: (props) => <RenderName props={props} />,
    },

    {
      flex: 1,
      field: "start_date",
      headerName: "Start Date",
    },
    {
      flex: 1,
      field: "address",
      headerName: "Address",
    },
    {
      flex: 1.5,
      field: "primary_email",
      headerName: "Email/Phone",
      renderCell: (props) => (
        <Box style={{ fontWeight: "600" }}>
          <Box>{props?.row?.primary_email}</Box>
          <Box>{props?.row?.primary_phone}</Box>
        </Box>
      ),
    },
    {
      flex: 1,
      field: "vat_number",
      headerName: "VAT/PAN No.",
    },

    {
      flex: 1,
      field: "firm_users",
      headerName: "Users",
      renderCell: (props) => {
        const url = `users?id=${props?.row?.id}&name=${props?.row?.short_name}`;
        return (
          <>
            <Button variant="outlined" onClick={() => navigate(url)}>
              View Users
            </Button>
          </>
        );
      },
    },

    {
      flex: 0.1,
      field: "action",
      headerName: "Actions",
      renderCell: ActionComponent,
    },
  ];
  return (
    <>
      {Tabs}
      {isFetching && <CustomLoader />}

      {!isFetching && isSuccess && (
        <CustomDataGrid
          rows={companyData?.data || []}
          columns={columns}
          tabsData={data}
        />
      )}

      <AllModals
        modalType={"add_company"}
        handleClose={() => handleClose("add_company")}
        open={modals?.add_company}
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

export default Company;
