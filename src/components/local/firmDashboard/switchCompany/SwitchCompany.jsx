import { Search, SubdirectoryArrowRight } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useGetAllCompanyQuery } from "../../../../apis/companyApi";
import { useGetUsersCompanyQuery } from "../../../../apis/usersApi";
import useCustomNavigate from "../../../../hooks/useCustomNavigate";
import { stringifyData } from "../../../../utils/helpers";
import CustomLoader from "../../../common/CustomLoader/CustomLoader";
import DataNotFound from "../../../common/DataNotFound/DataNotFound";
import styles from "./styles";

const SwitchCompany = () => {
  const classes = styles();
  const [searchTerm, setSearchTerm] = useState("");
  const { handleNavigate } = useCustomNavigate();
  const {
    data: companyData,
    isFetching: isCompanyFetching,
    isSuccess: isCompanySuccess,
  } = useGetAllCompanyQuery();
  const {
    data: usersCompanyData,
    isFetching: isUsersCompanyFetching,
    isSuccess: isUsersCompanySuccess,
  } = useGetUsersCompanyQuery();

  const items = useMemo(() => {
    return (
      companyData?.data?.length ? companyData?.data : usersCompanyData?.data
    )?.filter((item) => {
      if (searchTerm === "") {
        return item;
      } else if (
        item?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
        item?.short_name?.toLowerCase()?.includes(searchTerm?.toLowerCase())
      ) {
        return item;
      }
    });
  }, stringifyData([companyData?.data, usersCompanyData?.data, searchTerm]));

  const {
    control,
    formState: { errors },
  } = useForm({});

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCompanySwitch = (item) => {
    handleNavigate("/");
    localStorage.setItem("company", JSON.stringify(item));
    localStorage.setItem("is_company", JSON.stringify(true));
  };

  return (
    <Box className={classes.main}>
      <Box className={classes.container}>
        <Typography className={classes.title}>Select A Company</Typography>
        <Box className={classes.searchbar}>
          <Box className={classes.inputDiv}>
            <input
              name={"search"}
              placeholder="Search Company"
              value={searchTerm}
              onChange={handleChange}
            />
          </Box>
          <Box className={classes.searchIcon}>
            <Search />
          </Box>
        </Box>
        {/* {isCompanyFetching && <CustomLoader />} */}
        <Box className={classes.companyContainer}>
          {isCompanyFetching && <CustomLoader />}
          {!isCompanyFetching &&
            isCompanySuccess &&
            (items?.length ? (
              items?.map((item, index) => (
                <Box
                  key={index}
                  className={classes.singleCompany}
                  onClick={() => handleCompanySwitch(item)}
                >
                  {isCompanySuccess}

                  <Typography className={classes.companyName}>
                    {item?.name ?? "-"} ({item?.short_name ?? "-"})
                  </Typography>
                </Box>
              ))
            ) : (
              <DataNotFound />
            ))}
        </Box>
        <Button
          startIcon={<SubdirectoryArrowRight />}
          className={classes.dashboardButton}
          onClick={() => handleNavigate("/firm")}
        >
          Go To Dashboard
        </Button>
      </Box>
    </Box>
  );
};

export default SwitchCompany;
