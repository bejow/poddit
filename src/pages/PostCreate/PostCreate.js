import React, { useState } from "react"
import styles from "./PostCreate.module.scss"
import Select, { components } from "react-select"
import Box from "../../components/Box/Box"
import "./PostCreate.scss"
import Layout from "../../components/Layout/Layout"
import {
  CREATE_POST_HEADING,
  CREATE_POST_TEXT_PLACEHOLDER,
  INPUT_TITLE_PLACEHOLDER,
  SEARCHBAR_COMMUNITY_PLACEHOLDER,
} from "../../assets/constants/strings"
import SvgDottedCircle from "../../components/icons/DottedCircle"
import TabButton from "../../components/TabButton/TabButton"
import TabBar from "../../components/TabBar/TabBar"
import TextArea from "../../components/TextArea/TextArea"
import CustomEditor from "../../components/CustomEditor/CustomEditor"
import { EditorState } from "draft-js"

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
]

const customComponents = {
  IndicatorSeperator: () => null,
  // eslint-disable-next-line react/prop-types
  Control: ({ children, ...props }) => {
    return (
      <components.Control {...props}>
        <SvgDottedCircle
          className={styles.communityIcon}
          height="25px"
          width="25px"
          viewBox="0 0 30 30"
        />
        {children}
      </components.Control>
    )
  },
}

const PostCreate = () => {
  const [selectedOption, setSelectedOption] = useState(null)
  const [title, setTitle] = useState("")
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty())

  const onSelectedChange = (option) => {
    setSelectedOption(option)
  }
  return (
    <Layout>
      <div className={styles.headingContainer}>
        <div className={styles.heading}>{CREATE_POST_HEADING}</div>
      </div>
      <div className={styles.wrapper}>
        <Select
          classNamePrefix="community"
          placeholder={SEARCHBAR_COMMUNITY_PLACEHOLDER}
          components={customComponents}
          value={selectedOption}
          onChange={onSelectedChange}
          options={options}
        />
      </div>
      <Box className={styles.postFormContainer}>
        <TabBar>
          <TabButton active>Test</TabButton>
          <TabButton>Test</TabButton>
          <TabButton disabled>Test</TabButton>
          <TabButton>Test</TabButton>
        </TabBar>
        <div className={styles.inputContainer}>
          <div className={styles.textAreaWrapper}>
            <TextArea
              onChange={(event) => setTitle(event.target.value)}
              displayWordCount
              rows={1}
              maxLength={300}
              placeholder={INPUT_TITLE_PLACEHOLDER}
              value={title}
            />
          </div>
          <CustomEditor
            onChange={(editorState) => setEditorState(editorState)}
            editorState={editorState}
            placeholder={CREATE_POST_TEXT_PLACEHOLDER}
          />
        </div>
      </Box>
    </Layout>
  )
}

export default PostCreate
