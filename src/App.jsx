import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "./components/mycomponents/mainlayout/MainLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import ForgotPassword from "./pages/ForgotPassword"
import { ThemeProvider } from "./contexts/ThemeContext"
import { Toaster } from "react-hot-toast"
import ResetPassword from "./pages/ResetPassword"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
    ]
  },
  { path: "forgot_password", element: <ForgotPassword /> },
  { path: "reset_password/:uidb64/:token", element: <ResetPassword /> }
]);

function App() {
  return <ThemeProvider storageKey="writespace-ui-theme" defaultTheme="light">
    <RouterProvider router={router} />
    <Toaster />
  </ThemeProvider>
}

export default App