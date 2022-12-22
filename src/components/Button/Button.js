import React from "react"
import PropTypes from "prop-types"
import styles from "./Button.module.scss"
import classNames from "classnames"

const Button = ({ onClick, children, type, className, style }) => {
  return (
    <div
      style={style}
      className={classNames(styles.button, styles[type], className)}
      onClick={type === "disabled" ? undefined : onClick}
    >
      {children}
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.oneOf(["primary", "secondary", "disabled"]),
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Button
