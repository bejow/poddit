import { HeaderBar } from "../HeaderBar/HeaderBar"
import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import styles from "./Layout.module.scss"

const Layout = ({ children, infoContent, contentSize, hideSearchBar, headContent }) => {
  return (
    <div className={styles.layoutWrapper}>
      <HeaderBar hideSearchBar={hideSearchBar} />
      {headContent}
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
  contentSize: PropTypes.oneOf(["s", "m", "l"]),
  children: PropTypes.node.isRequired,
  infoContent: PropTypes.node,
  headContent: PropTypes.node,
  hideSearchBar: PropTypes.bool,
}

export default Layout
