import React, { useEffect, useState } from "react"
import styles from "./PostCreate.module.scss"
import Select, { components } from "react-select"
import Box from "../../components/Box/Box"
import "./PostCreate.scss"
import Layout from "../../components/Layout/Layout"
import {
  CREATE_POST_HEADING,
  RULES_TITLE_TEXT,
  SEARCHBAR_COMMUNITY_PLACEHOLDER,
  TABBUTTON_IMAGES_VIDEOS,
  TABBUTTON_LINK,
  TABBUTTON_POLL,
  TABBUTTON_POST,
  TABBUTTON_TALK,
  COMMUNITY_RULES,
} from "../../assets/constants/strings"
import SvgDottedCircle from "../../components/icons/DottedCircle"
import TabButton from "../../components/TabButton/TabButton"
import TabBar from "../../components/TabBar/TabBar"
import RuleBox from "../../components/RuleBox/RuleBox"

import SvgMediaIcon from "../../components/icons/MediaIcon"
import SvgLinkIcon from "../../components/icons/LinkIcon"
import TextPost from "./TextPost"
import { getCommunities } from "../../utils/api"
import useErrorStore from "../../states/Error"
import { useParams } from "react-router-dom"

// const options = [
//   { value: "chocolate", label: "Chocolate" },
//   { value: "strawberry", label: "Strawberry" },
//   { value: "vanilla", label: "Vanilla" },
// ]

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
  const { communityId } = useParams()
  const [selectedOption, setSelectedOption] = useState(null)
  const [currentTab, setCurrentTab] = useState(TABBUTTON_POST)
  const [communityOptions, setCommunityOptions] = useState([])
  const { setError } = useErrorStore()

  console.log(selectedOption)
  console.log(communityId)
  const onSelectedChange = (option) => {
    setSelectedOption(option)
  }

  useEffect(() => {
    getCommunityOptions()
    return () => {}
  }, [])

  const getCommunityOptions = async () => {
    try {
      const communities = await getCommunities()
      const communityOptions = communities.map((community) => {
        return {
          value: community.id,
          label: community.title,
          info: community.info,
          id: community.id,
        }
      })
      setCommunityOptions(communityOptions)
      console.log(communityId)
      if (communityId) {
        console.log("in if")
        console.log(communityOptions)
        console.log(setSelectedOption(communityOptions.find((option) => option.id == communityId)))
        setSelectedOption(communityOptions.find((option) => option.id == communityId))
      }
    } catch (error) {
      setError({ message: error.message })
    }
  }

  const renderTabContent = () => {
    switch (currentTab) {
      case TABBUTTON_POST:
        return <TextPost community={selectedOption} />
      default:
        return null
    }
  }

  return (
    <Layout
      contentSize="l"
      infoContent={
        <RuleBox
          className={styles.rulesContainer}
          title={RULES_TITLE_TEXT}
          rules={COMMUNITY_RULES}
        />
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
          options={communityOptions}
        />
      </div>
      <Box noBorder className={styles.postFormContainer}>
        <TabBar>
          <TabButton onClick={() => setCurrentTab(TABBUTTON_POST)} active>
            {TABBUTTON_POST}
          </TabButton>
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
        {renderTabContent()}
      </Box>
    </Layout>
  )
}

export default PostCreate
