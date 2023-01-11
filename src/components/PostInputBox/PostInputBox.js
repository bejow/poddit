import { CREATE_POST_PLACEHOLDER } from "../../assets/constants/strings"
import { Link, useNavigate } from "react-router-dom"
import Box from "../Box/Box"
import classNames from "classnames"
import Input from "../../components/Input/Input"
import paths from "../../routing/routePaths"
import PropTypes from "prop-types"
import React from "react"
import styles from "./PostInputBox.module.scss"
import SVGLinkIcon from "../../components/icons/LinkIcon"
import SVGMediaIcon from "../../components/icons/MediaIcon"
import SVGUnknownUserIcon from "../../components/icons/UnknownUserIcon"

const PostInputBox = ({ className, communityId }) => {
  const navigate = useNavigate()

  return (
    <Box
      onClick={() => navigate(`${paths.postCreate}${communityId ? `/${communityId}` : ""}`)}
      className={classNames(styles.postInputContainer, className)}
    >
      <Link to={paths.ownProfile}>
        <SVGUnknownUserIcon className={styles.unknownUserIcon} />
      </Link>
      <Input
        onClick={() => navigate(paths.postCreate)}
        className={styles.input}
        placeholder={CREATE_POST_PLACEHOLDER}
      />
      <SVGMediaIcon
        onClick={() => navigate(paths.postCreate)}
        viewBox="0 0 24 24"
        width={26}
        height={26}
        className={styles.icon}
      />
      <SVGLinkIcon
        onClick={() => navigate(paths.postCreate)}
        viewBox="0 0 25 25"
        width={25}
        height={25}
        className={styles.linkIcon}
      />
    </Box>
  )
}

PostInputBox.propTypes = {
  className: PropTypes.string,
  communityId: PropTypes.number,
}

export default PostInputBox
