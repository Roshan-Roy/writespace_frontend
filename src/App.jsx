import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "./components/mycomponents/mainLayout/MainLayout"
import About from "./pages/About"
import ForgotPassword from "./pages/ForgotPassword"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Toaster } from "react-hot-toast"
import ResetPassword from "./pages/ResetPassword"
import VerifyEmail from "./pages/VerifyEmail"
import { AuthProvider } from "./contexts/AuthContext"
import LandingPageOrHome from "./pages/LandingPageOrHome"
import Saved from "./pages/Saved"
import MyProfile from "./pages/MyProfile"
import Write from "./pages/Write"
import Notifications from "./pages/Notifications"
import ProtectedRoutes from "./components/mycomponents/protectedRoutes/ProtectedRoutes"
import MyProfileHome from "./pages/MyProfileHome"
import MyProfileSaved from "./pages/MyProfileSaved"
import MyProfileAbout from "./pages/MyProfileAbout"
import MyProfileFollowing from "./pages/MyProfileFollowing"
import MyProfileFollowers from "./pages/MyProfileFollowers"
import EditStory from "./pages/EditStory"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPageOrHome /> },
      { path: "about", element: <About /> },
      {
        element: <ProtectedRoutes />,
        children: [
          { path: "saved", element: <Saved /> },
          {
            path: "profile",
            element: <MyProfile />,
            children: [
              { index: true, element: <MyProfileHome /> },
              { path: "saved", element: <MyProfileSaved /> },
              { path: "about", element: <MyProfileAbout /> },
            ]
          },
          { path: "following", element: <MyProfileFollowing /> },
          { path: "followers", element: <MyProfileFollowers /> },
          { path: "write", element: <Write /> },
          { path: "notifications", element: <Notifications /> },
          { path: "edit/:story_id", element: <EditStory /> }
        ]
      }
    ]
  },
  { path: "forgot_password", element: <ForgotPassword /> },
  { path: "reset_password/:uidb64/:token", element: <ResetPassword /> },
  { path: "verify_email/:uidb64/:token", element: <VerifyEmail /> }
]);

function App() {
  return (
    <AuthProvider>
      <ThemeProvider storageKey="writespace-ui-theme" defaultTheme="light">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App