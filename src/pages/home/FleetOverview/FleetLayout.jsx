import { useState } from "react";
import { Outlet } from "react-router-dom";

export function FleetLayout() {
  return (
    <>
      <Outlet />
    </>
  );
}
export default FleetLayout;
