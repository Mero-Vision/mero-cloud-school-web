import { Grid } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  useGetAllCompanyQuery,
  useUpdateCompanyUserMutation,
} from "../../../../apis/companyApi";
import { useGetAllUsersQuery } from "../../../../apis/usersApi";
import CustomButton from "../../../common/CustomButton/CustomButton";
import { CustomMultipleSelect } from "../../../common/CustomSelects/CustomMultipleSelect";
import { CustomSearchSelect } from "../../../common/CustomSelects/CustomSearchSelect";

const AssignUser = ({ handleClose, row }) => {
  const { data: userData } = useGetAllUsersQuery();
  const { data: companyData } = useGetAllCompanyQuery();
  const [updateCompanyUser, { isSuccess }] = useUpdateCompanyUserMutation();

  console.log({ userData, companyData });

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (values) => {
    console.log({ values });
    updateCompanyUser(values);
  };

  const userOptions = userData?.data?.map(({ id, name }) => ({
    label: name,
    value: id,
  }));
  const companyOptions = companyData?.data?.map(({ id, name }) => ({
    label: name,
    value: id,
  }));

  useEffect(() => {
    if (isSuccess) {
      handleClose();
    }
  }, [isSuccess]);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3}>
          <Grid item sm={12}>
            <CustomSearchSelect
              control={control}
              errors={errors}
              name={"company_id"}
              title="Company"
              data={companyOptions || []}
            />
          </Grid>
          <Grid item sm={12}>
            <CustomMultipleSelect
              control={control}
              errors={errors}
              name={"user_id"}
              title={"Users"}
              data={userOptions || []}
            />
          </Grid>
        </Grid>

        <CustomButton />
      </form>
    </>
  );
};

export default AssignUser;
