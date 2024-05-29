import { useCallback } from "react";
import { useSelector } from "react-redux";
const useHasPermission = () => {
  const { user } = useSelector((state) => state?.auth);
  const hasPermission = useCallback(
    (of) => {
      const permissionCheck = user?.permissions?.includes(of?.toLowerCase());

      return permissionCheck ? true : false;
    },
    [user?.permissions]
  );

  const isAdmin = user?.role?.includes("accountingfirm" || "admin")
    ? true
    : false;

  return { hasPermission };
};

export default useHasPermission;
