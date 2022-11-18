import React from "react"
import PropTypes from "prop-types"
import styles from "./Button.module.scss"
import classNames from "classnames"

const Button = ({ onClick, children, type }) => {
  return (
    <div className={classNames(styles.button, styles[type])} onClick={onClick}>
      {children}
    </div>
  )
}

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  type: PropTypes.oneOf(["primary", "secondary", "disabled"]),
}

export default Button
