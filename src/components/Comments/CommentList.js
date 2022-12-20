import React from "react"
import PropTypes from "prop-types"
import Comment from "./Comment"
import styles from "./Comment.module.scss"

const CommentList = ({ comments, getChildCommentsById, replyToComment, setReload }) => {
  return comments.map((comment) => {
    return (
      <div className={styles.commentsContainer} key={comment.identifier}>
        <Comment
          {...comment}
          getChildCommentsById={getChildCommentsById}
          replyToComment={replyToComment}
          setReload={setReload}
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
  setReload: PropTypes.func,
}

export default CommentList
