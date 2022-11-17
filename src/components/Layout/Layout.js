import React from "react"
import { HeaderBar } from "../HeaderBar/HeaderBar"
import PropTypes from "prop-types"
import styles from "./Layout.module.scss"

const Layout = ({ children, infoContent }) => {
  return (
    <div className={styles.layoutWrapper}>
      <HeaderBar />
      <div className={styles.childrenWrapper}>
        <div className={styles.pageWrapper}>
          <div className={styles.feedWrapper}>{children}</div>
          <div className={styles.infoWrapper}>{infoContent}</div>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  infoContent: PropTypes.node,
}

export default Layout
