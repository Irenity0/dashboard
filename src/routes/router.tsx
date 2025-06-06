import App from "@/App";
import ErrorPage from "@/common/ErrorPage";
import MainLayout from "@/layouts/mainLayout";
import Calendar from "@/pages/calendar";
import Dashboard from "@/pages/Dashboard";
import EventsTable from "@/pages/EventsTable";
import SettingsPage from "@/pages/SettingsPage";
import TasksPage from "@/pages/TasksPage";
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./privateRoute";

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
        element: <PrivateRoute><Dashboard/></PrivateRoute>
      },
      {
        path: "/calendar",
         element: <PrivateRoute><Calendar/></PrivateRoute>
      },
      {
        path: "/events",
         element: <PrivateRoute><EventsTable/></PrivateRoute>
      },
      {
        path: "/tasks",
         element: <PrivateRoute><TasksPage/></PrivateRoute>
      },
      {
        path: '/settings',
         element: <PrivateRoute><SettingsPage/></PrivateRoute>
      }
    ],
  },
  {
    path: "/*",
    Component: ErrorPage
  }
]);

export default router;
