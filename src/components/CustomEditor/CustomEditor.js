import "./CustomEditor.scss"
import React from "react"
import styles from "./CustomEditor.module.scss"
import PropTypes from "prop-types"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { toolbarOptions } from "./toolbarOptions"
const CustomEditor = ({ onChange, editorState, placeholder }) => {
  return (
    <div className={styles.editorContainer}>
      <Editor
        placeholder={placeholder}
        wrapperClassName={styles.wrapper}
        editorClassName={styles.editor}
        toolbarClassName={styles.toolbar}
        toolbar={toolbarOptions}
        editorState={editorState}
        onEditorStateChange={onChange}
      />
    </div>
  )
}

CustomEditor.propTypes = {
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  editorState: PropTypes.object,
}

export default CustomEditor
