import React from "react"
import PropTypes from "prop-types"
import styles from "./IconButton.module.scss"
import classNames from "classnames"

export const IconButton = ({ className, children, onClick }) => {
  return (
    <button onClick={onClick} className={classNames(styles.button, className)}>
      {children}
    </button>
  )
}

IconButton.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
}
