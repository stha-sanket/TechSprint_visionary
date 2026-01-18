import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
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
import InorganicReaction from "./components/auth/chapters/chemistry/inorganic/InorganicReaction";
import Assessment from "./components/auth/chapters/chemistry/Assessment";
import HumanAnatomy from "./components/dashboard/biology/HumanAnatomy";

import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AuthProvider } from "./components/auth/AuthContext";

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
        element: (
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Navigate to="/dashboard/home" replace />,
          },
          {
            path: "home",
            element: <Home />,
          },
          {
            path: "chemistry",
            element: <Chemistry />,
          },
          {
            path: "chemistry/:chapterId",
            element: <InorganicReaction />,
          },
          {
            path: "chemistry/assessment/:chapterId",
            element: <Assessment />,
          },
          {
            path: "biology",
            element: <Biology />,
          },
          {
            path: "biology/:chapterId",
            element: <HumanAnatomy />,
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
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Provider>
  );
}

export default App;
