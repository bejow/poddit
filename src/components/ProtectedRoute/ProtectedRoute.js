import React from "react"
import { Navigate } from "react-router-dom"
import PropTypes from "prop-types"
import useAuth from "../../utils/hooks/useAuth"

const ProtectedRoute = ({ children, redirectTo, from }) => {
  const { isUserLoggedIn } = useAuth()
  console.log(isUserLoggedIn())
  return isUserLoggedIn() ? children : <Navigate to={redirectTo} state={{ from }} />
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  redirectTo: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
}

export default ProtectedRoute
