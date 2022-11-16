import React from "react"
import styles from "./Input.module.scss"
import PropTypes from "prop-types"
import classNames from "classnames"

const Input = ({ name, onChange, value, placeholder, className }) => {
  return (
    <input
      className={classNames(className, styles.input)}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  )
}

Input.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default Input
