import React, { memo } from "react"
import PropTypes from "prop-types"
import PostBox from "../PostBox/PostBox"
import styles from "./Feed.module.scss"
import useAuth from "../../utils/hooks/useAuth"

const Feed = ({ posts, redirectToLogin }) => {
  const { login } = useAuth()
  return (
    <div onClick={redirectToLogin ? () => login() : undefined} className={styles.feedWrapper}>
      {posts.map((post) => {
        return <PostBox clickable={!redirectToLogin} key={`postbox-${post.id}`} post={post} />
      })}
    </div>
  )
}

Feed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  redirectToLogin: PropTypes.bool,
}

export default memo(Feed)
