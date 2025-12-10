import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "./components/mycomponents/mainlayout/MainLayout"
import About from "./pages/About"
import ForgotPassword from "./pages/ForgotPassword"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Toaster } from "react-hot-toast"
import ResetPassword from "./pages/ResetPassword"
import VerifyEmail from "./pages/VerifyEmail"
import { AuthContextProvider } from "./contexts/AuthContext"
import LandingPageOrHome from "./pages/LandingPageOrHome"
import Saved from "./pages/Saved"
import Profile from "./pages/Profile"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPageOrHome /> },
      { path: "about", element: <About /> },
      { path: "saved", element: <Saved /> },
      { path: "profile", element: <Profile /> },
    ]
  },
  { path: "forgot_password", element: <ForgotPassword /> },
  { path: "reset_password/:uidb64/:token", element: <ResetPassword /> },
  { path: "verify_email/:uidb64/:token", element: <VerifyEmail /> }
]);

function App() {
  return (
    <AuthContextProvider>
      <ThemeProvider storageKey="writespace-ui-theme" defaultTheme="light">
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </AuthContextProvider>
  )
}

export default App