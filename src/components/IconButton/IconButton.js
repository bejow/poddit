import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import styles from "./IconButton.module.scss"

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
