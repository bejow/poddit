import classNames from "classnames"
import React, { useState } from "react"
import styles from "./TextArea.module.scss"
import PropTypes from "prop-types"

const TextArea = ({
  maxLength,
  onChange,
  value,
  name,
  className,
  placeholder,
  rows,
  displayWordCount,
}) => {
  const matchTextareaHeightToContent = (e) => {
    e.target.style.height = "inherit"
    e.target.style.height = `${e.target.scrollHeight}px`
  }

  const [charCount, setCharCount] = useState(0)

  const handleChange = (event) => {
    setCharCount(event.target.value.length)
    onChange(event)
  }

  return (
    <div className={styles.wrapper}>
      <textarea
        onKeyDown={matchTextareaHeightToContent}
        placeholder={placeholder}
        value={value}
        name={name}
        maxLength={maxLength}
        onChange={handleChange}
        className={classNames(styles.textArea, className, {
          [styles.wordcountMargin]: displayWordCount,
        })}
        rows={rows}
      />
      {displayWordCount ? (
        <div className={styles.charCount}>
          {charCount}/{maxLength}
        </div>
      ) : null}
    </div>
  )
}

TextArea.propTypes = {
  maxLength: PropTypes.number,
  onChange: PropTypes.func,
  value: PropTypes.string,
  name: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
  displayWordCount: PropTypes.bool,
}

export default TextArea
