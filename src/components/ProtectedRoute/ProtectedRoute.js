import React from "react"
import { Navigate } from "react-router-dom"
import useUserStore from "../../states/User"
import PropTypes from "prop-types"

export const ProtectedRoute = ({ children, redirectTo, from }) => {
  const isUserLoggedIn = useUserStore((state) => state.isUserLoggedIn)()
  return isUserLoggedIn ? children : <Navigate to={redirectTo} state={{ from }} />
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
}
