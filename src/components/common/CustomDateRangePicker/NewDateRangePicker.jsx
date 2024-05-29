import { Box, InputLabel, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCalendarDate } from "../../../rootRedux/utilsSlice";
import { changeDateFormat } from "../../../utils/helpers";

const NewDateRangePicker = () => {
  const dispatch = useDispatch();
  const [dates, setDates] = useState({
    start_date: changeDateFormat(new Date(), "YYYY-MM-DD"),
    end_date: changeDateFormat(new Date(), "YYYY-MM-DD"),
  });

  useEffect(() => {
    dispatch(setCalendarDate(dates));
  }, [dates]);
  const handleDateChange = (e) => {
    setDates((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
        end_date: e.target.name === "start_date" ? "" : e.target.value,
      };
    });
  };

  return (
    <Box
      mt={0.45}
      sx={{
        "& input": {
          paddingBlock: "5px !important",
        },
        display: "flex",
      }}
    >
      <Box>
        <InputLabel
          className="title"
          style={{ fontSize: "12px", color: "#000", marginBottom: "3px" }}
        >
          FROM
        </InputLabel>
        <TextField
          type="date"
          name={"start_date"}
          value={dates?.start_date}
          onChange={handleDateChange}
        />
      </Box>
      <Box>
        <InputLabel
          className="title"
          style={{ fontSize: "12px", color: "#000", marginBottom: "3px" }}
        >
          TO
        </InputLabel>
        <TextField
          type="date"
          name={"end_date"}
          value={dates?.end_date}
          onChange={handleDateChange}
        />
      </Box>
    </Box>
  );
};

export default NewDateRangePicker;
