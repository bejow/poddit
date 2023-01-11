import Box from "../Box/Box"
import classNames from "classnames"
import PropTypes from "prop-types"
import React from "react"
import styles from "./RuleBox.module.scss"

const RuleBox = ({ rules, title, className }) => {
  return (
    <Box noBorder className={classNames(styles.rulesContainer, className)}>
      <div className={styles.titleContainer}>{title}</div>
      <ol className={styles.list}>
        {rules.map((rule, index) => (
          <li key={`rule#${index}-${rule}`} className={styles.rule}>
            {rule}
          </li>
        ))}
      </ol>
    </Box>
  )
}

RuleBox.propTypes = {
  rules: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  className: PropTypes.string,
}

export default RuleBox
