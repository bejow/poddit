import React from "react"
import PropTypes from "prop-types"
import PostBox from "../PostBox/PostBox"
import styles from "./Feed.module.scss"

const Feed = ({ posts }) => {
  console.log(posts)
  return (
    <div className={styles.feedWrapper}>
      <PostBox>Unauthed Feed</PostBox>
      <PostBox>Unauthed Feed</PostBox>
      <PostBox>Unauthed Feed</PostBox>
      <PostBox>Unauthed Feed</PostBox>
      <PostBox>Unauthed Feed</PostBox>
      <PostBox>Unauthed Feed</PostBox>
      <PostBox>Unauthed Feed</PostBox>
      <PostBox>Unauthed Feed</PostBox>
      <PostBox>Unauthed Feed</PostBox>
    </div>
  )
}

Feed.propTypes = {
  posts: PropTypes.object,
}

export default Feed
