import React from "react"
import PropTypes from "prop-types"
import styles from "./TabBar.module.scss"
import classNames from "classnames"

const TabBar = ({ children, className }) => {
  return <div className={classNames(styles.container, className)}>{children}</div>
}

TabBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default TabBar
