import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginPage from "./components/no_auth/LoginPage";
import SignupPage from "./components/no_auth/SignupPage";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Home from "./components/dashboard/Home";
import Chemistry from "./components/dashboard/Chemistry";
import Biology from "./components/dashboard/Biology";
import SelfStudy from "./components/dashboard/SelfStudy";
import Profile from "./components/dashboard/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Home />,
          },
          {
            path: "chemistry",
            element: <Chemistry />,
          },
          {
            path: "biology",
            element: <Biology />,
          },
          {
            path: "self-study",
            element: <SelfStudy />,
          },
          {
            path: "profile",
            element: <Profile />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
