import {
  COMMENT_AS_TEXT,
  COMMENT_BUTTON_TEXT,
  CREATE_COMMENT_PLACEHOLDER,
  PROFILE_ROUTE,
} from "../../assets/constants/strings"
import { EditorState } from "draft-js"
import { getMetaPost } from "../../utils/api"
import { getNameFromWebId } from "../../utils/webId"
import { getPost, postComment } from "../../utils/rdfHelper"
import { Link, useParams } from "react-router-dom"
import { MoonLoader } from "react-spinners"
import Button from "../../components/Button/Button"
import classNames from "classnames"
import CommentList from "../../components/Comments/CommentList"
import CommunityBox from "../../components/CommunityBox/CommunityBox"
import CustomEditor from "../../components/CustomEditor/CustomEditor"
import Layout from "../../components/Layout/Layout"
import PostBox from "../../components/PostBox/PostBox"
import React, { useState, useEffect } from "react"
import styles from "./Post.module.scss"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import useAuth from "../../utils/hooks/useAuth"
import useErrorStore from "../../states/Error"

const Post = () => {
  const [postData, setPostData] = useState({
    identifier: "",
    title: "",
    content: "",
    creator: { webId: "", name: "" },
    comments: [],
    community: { title: "", info: "", id: "" },
  })
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const [reload, setReload] = useState(false)
  const { creator, commentUrl } = postData
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const { setError } = useErrorStore()
  const { user } = useAuth()
  const isCommentValid = editorState.getCurrentContent().getPlainText().length > 0 ? true : false
  const userLink = `${PROFILE_ROUTE}/${creator?.webId}`
  let { postUrl, postId } = useParams()
  postUrl = decodeURIComponent(postUrl)

  useEffect(() => {
    try {
      runAsyncFunction(handlePost)
    } catch (error) {
      setError({ message: error.message })
    }
    return () => {}
  }, [reload])

  const onCommentSubmit = () => {
    runAsyncFunction(async () =>
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

  return (
    <Layout infoContent={isLoading ? null : <CommunityBox community={postData?.community} />}>
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

export default Post
