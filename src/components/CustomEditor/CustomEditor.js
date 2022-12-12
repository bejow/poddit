import "./CustomEditor.scss"
import React from "react"
import styles from "./CustomEditor.module.scss"
import PropTypes from "prop-types"
import { Editor } from "react-draft-wysiwyg"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"
import { toolbarOptions } from "./toolbarOptions"
import { toolbarOptionsMobile } from "./toolbarOptionsMobile"
import { toolbarOptionsSmallMobile } from "./toolbarOptionsSmallMobile"
import classNames from "classnames"
import useIsMobile from "../../utils/hooks/useIsMobile"
import useIsSmallMobile from "../../utils/hooks/useIsSmallMobile"

const CustomEditor = ({
  onChange,
  editorState,
  placeholder,
  className,
  wrapperClassName,
  toolbarCustomButtons,
}) => {
  const { isMobile } = useIsMobile()
  const { isSmallMobile } = useIsSmallMobile()
  const selectResponsiveToolbarOptions = () => {
    if (isSmallMobile) {
      return toolbarOptionsSmallMobile
    } else if (isMobile) {
      return toolbarOptionsMobile
    } else {
      return toolbarOptions
    }
  }

  return (
    <div className={classNames(styles.editorContainer, className)}>
      <Editor
        placeholder={placeholder}
        wrapperClassName={classNames(styles.wrapper, wrapperClassName)}
        editorClassName={styles.editor}
        toolbarClassName={styles.toolbar}
        toolbar={selectResponsiveToolbarOptions()}
        editorState={editorState}
        onEditorStateChange={onChange}
        toolbarCustomButtons={toolbarCustomButtons}
      />
    </div>
  )
}

CustomEditor.propTypes = {
  wrapperClassName: PropTypes.func,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  editorState: PropTypes.object,
  className: PropTypes.string,
  toolbarCustomButtons: PropTypes.node,
}

export default CustomEditor
