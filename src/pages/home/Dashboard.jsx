import { useState } from "react";
import dashboardimage from "../../assets/img/dashboard01.png";
import dashboard from "../../assets/img/dashboard02.png";

export function Dashboard() {
  return (
    <>
      <div className="text-3xl text-center mb-8">Welcome to Dashboard</div>
      <div className="flex justify-between">
        <img
          style={{ objectFit: "inherit" }}
          src={dashboardimage}
          className=" inset-0 z-0 "
        />
        <img
          style={{ objectFit: "inherit" }}
          src={dashboard}
          className=" inset-0 z-0 "
        />
      </div>
    </>
  );
}
export default Dashboard;
