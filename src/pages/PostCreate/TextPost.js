import {
  CREATE_POST_BUTTON_TEXT,
  CREATE_POST_DRAFT_BUTTON_TEXT,
  CREATE_POST_TEXT_PLACEHOLDER,
  INPUT_TITLE_PLACEHOLDER,
} from "../../assets/constants/strings"
import "./PostCreate.scss"
import { EditorState } from "draft-js"
import { postTextToCommunity } from "../../utils/rdfHelper"
import { useNavigate } from "react-router-dom"
import Button from "../../components/Button/Button"
import CustomEditor from "../../components/CustomEditor/CustomEditor"
import MoonLoader from "react-spinners/MoonLoader"
import paths from "../../routing/routePaths"
import PropTypes from "prop-types"
import React, { useState } from "react"
import styles from "./PostCreate.module.scss"
import TextArea from "../../components/TextArea/TextArea"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import useAuth from "../../utils/hooks/useAuth"
import useErrorStore from "../../states/Error"

const TextPost = ({ community }) => {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
  const [postState, setPostState] = useState({ title: "" })
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const { setError } = useErrorStore()
  const { user } = useAuth()
  const navigate = useNavigate()

  // check if: community selected, post-title present, post-content present
  const isPostValid =
    community !== null &&
    editorState.getCurrentContent().getPlainText().length > 0 &&
    postState.title.length > 0

  const onSubmit = () => {
    if (isPostValid) {
      try {
        runAsyncFunction(() =>
          postTextToCommunity(
            user,
            community,
            postState.title,
            editorState.getCurrentContent().getPlainText(),
            () => navigate(paths.main),
          ),
        )
      } catch (error) {
        setError({ message: error.message })
      }
    }
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
          <MoonLoader className={styles.spinner} loading={true} size={23} />
        ) : (
          <Button
            className={styles.submitButton}
            onClick={onSubmit}
            type={isPostValid ? "primary" : "disabled"}
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
