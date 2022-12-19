import classNames from "classnames"
import { EditorState } from "draft-js"
import React, { useState, useEffect } from "react"

import { Link, useParams } from "react-router-dom"
import { MoonLoader } from "react-spinners"
import {
  COMMENT_AS_TEXT,
  COMMENT_BUTTON_TEXT,
  CREATE_COMMENT_PLACEHOLDER,
  PROFILE_ROUTE,
} from "../../assets/constants/strings"
import Button from "../../components/Button/Button"
import CommentList from "../../components/Comments/CommentList"
import CommunityBox from "../../components/CommunityBox/CommunityBox"
import CustomEditor from "../../components/CustomEditor/CustomEditor"
import Layout from "../../components/Layout/Layout"
import PostBox from "../../components/PostBox/PostBox"
import useErrorStore from "../../states/Error"
import { getMetaPost } from "../../utils/api"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import useAuth from "../../utils/hooks/useAuth"
import { getPost, postComment } from "../../utils/rdfHelper"
import { getNameFromWebId } from "../../utils/webId"
import styles from "./Post.module.scss"

const Post = () => {
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  let { postUrl, postId } = useParams()
  const [reload, setReload] = useState(false)
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const { setError } = useErrorStore()

  useEffect(() => {
    try {
      runAsyncFunction(handlePost)
    } catch (error) {
      setError({ message: error.message })
    }
    return () => {}
  }, [reload])
  const { user } = useAuth()
  const [postData, setPostData] = useState({
    identifier: "",
    title: "",
    content: "",
    creator: { webId: "", name: "" },
    comments: [],
    community: { title: "", info: "" },
  })
  const { creator, commentUrl } = postData

  const onCommentSubmit = () => {
    runAsyncFunction(() =>
      postComment(
        user,
        commentUrl,
        editorState.getCurrentContent().getPlainText(),
        postData.identifier,
        () => {
          setEditorState(EditorState.createEmpty())
          setReload(!reload)
        },
      ),
    )
  }

  const getChildCommentsById = (parentIdentifier) => {
    return postData?.comments.filter((comment) => {
      return comment.parentIdentifier === parentIdentifier
    })
  }

  const replyToComment = async (commentIdentifier, text, callback) => {
    const comment = await postComment(user, commentUrl, text, commentIdentifier, callback)

    return comment
  }

  const handlePost = async () => {
    const post = await getPost(postUrl)
    const postMeta = await getMetaPost(postId)
    setPostData({ ...post, ...postMeta })
  }

  const renderCommentButton = () => {
    return isLoading ? (
      <div className={styles.commentButtonSpinner}>
        <MoonLoader loading={true} size={15} />
      </div>
    ) : (
      <Button
        type={isCommentValid ? "primary" : "disabled"}
        onClick={onCommentSubmit}
        className={styles.commentButton}
      >
        {COMMENT_BUTTON_TEXT}
      </Button>
    )
  }

  postUrl = decodeURIComponent(postUrl)
  const userLink = `${PROFILE_ROUTE}/${creator?.webId}`
  const isCommentValid = editorState.getCurrentContent().getPlainText().length > 0 ? true : false

  return (
    <Layout infoContent={<CommunityBox community={postData?.community} />}>
      <PostBox post={postData}>
        <div className={styles.editorContainer}>
          <p className={styles.commentInfo}>
            {`${COMMENT_AS_TEXT}`}
            <Link className={classNames(styles.userLink)} to={userLink}>
              {getNameFromWebId(user.info.webId)}
            </Link>
          </p>
          <CustomEditor
            wrapperClassName={styles.editorWrapper}
            onChange={(editorState) => setEditorState(editorState)}
            editorState={editorState}
            placeholder={CREATE_COMMENT_PLACEHOLDER}
            className={styles.editor}
            toolbarCustomButtons={[renderCommentButton()]}
          />
          <hr className={styles.seperator} />
          <CommentList
            replyToComment={replyToComment}
            getChildCommentsById={getChildCommentsById}
            comments={getChildCommentsById(postData?.identifier)}
            setReload={setReload}
          />
        </div>
      </PostBox>
    </Layout>
  )
}

Post.propTypes = {}

export default Post
