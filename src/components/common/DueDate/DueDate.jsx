import { Box, Typography } from "@mui/material";
import {
  changeDateFormat,
  getDateDifference,
  isAfterDate,
} from "../../../utils/helpers";

const DueDate = ({ row }) => {
  const date = changeDateFormat(row?.due_date);
  const isAfter = isAfterDate(row?.due_date);

  return (
    <Box>
      <Typography>{date}</Typography>
      <Typography sx={{ color: isAfter ? "red" : "green", fontSize: "10px" }}>
        {getDateDifference(date)}
      </Typography>
    </Box>
  );
};

export default DueDate;
