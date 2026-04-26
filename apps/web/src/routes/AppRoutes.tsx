/**
 * FoodBridge Centralized Router Configuration
 * Architecture Overview:
 * 1. Data-Driven Routing: Uses createBrowserRouter to enable concurrent data fetching via loaders.
 * 2. Performance: Implements React.lazy for Route-based Code Splitting, reducing initial bundle size.
 * 3. Layout Pattern: Utilizes a MainLayout wrapper to provide persistent UI across sub-routes.
 * 4. Resiliency: Employs a top-level errorElement to catch and isolate runtime crashes.
 * 5. UX: Integrates a withSuspense Higher-Order Component to manage visual transitions.
 */
import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { withSuspense } from "../components/Loader";
import MainLayout from "../layouts/MainLayout";
import ErrorPage from "../pages/Error/Error";
import ProtectedRoute from "@components/ProtectedRoute";
import DashboardLayout from "../layouts/DashboardLayout";

const HomePage = lazy(() => import("../pages/Home/HomePage"));
const LoginPage = lazy(() => import("../pages/Login/Login"));
const DashboardPage = lazy(() => import("../pages/dashboard/Dashboard"));
const SignupPage = lazy(() => import("../pages/Signup/Signup"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: withSuspense(HomePage),
      }
    ],
  },
  
  
  {
    path: "/login",
    element: withSuspense(LoginPage),
  },
  {
    path: "/signup",
    element: withSuspense(SignupPage),
  },
  {
    element: <ProtectedRoute />, 
    children: [
      {
        path: "/dashboard",
        element: <DashboardLayout />, 
        children: [
          {
            index: true,
            element: withSuspense(DashboardPage),
          },
          {
            path: "history",
            element: withSuspense(lazy(() => import("../pages/dashboard/History")))
          },
          {
            path: "deliveries",
            element: withSuspense(lazy(() => import("../pages/dashboard/ActiveDeliveries")))
          },
          {
            path: "schedule",
            element: withSuspense(lazy(() => import("../pages/dashboard/Schedule")))
          },
          {
            path: "messages",
            element: withSuspense(lazy(() => import("../pages/dashboard/Messages")))
          },
          {
            path: "list-food",
            element: withSuspense(lazy(() => import("../pages/dashboard/ListFood")))
          }
        ]
      }
    ]
  },
  {
    path: "/404",
    element: <ErrorPage />,
  },
  {
    path: "*",
    element: <Navigate to="/404" replace />,
  },
]);

export default router;