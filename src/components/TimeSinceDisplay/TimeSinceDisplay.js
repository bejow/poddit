import { getTimeSinceDateString } from "../../utils/date"
import classNames from "classnames"
import propTypes from "prop-types"
import React from "react"
import styles from "./TimeSinceDisplay.module.scss"

export const TimeSinceDisplay = ({ date, className }) => {
  const text = getTimeSinceDateString(date)
  return <span className={classNames(className, styles.text)}>{text}</span>
}

TimeSinceDisplay.propTypes = {
  date: propTypes.instanceOf(Date),
  className: propTypes.string,
}
