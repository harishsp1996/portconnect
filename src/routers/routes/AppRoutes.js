import { useRoutes } from "react-router-dom";
import LogIn from "../../pages/auth/log-in";
import ForgotPassword from "../../pages/auth/Forgot-password";
import Register from "../../pages/auth/Register";
import Layout from "../../layouts/Layout";
import Dashboard from "../../pages/home/Dashboard";
import Company from "../../pages/home/Company";
import VesselDetails from "../../pages/home/FleetOverview/VesselDetails";
import FleetLayout from "../../pages/home/FleetOverview/FleetLayout";
import InspectionAudit from "../../pages/home/FleetOverview/InspectionAudit";
import Findings from "../../pages/home/FleetOverview/Findings";
import Certificate from "../../pages/home/FleetOverview/Certificate";
import DPACompanyInfo from "../../pages/home/FleetOverview/DPACompanyInfo";

const appRoutes = [
  { path: "/", element: <LogIn /> },
  { path: "/auth/log-in", element: <LogIn /> },
  { path: "/auth/forgotPassword", element: <ForgotPassword /> },
  { path: "/auth/forgotPassword/*", element: <ForgotPassword /> },
  { path: "/auth/register", element: <Register /> },
  { path: "/auth/register/*", element: <Register /> },
  {
    path: "home",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <Dashboard /> },
      { path: "company", element: <Company /> },
      {
        path: "FleetOverview",
        element: <FleetLayout />,
        children: [
          { path: "vesselDetails", element: <VesselDetails /> },
          { path: "inspectionAudit", element: <InspectionAudit /> },
          { path: "findings", element: <Findings /> },
          { path: "certificate", element: <Certificate /> },
          { path: "dpaCompanyInfo", element: <DPACompanyInfo /> },
        ],
      },
    ],
  },
];

function AppRoutes() {
  return useRoutes(appRoutes);
}

export default AppRoutes;
