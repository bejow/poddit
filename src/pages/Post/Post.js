import React from "react"
import { useParams } from "react-router-dom"

const Post = () => {
  let { postUrl } = useParams()
  return <div>{postUrl}</div>
}

Post.propTypes = {}

export default Post
