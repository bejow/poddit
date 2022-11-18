import React, { useState } from "react"
import styles from "./PostCreate.module.scss"
import Select, { components } from "react-select"
import Box from "../../components/Box/Box"
import "./PostCreate.scss"
import Layout from "../../components/Layout/Layout"
import {
  CREATE_POST_BUTTON_TEXT,
  CREATE_POST_DRAFT_BUTTON_TEXT,
  CREATE_POST_HEADING,
  CREATE_POST_TEXT_PLACEHOLDER,
  INPUT_TITLE_PLACEHOLDER,
  RULES_TITLE_TEXT,
  SEARCHBAR_COMMUNITY_PLACEHOLDER,
  TABBUTTON_IMAGES_VIDEOS,
  TABBUTTON_LINK,
  TABBUTTON_POLL,
  TABBUTTON_POST,
  TABBUTTON_TALK,
} from "../../assets/constants/strings"
import SvgDottedCircle from "../../components/icons/DottedCircle"
import TabButton from "../../components/TabButton/TabButton"
import TabBar from "../../components/TabBar/TabBar"
import TextArea from "../../components/TextArea/TextArea"
import CustomEditor from "../../components/CustomEditor/CustomEditor"
import { EditorState } from "draft-js"
import Button from "../../components/Button/Button"
import RuleBox from "../../components/RuleBox/RuleBox"
import { RULES } from "../../assets/constants/rules"
import SvgMediaIcon from "../../components/icons/MediaIcon"
import SvgLinkIcon from "../../components/icons/LinkIcon"

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
    <Layout
      contentSize="l"
      infoContent={
        <RuleBox className={styles.rulesContainer} title={RULES_TITLE_TEXT} rules={RULES} />
      }
    >
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
      <Box noBorder className={styles.postFormContainer}>
        <TabBar>
          <TabButton active>{TABBUTTON_POST}</TabButton>
          <TabButton disabled>
            <SvgMediaIcon viewBox="0 0 24 24" width={20} height={20} className={styles.icon} />{" "}
            {TABBUTTON_IMAGES_VIDEOS}
          </TabButton>
          <TabButton disabled>
            <SvgLinkIcon className={styles.linkIcon} viewBox="0 0 25 25" width={20} height={20} />
            {TABBUTTON_LINK}
          </TabButton>
          <TabButton disabled>{TABBUTTON_POLL}</TabButton>
          <TabButton disabled>{TABBUTTON_TALK}</TabButton>
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
          <Button className={styles.submitButton} type="primary">
            {CREATE_POST_BUTTON_TEXT}
          </Button>
        </div>
      </Box>
    </Layout>
  )
}

export default PostCreate
