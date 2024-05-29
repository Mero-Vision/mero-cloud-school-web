import { Box, Typography } from "@mui/material";
import TextTooltip from "../CustomTooltips/TextTooltip";
import styles from "./styles";

const CommonSingleDiv = ({ title, value, fullWidth }) => {
  const classes = styles();
  return (
    <Box className={classes.singleDiv}>
      <Typography className={classes.title}>{title || "N/A"}</Typography>
      {fullWidth ? (
        <Typography className={classes.value}>{value || "N/A"}</Typography>
      ) : (
        <Box className={classes.value}>
          <TextTooltip data={{ title: value || "N/A" }} maxWidth="8rem" />
        </Box>
      )}
    </Box>
  );
};

export default CommonSingleDiv;
