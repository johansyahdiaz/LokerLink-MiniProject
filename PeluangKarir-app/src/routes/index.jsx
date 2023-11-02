// eslint-disable-next-line no-unused-vars
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect } from "react";
import Homepage from "../pages/homePage";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import VacancyForm from "../pages/formVacancy";
import Dashboard from "../pages/dashboard";
import JobCatalog from "../pages/jobCatalog";
import JobDetailPage from "../pages/jobDetail";
import ChatApp from "../pages/chatPage";
import { useToken } from "../utils/context/token";
import { setAxiosConfig } from "../utils/apis/axiosWithConfig";

export default function Router() {
  const { token } = useToken();

  useEffect(() => {
    setAxiosConfig("", import.meta.env.VITE_API_ENDPOINT);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/job-catalog",
      element: <JobCatalog />,
    },
    {
      path: "/job-details/:jobVacancyId",
      element: <JobDetailPage />,
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/ChatAI",
      element: <ChatApp />,
    },
    {
      path: "/vacancy-form",
      element: token === "" ? <Navigate to="/login" /> : <VacancyForm />,
    },
    {
      path: "/profile-dashboard",
      element: token === "" ? <Navigate to="/login" /> : <Dashboard />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
