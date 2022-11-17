import React from "react"
import styles from "./Box.module.scss"
import PropTypes from "prop-types"
import classNames from "classnames"

export const Box = ({ children, className }) => {
  return <div className={classNames(styles.container, className)}>{children}</div>
}

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

export default Box
