import React from "react";
import OrganizationTabs from "../view/OrganizationTabs";
import { Outlet, useLocation } from "react-router-dom";
const organization = () => {
  const { pathname } = useLocation();
  const match = pathname.match(/^\/?all-Organization\/todo\//);
  const prefix = match ? match[0] : "";

  return (
    <React.Fragment>
      {prefix === "/all-Organization/todo/" ? <Outlet /> : <OrganizationTabs />}
    </React.Fragment>
  );
};

export default organization;
