import { createBrowserRouter, RouterProvider } from "react-router"
import MainLayout from "./components/mycomponents/mainlayout/MainLayout"
import Home from "./pages/Home"
import About from "./pages/About"
import { ThemeProvider } from "./contexts/ThemeContext"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> }
    ]
  },
]);

function App() {
  return <ThemeProvider storageKey="writespace-ui-theme" defaultTheme="light">
    <RouterProvider router={router} />
  </ThemeProvider>
}

export default App