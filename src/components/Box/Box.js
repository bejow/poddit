import React from "react"
import styles from "./Box.module.scss"
import PropTypes from "prop-types"
import classNames from "classnames"

export const Box = ({ children, className, noBorder, onClick }) => {
  return (
    <div
      className={classNames(styles.container, className, { [styles.noBorder]: noBorder })}
      onClick={onClick}
    >
      {children}
    </div>
  )
}

Box.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node,
  className: PropTypes.string,
  noBorder: PropTypes.bool,
}

export default Box
