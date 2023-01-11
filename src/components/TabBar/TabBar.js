import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import styles from "./TabBar.module.scss"

const TabBar = ({ children, className }) => {
  return <div className={classNames(styles.container, className)}>{children}</div>
}

TabBar.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

export default TabBar
