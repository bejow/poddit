import React from "react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import Login from "../pages/Login/Login"
import MainPage from "../pages/MainPage/MainPage"
import PostCreate from "../pages/PostCreate/PostCreate"
import Profile from "../pages/Profile/Profile"
import paths from "./routePaths"

const MyRoutes = () => {
  return (
    <Routes>
      <Route
        path={paths.main}
        element={
          <ProtectedRoute redirectTo={paths.login} from={paths.main}>
            <MainPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={paths.profile}
        element={
          <ProtectedRoute redirectTo={paths.login} from={paths.profile}>
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path={paths.postCreate}
        element={
          <ProtectedRoute redirectTo={paths.login} from={paths.postCreate}>
            <PostCreate />
          </ProtectedRoute>
        }
      />

      <Route path={paths.login} element={<Login />} />
    </Routes>
  )
}

export default MyRoutes
