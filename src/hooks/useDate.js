import { useSelector } from "react-redux";
import { changeDateFormat } from "../utils/helpers";

const useDate = () => {
   const { date } = useSelector((state) => state?.utils);
   const dates = {
      start_date: changeDateFormat(
         date?.[0]?.startDate,
         "YYYY-MM-DD"
      ),
      end_date: changeDateFormat(date?.[0]?.endDate, "YYYY-MM-DD"),
   };
   return { dates };
};

export default useDate;
