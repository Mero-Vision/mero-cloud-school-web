import { Mail, Person, Phone } from "@mui/icons-material";
import { Box, Button, Grow, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetCustomersQuery } from "../../../../apis/customersApi";
import noData from "../../../../assets/NoData.svg";
import CustomBackButton from "../../CustomButton/CustomBackButton";
import styles from "./style";

const CommonInfo = () => {
  const classes = styles();
  const { watch } = useFormContext();
  const navigate = useNavigate();

  const { data: customers } = useGetCustomersQuery();

  const currentItem = useMemo(() => {
    return customers?.data?.find(
      (item) => item?.id === watch()?.customer_id?.id
    );
  }, [watch()?.customer_id?.id, customers?.data]);

  return (
    <Box>
      <CustomBackButton />
      <Box className={classes.mainSection}>
        <Typography className="title">Customer Info</Typography>{" "}
        <Grow in={currentItem}>
          <Box>
            {currentItem && (
              <Box>
                <Box>
                  <Box className={"infoDiv"}>
                    <Person />
                    <Typography className="position">
                      {currentItem?.name || "-"}
                    </Typography>
                  </Box>
                  <Box className={"infoDiv"}>
                    <Phone />
                    <Typography className="position">
                      {" "}
                      {currentItem?.customer_detail?.phone || "-"}
                    </Typography>
                  </Box>
                  <Box className={"infoDiv"}>
                    <Mail />
                    <Typography className="position">
                      {currentItem?.customer_detail?.email || "-"}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={"1rem"}>
                  <Button
                    variant="lightBlue"
                    fullWidth
                    onClick={() =>
                      navigate(`/sales/customers?id=${currentItem?.id}`)
                    }
                  >
                    View More Details
                  </Button>
                </Box>
              </Box>
            )}
          </Box>
        </Grow>
        <Grow in={!currentItem}>
          <Box>
            {!currentItem && (
              <Box textAlign={"center"}>
                <img width={"100%"} src={noData} />
                <Typography fontWeight={600}>No Data</Typography>
              </Box>
            )}
          </Box>
        </Grow>
      </Box>
    </Box>
  );
};

export default CommonInfo;
