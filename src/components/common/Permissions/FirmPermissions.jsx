import React from "react";
import { FirmPermissionList } from "./FirmPermissionList";
import Permissions from "./Permissions";

const CompanyPermissions = () => {
  return (
    <>
      <Permissions List={FirmPermissionList} type="accountingfirm" />
    </>
  );
};

export default CompanyPermissions;
