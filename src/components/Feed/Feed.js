import React from "react"
import PropTypes from "prop-types"
import PostBox from "../PostBox/PostBox"
import styles from "./Feed.module.scss"

const Feed = ({ posts }) => {
  console.log(posts)
  return (
    <div className={styles.feedWrapper}>
      {posts.map((post) => {
        return <PostBox clickable key={`postbox-${post.id}`} post={post} />
      })}
    </div>
  )
}

Feed.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
}

export default Feed
