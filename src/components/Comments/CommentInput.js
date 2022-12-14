import React, { useState } from "react"
import PropTypes from "prop-types"
import styles from "./Comment.module.scss"

const CommentInput = ({ onSubmit, autoFocus, loading, error }) => {
  console.log(onSubmit)
  const [comment, setComment] = useState("")
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(comment).then(() => setComment(""))
  }
  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.commentFormRow}>
        <textarea
          autoFocus={autoFocus}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className={styles.commentInput}
        />
        <button className={styles.button} type="submit" disabled={loading}>
          {loading ? "Loading..." : "Post"}
        </button>
      </div>
      <div className={styles.errorText}>{error}</div>
    </form>
  )
}

CommentInput.propTypes = {
  onSubmit: PropTypes.func,
  autoFocus: PropTypes.bool,
  loading: PropTypes.bool,
  error: PropTypes.string,
}

export default CommentInput
