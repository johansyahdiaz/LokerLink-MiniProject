// eslint-disable-next-line no-unused-vars
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import Homepage from "../pages/homePage";
import LoginPage from "../pages/auth/login";
import RegisterPage from "../pages/auth/register";
import VacancyForm from "../pages/formVacancy";
import Dashboard from "../pages/dashboard";

export default function Router() {
  // const { token } = useToken();

  // useEffect(() => {
  //   setAxiosConfig("", import.meta.env.VITE_BASE_URL);
  // }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Homepage />,
    },
    // {
    //   path: "/products",
    //   element: token === "" ? <Navigate to="/" /> : <ProductsPage />,
    // },
    // {
    //   path: "/products/:id",
    //   element: token === "" ? <Navigate to="/" /> : <ProductsDetail />,
    // },
    {
      path: "/login",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    {
      path: "/vacancy-form",
      element: <VacancyForm />,
    },
    {
      path: "/profile-dashboard",
      element: <Dashboard />,
    },
    {
      path: "*",
      element: <div>404 page not found</div>,
    },
  ]);

  return <RouterProvider router={router} />;
}
