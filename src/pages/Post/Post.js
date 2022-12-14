import classNames from "classnames"
import { EditorState } from "draft-js"
import React, { useState, useEffect } from "react"

import { Link, useParams } from "react-router-dom"
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
import { getMetaPost } from "../../utils/api"
import useAuth from "../../utils/hooks/useAuth"
import { getPost, postComment } from "../../utils/rdfHelper"
import { getNameFromWebId } from "../../utils/webId"
import styles from "./Post.module.scss"

const Post = () => {
  let { postUrl, postId } = useParams()
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const { user } = useAuth()
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    creator: { webId: "", name: "" },
    comments: [],
    community: { title: "", info: "" },
  })
  const { creator, commentUrl } = postData

  useEffect(() => {
    handlePost()
    return () => {}
  }, [postUrl])

  const onCommentSubmit = () => {
    postComment(user, commentUrl, editorState.getCurrentContent().getPlainText(), (result) => {
      console.log(result)
    })
  }

  const handlePost = async () => {
    const post = await getPost(postUrl)
    const postMeta = await getMetaPost(postId)
    post.comments[0].childComments = [
      {
        text: "Ick find dit jut so",
        creator: "https://id.inrupt.com/bejowdevv",
        identifier: "#poddit-comment-1670930773550-fe043731-165e-423e-b97e-6e51244ea266",
        dateModified: "2022-12-13T11:26:13.642Z",
      },
      {
        text: "bitte sei authorized!!!",
        creator: "https://id.inrupt.com/bejow",
        identifier: "#poddit-comment-1670931209457-86b48647-6137-420a-976c-e23986e4e5c6",
        dateModified: "2022-12-13T11:33:29.687Z",
      },
    ]
    setPostData({ ...post, ...postMeta })
  }

  const renderCommentButton = () => {
    return (
      <Button
        type={isCommentValid ? "primary" : "disabled"}
        onClick={onCommentSubmit}
        className={styles.commentButton}
      >
        {COMMENT_BUTTON_TEXT}
      </Button>
    )
  }

  console.log(postData)
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
          <CommentList comments={postData.comments} />
        </div>
      </PostBox>
    </Layout>
  )
}

Post.propTypes = {}

export default Post
