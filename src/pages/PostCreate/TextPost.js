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
import useAuth from "../../utils/hooks/useAuth"
import { postText } from "../../utils/rdfHelper"
import { publishPostToCommunity } from "../../utils/api"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import MoonLoader from "react-spinners/MoonLoader"
import { useNavigate } from "react-router-dom"
import paths from "../../routing/routePaths"

const TextPost = ({ community }) => {
  const { user } = useAuth()
  console.log("User:", user)
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const [postState, setPostState] = useState({ title: "" })
  const navigate = useNavigate()
  const { runAsyncFunction, isLoading } = useAsyncLoading()

  const onSubmit = () => {
    runAsyncFunction(() =>
      postText(
        user,
        {
          community,
          title: postState.title,
          content: editorState.getCurrentContent().getPlainText(),
        },
        (result) => {
          const createdSolidPostDataset = result[0]
          publishPostToCommunity(
            createdSolidPostDataset.internal_resourceInfo.sourceIri,
            community.id,
          )
          navigate(paths.main)
        },
      ),
    )
  }

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
      </div>
      <div className={styles.submitButtonContainer}>
        <Button className={styles.submitButton} type="disabled">
          {CREATE_POST_DRAFT_BUTTON_TEXT}
        </Button>
        {isLoading ? (
          <MoonLoader className={styles.spinner} loading={isLoading} size={23} />
        ) : (
          <Button
            className={styles.submitButton}
            onClick={onSubmit}
            type={community !== null ? "primary" : "disabled"}
          >
            {CREATE_POST_BUTTON_TEXT}
          </Button>
        )}
      </div>
    </div>
  )
}

TextPost.propTypes = {
  community: PropTypes.shape({
    info: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.number,
  }),
}

export default TextPost
