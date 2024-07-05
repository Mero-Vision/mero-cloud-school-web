import { useGetCompanyUserQuery } from "../../../../apis/companyApi";
import { changeDateFormat } from "../../../../utils/helpers";
import CustomDataGrid from "../../../common/CustomDataGrid/CustomDataGrid";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";

const ViewUsers = ({ handleClose, row }) => {
  const { data, isFetching, isSuccess } = useGetCompanyUserQuery(row?.id);

  console.log({ data });

  const columns = [
    {
      flex: 1,
      field: "name",
      headerName: "Name",
    },

    {
      flex: 1,
      field: "email",
      headerName: "Email",
    },
    {
      flex: 1,
      field: "email_verified_at",
      headerName: "Verified Date",
      renderCell: (params) => (
        <>{changeDateFormat(params?.row?.email_verified_at, "YYYY-MM-DD")}</>
      ),
    },
    {
      flex: 1,
      field: "company_id",
      headerName: "Company",
    },
  ];

  return (
    <div>
      {/* <ul>
        {data?.data?.map((item) => (
          <li>{item?.name}</li>
        ))}
      </ul> */}

      {isFetching && <CustomLoader />}

      {isSuccess && (
        <CustomDataGrid
          rows={data?.data || []}
          columns={columns}
          tabsData={data}
        />
      )}
    </div>
  );
};

export default ViewUsers;
