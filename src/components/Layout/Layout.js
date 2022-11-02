import React from "react"
import { HeaderBar } from "../HeaderBar/HeaderBar"
import PropTypes from "prop-types"

export const Layout = ({ children }) => {
  return (
    <div>
      <HeaderBar />
      {children}
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
