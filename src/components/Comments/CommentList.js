import React from "react"
import PropTypes from "prop-types"
import Comment from "./Comment"
import styles from "./Comment.module.scss"

const CommentList = ({ comments, className }) => {
  console.log(className, comments)

  return comments.map((comment) => {
    return (
      <div className={styles.commentsContainer} key={comment.identifier}>
        <Comment {...comment} />
      </div>
    )
  })
}

CommentList.propTypes = {
  comments: PropTypes.array,
  className: PropTypes.string,
}

export default CommentList
