import { Mail, Person, Phone } from "@mui/icons-material";
import { Box, Button, Grow, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useGetSuppliersQuery } from "../../../../apis/suppliersApi";
import noData from "../../../../assets/NoData.svg";
import CustomBackButton from "../../CustomButton/CustomBackButton";
import styles from "./style";

const CommonInfo = () => {
  const classes = styles();
  const { watch } = useFormContext();
  const navigate = useNavigate();

  const { data: suppliers } = useGetSuppliersQuery();

  const currentItem = useMemo(() => {
    return suppliers?.data?.find((item) => item?.id === watch()?.vendor_id?.id);
  }, [watch()?.vendor_id?.id, suppliers?.data]);
  return (
    <Box>
      <CustomBackButton />
      <Box className={classes.mainSection}>
        <Typography className="title">Supplier Info</Typography>{" "}
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
                      {currentItem?.vendor_detail?.phone || "-"}
                    </Typography>
                  </Box>
                  <Box className={"infoDiv"}>
                    <Mail />
                    <Typography className="position">
                      {currentItem?.vendor_detail?.email || "-"}
                    </Typography>
                  </Box>
                </Box>
                <Box mt={"1rem"}>
                  <Button
                    variant="lightBlue"
                    fullWidth
                    onClick={() =>
                      navigate(`/purchase/suppliers?id=${currentItem?.id}`)
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
