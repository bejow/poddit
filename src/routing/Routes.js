import React from "react"
import { Routes, Route } from "react-router-dom"
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute"
import Community from "../pages/Community/Community"
import Login from "../pages/Login/Login"
import MainPage from "../pages/MainPage/MainPage"
import Post from "../pages/Post/Post"
import PostCreate from "../pages/PostCreate/PostCreate"
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
        path={`${paths.postCreate}`}
        element={
          <ProtectedRoute redirectTo={paths.login} from={paths.postCreate}>
            <PostCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${paths.postCreate}/:communityId`}
        element={
          <ProtectedRoute redirectTo={paths.login} from={paths.postCreate}>
            <PostCreate />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${paths.post}/:postId/:postUrl`}
        element={
          <ProtectedRoute redirectTo={paths.login} from={paths.main}>
            <Post />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${paths.community}/:communityId`}
        element={
          <ProtectedRoute redirectTo={paths.login} from={paths.main}>
            <Community />
          </ProtectedRoute>
        }
      />
      <Route path={paths.login} element={<Login />} />
    </Routes>
  )
}

export default MyRoutes
