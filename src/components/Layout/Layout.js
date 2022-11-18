import React from "react"
import { HeaderBar } from "../HeaderBar/HeaderBar"
import PropTypes from "prop-types"
import styles from "./Layout.module.scss"
import classNames from "classnames"

const Layout = ({ children, infoContent, contentSize }) => {
  return (
    <div className={styles.layoutWrapper}>
      <HeaderBar />
      <div className={styles.childrenWrapper}>
        <div className={classNames(styles.pageWrapper, styles[contentSize])}>
          <div className={styles.feedWrapper}>{children}</div>
          <div className={styles.infoWrapper}>{infoContent}</div>
        </div>
      </div>
    </div>
  )
}

Layout.propTypes = {
  contentSize: PropTypes.oneOf("s", "m", "l"),
  children: PropTypes.node.isRequired,
  infoContent: PropTypes.node,
}

export default Layout
