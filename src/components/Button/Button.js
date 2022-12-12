import React from "react"
import PropTypes from "prop-types"
import styles from "./Button.module.scss"
import classNames from "classnames"

const Button = ({ onClick, children, type, className }) => {
  return (
    <div className={classNames(styles.button, styles[type], className)} onClick={onClick}>
      {children}
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.oneOf(["primary", "secondary", "disabled"]),
  className: PropTypes.string,
}

export default Button
