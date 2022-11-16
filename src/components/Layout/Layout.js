import React from "react"
import { HeaderBar } from "../HeaderBar/HeaderBar"
import PropTypes from "prop-types"
import styles from "./Layout.module.scss"

const Layout = ({ children }) => {
  return (
    <div className={styles.layoutWrapper}>
      <HeaderBar />
      <div className={styles.childrenWrapper}>{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
