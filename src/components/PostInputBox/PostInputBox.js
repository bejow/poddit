import React from "react"
import styles from "./PostInputBox.module.scss"
import SVGUnknownUserIcon from "../../components/icons/UnknownUserIcon"
import SVGMediaIcon from "../../components/icons/MediaIcon"
import SVGLinkIcon from "../../components/icons/LinkIcon"
import Input from "../../components/Input/Input"
import { CREATE_POST_PLACEHOLDER } from "../../assets/constants/strings"
import Box from "../Box/Box"
import PropTypes from "prop-types"
import classNames from "classnames"

const PostInputBox = ({ className }) => {
  return (
    <Box className={classNames(styles.postInputContainer, className)}>
      <SVGUnknownUserIcon className={styles.unknownUserIcon} />
      <Input className={styles.input} placeholder={CREATE_POST_PLACEHOLDER} />
      <SVGMediaIcon viewBox="0 0 24 24" width={26} height={26} className={styles.icon} />
      <SVGLinkIcon viewBox="0 0 25 25" width={25} height={25} className={styles.linkIcon} />
    </Box>
  )
}

PostInputBox.propTypes = {
  className: PropTypes.string,
}

export default PostInputBox
