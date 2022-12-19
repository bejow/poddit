import React, { useState } from "react"
import PropTypes from "prop-types"
import styles from "./Comment.module.scss"
import { IconButton } from "../IconButton/IconButton"
import useAuth from "../../utils/hooks/useAuth"
import classNames from "classnames"
import CommentList from "./CommentList"
import { getNameFromWebId } from "../../utils/webId"
import SVGExpand from "../icons/Expand"
import { getTimeSinceDateString } from "../../utils/date"
import SvgArrowUp from "../icons/ArrowUp"
import {
  COMMENT_BUTTON_TEXT,
  CREATE_COMMENT_PLACEHOLDER,
  DOT_TEXT,
} from "../../assets/constants/strings"
import CustomEditor from "../CustomEditor/CustomEditor"
import { ContentState, EditorState } from "draft-js"
import Button from "../Button/Button"
import SvgUnknownUserIcon from "../icons/UnknownUserIcon"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import MoonLoader from "react-spinners/MoonLoader"
import useErrorStore from "../../states/Error"

const Comment = ({
  identifier,
  text,
  creator,
  dateModified,
  getChildCommentsById,
  replyToComment,
  setReload,
}) => {
  const VOTECOUNT = 1
  const [editEditorState, setEditEditorState] = React.useState(
    EditorState.createWithContent(ContentState.createFromText(text)),
  )
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const [isEditting, setIsEditting] = useState(false)
  const [isReplaying, setIsReplaying] = useState(false)
  const { user: currentUser } = useAuth()
  const [areChildrenHidden, setAreChildrenHidden] = useState(false)
  const isCommentValid = editorState.getCurrentContent().getPlainText().length > 0 ? true : false
  const isEditValid = editEditorState.getCurrentContent().getPlainText().length > 0 ? true : false
  const { setError } = useErrorStore()

  const childComments = getChildCommentsById(identifier)

  const onCommentUpdate = (commentText) => {
    console.log(commentText)
  }

  const onCommentReply = async () => {
    try {
      runAsyncFunction(() =>
        replyToComment(identifier, editorState.getCurrentContent().getPlainText(), () => {
          setIsReplaying(false)
          setEditEditorState(EditorState.createEmpty())
          setReload((prev) => !prev)
        }),
      )
    } catch (error) {
      setError({ message: error.message })
    }
  }

  // const onDeleteComment = () => {}

  const onCommentLike = (isLike) => {
    console.log(isLike)
  }

  const renderReplyButton = () => {
    return isLoading ? (
      <div className={styles.commentButtonSpinner}>
        <MoonLoader loading={true} size={15} />
      </div>
    ) : (
      <Button
        type={isCommentValid ? "primary" : "disabled"}
        onClick={onCommentReply}
        className={styles.commentButton}
      >
        {COMMENT_BUTTON_TEXT}
      </Button>
    )
  }

  const renderEditButton = () => {
    return (
      <Button
        type={isEditValid ? "primary" : "disabled"}
        onClick={onCommentUpdate}
        className={styles.commentButton}
      >
        {COMMENT_BUTTON_TEXT}
      </Button>
    )
  }

  const renderEditContainer = () => {
    return isEditting ? (
      <CustomEditor
        wrapperClassName={styles.editorWrapper}
        onChange={(editEditorState) => setEditEditorState(editEditorState)}
        editorState={editEditorState}
        placeholder={CREATE_COMMENT_PLACEHOLDER}
        className={classNames(styles.editor, { [styles.hide]: areChildrenHidden })}
        toolbarCustomButtons={[renderEditButton()]}
      />
    ) : (
      <div className={classNames(styles.commentMessage, { [styles.hide]: areChildrenHidden })}>
        {text}
      </div>
    )
  }

  return (
    <div className={styles.commentWrapper}>
      <div className={styles.collapseContainer}>
        <div className={styles.collapseButtonContainer}>
          {
            <IconButton
              className={classNames(styles.expandButton, { [styles.hide]: !areChildrenHidden })}
              onClick={() => setAreChildrenHidden(false)}
            >
              <SVGExpand className={styles.expandIcon} />
            </IconButton>
          }
          <SvgUnknownUserIcon className={styles.unknownUserIcon} />
        </div>
        <button
          className={styles.collapseLine}
          aria-label="Hide Replies"
          onClick={() => setAreChildrenHidden(true)}
        />
      </div>
      <div className={styles.grow}>
        <div className={styles.comment}>
          <div className={styles.commentHeader}>
            <span className={styles.usernameText}>{getNameFromWebId(creator)}</span>
            <span className={styles.dot}>{DOT_TEXT}</span>
            <span className={styles.dateText}>
              {getTimeSinceDateString(new Date(dateModified))}
            </span>
          </div>

          {renderEditContainer()}
          <div className={classNames(styles.commentFooter, { [styles.hide]: areChildrenHidden })}>
            <div className={styles.voteContainer}>
              <SvgArrowUp
                viewBox="0 0 28 28"
                width="20px"
                height="20px"
                className={styles.voteIcon}
                onClick={() => onCommentLike(true)}
              />
              <div className={styles.voteText}>{VOTECOUNT}</div>
              <SvgArrowUp
                viewBox="0 0 28 28"
                width="20px"
                height="20px"
                className={classNames(styles.downvoteIcon, styles.voteIcon)}
                onClick={() => onCommentLike(false)}
              />
            </div>
            <IconButton onClick={() => setIsReplaying((prev) => !prev)}>Reply</IconButton>

            {creator === currentUser.info.webId && (
              <>
                <IconButton
                  className={styles.deactivated}
                  onClick={() => setIsEditting((prev) => !prev)}
                >
                  {isEditting ? "Cancel Edit" : "Edit"}
                </IconButton>
                <IconButton
                  className={styles.deactivated}
                  /* onClick={onDeleteComment} */
                >
                  DEL
                </IconButton>
              </>
            )}
          </div>
        </div>
        {isReplaying && (
          <div className={classNames(styles.mt1, styles.ml3)}>
            <CustomEditor
              wrapperClassName={styles.editorWrapper}
              onChange={(editorState) => setEditorState(editorState)}
              editorState={editorState}
              placeholder={CREATE_COMMENT_PLACEHOLDER}
              className={classNames(styles.editor, { [styles.hide]: areChildrenHidden })}
              toolbarCustomButtons={[renderReplyButton()]}
            />
          </div>
        )}
        {childComments?.length > 0 && (
          <>
            <div
              className={classNames(styles.nestedCommentsContainer, {
                [styles.hide]: areChildrenHidden,
              })}
            >
              <div className={styles.nestedComments}>
                <CommentList
                  replyToComment={replyToComment}
                  getChildCommentsById={getChildCommentsById}
                  comments={childComments}
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

Comment.propTypes = {
  comment: PropTypes.object,
  text: PropTypes.string,
  creator: PropTypes.string,
  likeCount: PropTypes.number,
  likedByMe: PropTypes.bool,
  id: PropTypes.string,
  dateModified: PropTypes.string,
  getChildCommentsById: PropTypes.func,
  replyToComment: PropTypes.func,
  identifier: PropTypes.string,
  parentIdentifier: PropTypes.string,
  setReload: PropTypes.func,
}

export default Comment
