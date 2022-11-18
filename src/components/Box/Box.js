import React from "react"
import styles from "./Box.module.scss"
import PropTypes from "prop-types"
import classNames from "classnames"

export const Box = ({ children, className, noBorder }) => {
  return (
    <div className={classNames(styles.container, className, { [styles.noBorder]: noBorder })}>
      {children}
    </div>
  )
}

Box.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  noBorder: PropTypes.bool,
}

export default Box
