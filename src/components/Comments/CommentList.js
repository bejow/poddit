import React from "react"
import PropTypes from "prop-types"
import Comment from "./Comment"
import styles from "./Comment.module.scss"

const CommentList = ({ comments, className, getChildCommentsById, replyToComment }) => {
  console.log(className, comments)

  return comments.map((comment) => {
    return (
      <div className={styles.commentsContainer} key={comment.identifier}>
        {console.log(comment)}
        <Comment
          {...comment}
          getChildCommentsById={getChildCommentsById}
          replyToComment={replyToComment}
        />
      </div>
    )
  })
}

CommentList.propTypes = {
  comments: PropTypes.array,
  className: PropTypes.string,
  getChildCommentsById: PropTypes.func,
  replyToComment: PropTypes.func,
}

export default CommentList
