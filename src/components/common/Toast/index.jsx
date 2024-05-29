import { toast } from "react-toastify";

// custom success toast
export const successToast = (message = "Succeded") =>
   toast.success(message, {
      position: "top-right",
      autoClose: 100,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      theme: "light",
   });

// custom error toast
export const failureToast = (message = "Failed") =>
   toast.error(message, { theme: "colored" });

// custom warning toast
export const warningToast = (message = "Warned") =>
   toast.warning(message, { theme: "colored" });

// custom info toast
export const infoToast = (message = "Information") =>
   toast.info(message, { theme: "colored" });

export const errorToast = (error = {}) => {
   toast.error(error.data?.message, { theme: "colored" });
};

export const newErrorToast = (message = "Error Occured") =>
   toast.error(message, { theme: "colored" });

export const multipleErrorToast = (error) => {
   error?.data?.errors
      ? Object?.values(error?.data?.errors)?.forEach((message) =>
           toast.error(message, { theme: "colored" })
        )
      : toast.error(error.data?.message, { theme: "colored" });
};
