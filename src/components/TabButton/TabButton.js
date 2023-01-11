import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import styles from "./TabButton.module.scss"

const TabButton = ({ onClick, children, className, active, disabled }) => (
  <button
    onClick={onClick}
    className={classNames(styles.button, className, {
      [styles.active]: active,
      [styles.disabled]: disabled,
    })}
  >
    {children}
  </button>
)

TabButton.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  active: PropTypes.bool,
  disabled: PropTypes.bool,
}
export default TabButton
