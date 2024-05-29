import React from "react";
import { CompanyPermissionList } from "./CompanyPermissionList";
import Permissions from "./Permissions";

const CompanyPermissions = () => {
  return (
    <>
      <Permissions List={CompanyPermissionList} type="company" />
    </>
  );
};

export default CompanyPermissions;
