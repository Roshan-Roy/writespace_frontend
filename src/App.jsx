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
import Profile from "./pages/Profile"
import ProfileHome from "./pages/ProfileHome"
import ProfileAbout from "./pages/ProfileAbout"
import ProfileFollowing from "./pages/ProfileFollowing"
import ProfileFollowers from "./pages/ProfileFollowers"
import Topics from "./pages/topics"
import Topic from "./pages/Topic"
import Story from "./pages/Story"
import Following from "./pages/Following"
import SearchLayout from "./pages/SearchLayout"
import SearchStories from "./pages/SearchStories"
import SearchUsers from "./pages/SearchUsers"
import SearchTopics from "./pages/SearchTopics"

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
          { path: "following", element: <Following /> },
          {
            path: "my_profile",
            element: <MyProfile />,
            children: [
              { index: true, element: <MyProfileHome /> },
              { path: "saved", element: <MyProfileSaved /> },
              { path: "about", element: <MyProfileAbout /> },
            ]
          },
          { path: "my_following", element: <MyProfileFollowing /> },
          { path: "my_followers", element: <MyProfileFollowers /> },
          { path: "write", element: <Write /> },
          { path: "notifications", element: <Notifications /> },
          { path: "edit/:story_id", element: <EditStory /> },
          {
            path: "profile/:profile_id",
            element: <Profile />,
            children: [
              { index: true, element: <ProfileHome /> },
              { path: "about", element: <ProfileAbout /> },
            ]
          },
          { path: "following/:profile_id", element: <ProfileFollowing /> },
          { path: "followers/:profile_id", element: <ProfileFollowers /> },
          { path: "topics", element: <Topics /> },
          { path: "topic/:topic_id", element: <Topic /> },
          { path: "story/:story_id", element: <Story /> },
          {
            path: "search",
            element: <SearchLayout />,
            children: [
              { index: true, element: <SearchStories /> },
              { path: "users", element: <SearchUsers /> },
              { path: "topics", element: <SearchTopics /> }
            ]
          }
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