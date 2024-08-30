import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import HomePage from "./pages/home/HomePage";
import ErrorPage from "./pages/error/ErrorPage";

import RootLayout from "./components/RootLayout";
import WelcomePage from "./pages/welcome/WelcomePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PostsPage from "./pages/post/PostsPage";
import TeamsPage from "./pages/teams/TeamsPage";

import SingleProjectPage from "./pages/project/SingleProjectPage";
import ProfilePage from "./pages/profile/ProfilePage";
import ConfigureProfile from "./pages/profile/ConfigureProfile";
import UserProfilePage from "./pages/profile/UserProfilePage";
import ApplicantsPage from "./pages/applicants/ApplicantsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "post", element: <PostsPage /> },
      { path: "teams", element: <TeamsPage /> },

      { path: "project/:id", element: <SingleProjectPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "configure", element: <ConfigureProfile /> },
      { path: "user/:id", element: <UserProfilePage /> },
      {
        path: "proposal/:id/",
        element: <ApplicantsPage />,
      },
    ],
  },
  { path: "/welcome", element: <WelcomePage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <Register /> },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer limit={1} />
    </>
  );
};

export default App;
