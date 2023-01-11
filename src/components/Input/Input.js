import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import styles from "./Input.module.scss"

const Input = ({ name, onChange, value, placeholder, className, onClick }) => {
  return (
    <input
      onClick={onClick}
      className={classNames(className, styles.input)}
      name={name}
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  )
}

Input.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
}

export default Input
