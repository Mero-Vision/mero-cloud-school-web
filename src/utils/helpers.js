import dayjs from "dayjs";
import objectSupport from "dayjs/plugin/objectSupport";
import moment from "moment";
import customToaster from "./customToaster";

export const isAfterDate = (date) => moment().isAfter(date);
export const fetcher = (...args) =>
   fetch(...args).then((res) => res?.json());
export const getDateObject = (date) => {
   dayjs.extend(objectSupport);
   const [hour, minute, second] = date.split(":");
   return dayjs({ hour, minute, second });
};
export const isPwa = () => {
   return ["fullscreen", "standalone", "minimal-ui"].some(
      (displayMode) =>
         window?.matchMedia("(display-mode: " + displayMode + ")")
            .matches
   );
};

export const getDurationInDays = (startDate, endDate) => {
   const earlyDate = dayjs(startDate);
   const latterDate = dayjs(endDate);
   return Number(latterDate.diff(earlyDate, "day")) + 1;
};

export const handleAuthErrors = () => {
   customToaster({
      type: "danger",
      message: "Unauthorized: Please log in.",
   });
};

export const flattenArray = (array) => {
   var result = [];
   array?.forEach(function (a) {
      result.push(a);
      if (Array.isArray(a?.sub_account_heads)) {
         result = result?.concat(flattenArray(a?.sub_account_heads));
      }
   });
   return result;
};

export const getToken = () => {
   const access_token = localStorage.getItem("account_access_token");
   const refresh_token = localStorage.getItem(
      "account_refresh_token"
   );
   const user = JSON.parse(localStorage.getItem("user") || "{}");

   console.log({ access_token, refresh_token });

   return {
      access_token,
      refresh_token,
      user,
   };
};

export const getError = (error) => {
   let err;

   if (error?.data?.errors) {
      err = customToaster({
         type: "error",
         message:
            error?.data?.errors &&
            Object?.values(error?.data?.errors)
               ?.map((item) => item)
               ?.join("\n"),
      });
   } else if (error?.data?.message) {
      err = customToaster({
         type: "error",
         message: error?.data?.message,
      });
   }
   return err;
};
export const getSuccess = (success) => {
   return (
      success &&
      customToaster({
         type: "success",
      })
   );
};
export const getDateFormat = (newDate) => {
   const { year, month, date } = newDate;
   const finalDate = `${year}-${month + 1}-${date}`;
   return finalDate;
};

export const changeDateFormat = (date, format = "DD/MMM/YYYY") => {
   const changedDate = moment(date).format(format);
   return changedDate;
};

export const getDateDifference = (date) => {
   const data = moment(date).fromNow();

   return data;
};

export const renderArrayTotal = (array, value) => {
   const returnData = (array || [])
      ?.reduce(
         (total, current) =>
            Number(total || 0) +
            Number(value ? current?.[value] || 0 : current || 0),
         0
      )
      ?.toFixed(2);
   return Number(returnData);
};
export const stringifyData = (array = []) => {
   const data = array?.map((item) => {
      return JSON.stringify(item);
   });
   return data;
};

export const replaceFunction = (
   string,
   valueToReplace = " ",
   newValue = "-"
) => {
   const data = string?.replaceAll(valueToReplace, newValue);
   return data;
};

export const findInArray = (array = [], key, value) => {
   const data = array?.find(
      (item) => item?.[key]?.toString() === value?.toString()
   );
   return data;
};
export const filterInArray = (array = [], key, value) => {
   const data = array?.filter(
      (item) => item?.[key]?.toString() === value?.toString()
   );
   return data;
};

export const returnFixedValue = (value, number = 2) => {
   return Number(value ? value : 0)?.toFixed(number);
};

//Return commas (Eg: 1,256,00.00)
export const returnNumberWithCommas = (data) => {
   return returnFixedValue(data)
      ?.toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const returnNepaliNumberWithCommas = (data) => {
   return Number(data)?.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
   });
};

export const sumByKey = (arr, key) => {
   if (arr.length === 0) {
      return 0;
   }
   return arr.reduce((acc, obj) => {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
         const value = obj[key];
         if (value === 0 || value === null) {
            return acc;
         }
         return acc + parseFloat(value);
      } else {
         return acc;
      }
   }, 0);
};

export const generateGreetings = () => {
   const currentHour = moment().format("HH");

   if (currentHour >= 3 && currentHour < 12) {
      return "Morning";
   } else if (currentHour >= 12 && currentHour < 15) {
      return "Afternoon";
   } else {
      return "Evening";
   }
};

export const viewDashboard = (amount) => {
   let view_dashboard =
      localStorage.getItem("viewDashboard") === "true" ? true : false;
   console.log({ view_dashboard });
   return view_dashboard
      ? `Rs. ${returnNumberWithCommas(amount)}`
      : "Rs. XXXXX.XX";
};

export const getCharacterValidationError = (str) => {
   return `Your password must contain at least 1 ${str} character`;
};

// to get company details with roles and permission
// const {id,...} = getCompanyDetail()
// getCompanyDetail().id
export const getCompanyDetail = () => {
   const userData = JSON.parse(localStorage?.getItem("user") ?? `{}`);
   const accessToken =
      localStorage?.getItem("account_access_token") ?? "";
   const company = JSON.parse(
      localStorage.getItem("company") ?? `{}`
   );

   console.log({ company });

   return {
      id: userData?.company?.id ?? "",
      business_name: userData?.company?.business_name ?? "",
      display_name: userData?.company?.display_name ?? "",
      services: userData?.company?.services ?? "",
      branches: userData?.company?.branches ?? "",
      package: userData?.company?.package ?? "",
      roles: userData?.roles ?? [],
      permissions: userData?.permissions ?? [],
      user_data: userData ?? {},
      token: accessToken,
      branchAddress: company?.address,
   };
};
