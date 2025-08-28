import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { createBrowserRouter, Navigate } from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout.tsx";
import SettingsPage from "./page/settings-page.tsx";
import GradeLevelsPage from "./page/grade-level-page.tsx";
import EmployeesPage from "./page/user-page.tsx";
import EmployeeDetailsPage from "./page/employee-details.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={"/employees"} />,
      },
      {
        path: "/employees",
        element: <EmployeesPage />,
      },
      {
        path: "/employees/:employeeId",
        element: <EmployeeDetailsPage />,
      },
      {
        path: "/grade-levels",
        element: <GradeLevelsPage />,
      },
      {
        path: "/settings",
        element: <SettingsPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App router={router} />
  </StrictMode>
);
