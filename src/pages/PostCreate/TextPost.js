import React, { useState } from "react"
import PropTypes from "prop-types"
import styles from "./PostCreate.module.scss"
import "./PostCreate.scss"
import {
  CREATE_POST_BUTTON_TEXT,
  CREATE_POST_DRAFT_BUTTON_TEXT,
  CREATE_POST_TEXT_PLACEHOLDER,
  INPUT_TITLE_PLACEHOLDER,
} from "../../assets/constants/strings"

import { EditorState } from "draft-js"
import CustomEditor from "../../components/CustomEditor/CustomEditor"
import Button from "../../components/Button/Button"
import TextArea from "../../components/TextArea/TextArea"
import getProfile from "../../utils/profile"
import useAuth from "../../utils/hooks/useAuth"

const TextPost = ({ community }) => {
  const { user } = useAuth()

  const [profile, setProfile] = useState({})
  console.log(user)
  getProfile(user.info.webId, (profile) => {
    setProfile(profile)
  })
  console.log(community)
  console.log(profile)

  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const [postState, setPostState] = useState({ title: "" })
  return (
    <div>
      <div className={styles.inputContainer}>
        <div className={styles.textAreaWrapper}>
          <TextArea
            onChange={(event) => setPostState({ ...postState, title: event.target.value })}
            displayWordCount
            rows={1}
            maxLength={300}
            placeholder={INPUT_TITLE_PLACEHOLDER}
            value={postState.title}
            className={styles.titleInput}
          />
        </div>
        <CustomEditor
          onChange={(editorState) => setEditorState(editorState)}
          editorState={editorState}
          placeholder={CREATE_POST_TEXT_PLACEHOLDER}
        />
        <p>{profile.name ? profile.name : "nope"}</p>
      </div>
      <div className={styles.submitButtonContainer}>
        <Button className={styles.submitButton} type="disabled">
          {CREATE_POST_DRAFT_BUTTON_TEXT}
        </Button>
        <Button className={styles.submitButton} type="primary">
          {CREATE_POST_BUTTON_TEXT}
        </Button>
      </div>
    </div>
  )
}

TextPost.propTypes = {
  community: PropTypes.string,
}

export default TextPost
