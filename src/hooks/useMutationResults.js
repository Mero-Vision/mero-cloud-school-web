import { useEffect } from "react";
import {
   errorToast,
   multipleErrorToast,
} from "../components/common/Toast";

const useMutationResults = ({
   isSuccess,
   error,
   successHandler,
   errorHandler,
}) => {
   useEffect(() => {
      if (isSuccess && successHandler) {
         successHandler();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [isSuccess]);

   useEffect(() => {
      if (error) {
         error?.data?.errors
            ? multipleErrorToast(error)
            : errorToast(error);
         errorHandler && errorHandler();
      }
   }, [error]);
};

export default useMutationResults;
