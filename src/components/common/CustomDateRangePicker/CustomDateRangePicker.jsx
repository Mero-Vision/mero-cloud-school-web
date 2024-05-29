import { CalendarTodayOutlined } from "@mui/icons-material";
import { Box } from "@mui/material";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { DateRangePicker, DefinedRange } from "react-date-range";
import { useDispatch } from "react-redux";
import { setCalendarDate } from "../../../rootRedux/utilsSlice";
import styles from "./styles";

const CustomDateRangePicker = () => {
   const ref = useRef();
   const dispatch = useDispatch();
   const classes = styles();
   const [openDate, setOpenDate] = useState(false);
   const thisMonth = DefinedRange?.defaultProps?.staticRanges?.find(
      (item) => item?.label?.toLowerCase() === "this month"
   );
   const [date, setDate] = useState([
      {
         ...thisMonth?.range(),
         key: "selection",
      },
   ]);

   useEffect(() => {
      dispatch(setCalendarDate(date));
   }, []);

   const handleDate = (item) => {
      setDate([item.selection]);
      dispatch(setCalendarDate([item?.selection]));
   };

   useEffect(() => {
      function handleClickOutside(event) {
         if (ref.current && !ref.current.contains(event.target)) {
            setOpenDate(false);
         }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
         document.removeEventListener(
            "mousedown",
            handleClickOutside
         );
      };
   }, [ref]);
   return (
      <div className={classes.root}>
         <Box
            className={classes.dateContainer}
            onClick={() => setOpenDate(true)}
         >
            <Box className={classes.calendarIcon}>
               <CalendarTodayOutlined />
            </Box>
            <Box>
               {`${format(
                  date[0].startDate,
                  "yyyy-MM-dd"
               )} - ${format(date[0].endDate, "yyyy-MM-dd")}`}
            </Box>
         </Box>
         {
            <Box
               ref={ref}
               style={{
                  transition: "250ms opacity ease-in-out",
                  opacity: openDate ? "100" : "0",
                  pointerEvents: openDate ? "auto" : "none",
               }}
            >
               <DateRangePicker
                  editableDateInputs={true}
                  onChange={(item) => handleDate(item)}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  ranges={date}
                  direction="horizontal"
                  className="dateRange"
               />
            </Box>
         }
      </div>
   );
};

export default CustomDateRangePicker;
