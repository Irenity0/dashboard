import App from "@/App";
import ErrorPage from "@/common/ErrorPage";
import MainLayout from "@/layouts/mainLayout";
import Calendar from "@/pages/calendar";
import Dashboard from "@/pages/Dashboard";
import EventsTable from "@/pages/EventsTable";
import SettingsPage from "@/pages/SettingsPage";
import TasksPage from "@/pages/TasksPage";
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
      {
        path: "/events",
        Component: EventsTable
      },
      {
        path: "/tasks",
        Component: TasksPage
      },
      {
        path: '/settings',
        Component: SettingsPage
      }
    ],
  },
  {
    path: "/*",
    Component: ErrorPage
  }
]);

export default router;
