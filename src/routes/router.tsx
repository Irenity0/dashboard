import App from "@/App";
import MainLayout from "@/layouts/mainLayout";
import Calendar from "@/pages/calendar";
import Dashboard from "@/pages/Dashboard";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: App
      },
      {
        path: "/dashboard",
        Component: Dashboard,
      },
      {
        path: "/calendar",
        Component: Calendar,
      },
    ],
  },
]);

export default router;
