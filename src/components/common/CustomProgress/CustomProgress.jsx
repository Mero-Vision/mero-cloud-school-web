import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { returnNumberWithCommas } from "../../../utils/helpers";

const styles = {
  title: {
    color: "#383751",
    fontSize: "14px",
  },
  value: {
    color: "#383751",
    fontSize: "12px",
  },
  progress: {
    "& .MuiLinearProgress-root": {
      height: "12px",
      borderRadius: "13px",
      background: "#F3F3F6",
    },
    "& .MuiLinearProgress-bar": {
      borderRadius: "13px",
    },
  },
};

const CustomProgress = ({ data }) => {
  const percentage = useMemo(() => {
    const percent = (Number(data?.amount) / Number(data?.total)) * 100;
    return percent;
  }, [data]);
  return (
    <Box>
      <Typography style={styles?.title}>{data?.title}</Typography>
      <Grid spacing={2} container alignItems={"center"}>
        <Grid xs={7} item>
          <Box sx={styles?.progress}>
            <LinearProgress
              variant="determinate"
              value={percentage}
              sx={{
                "& .MuiLinearProgress-bar": {
                  background: data?.color,
                },
              }}
            />
          </Box>{" "}
        </Grid>
        <Grid xs={5} item>
          <Box style={styles?.value}>
            {localStorage.getItem("viewDashboard") === "true" ? (
              <Box>
                <Typography component={"span"}>
                  Rs. {returnNumberWithCommas(data?.amount) || "0.00"}{" "}
                </Typography>
                <Typography component={"span"} sx={{ color: data?.color }}>
                  ({percentage?.toFixed(2) || 0}%)
                </Typography>
              </Box>
            ) : (
              "Rs. XXXXX.XX"
            )}
          </Box>{" "}
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomProgress;
