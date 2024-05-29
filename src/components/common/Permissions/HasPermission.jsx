import React, { useMemo } from "react";
import { useSelector } from "react-redux";

const HasPermission = ({ of, children }) => {
  const { user } = useSelector((state) => state?.auth);
  const hasPermission = useMemo(() => {
    const permissionCheck = user?.permissions?.includes(of?.toLowerCase());

    return permissionCheck ? true : false;
  }, [user?.permissions, of]);

  const isAdmin = user?.roles?.includes("admin") ? true : false;

  if (isAdmin) {
    return children;
  }

  return (
    <>
      {hasPermission && children}
      {/* {children} */}
    </>
  );
};

export default HasPermission;
