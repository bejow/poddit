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
import "./PostCreate.scss"
import { getCommunities } from "../../utils/api"
import { useParams } from "react-router-dom"
import Box from "../../components/Box/Box"
import Layout from "../../components/Layout/Layout"
import React, { useEffect, useState } from "react"
import RuleBox from "../../components/RuleBox/RuleBox"
import Select, { components } from "react-select"
import styles from "./PostCreate.module.scss"
import SvgDottedCircle from "../../components/icons/DottedCircle"
import SvgLinkIcon from "../../components/icons/LinkIcon"
import SvgMediaIcon from "../../components/icons/MediaIcon"
import TabBar from "../../components/TabBar/TabBar"
import TabButton from "../../components/TabButton/TabButton"
import TextPost from "./TextPost"
import useErrorStore from "../../states/Error"

// static definition for <Select/> custom component
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
  const [communityOptions, setCommunityOptions] = useState([])
  const [currentTab, setCurrentTab] = useState(TABBUTTON_POST)
  const [selectedOption, setSelectedOption] = useState(null)
  const { communityId } = useParams()
  const { setError } = useErrorStore()

  useEffect(() => {
    getCommunityOptions()
    return () => {}
  }, [])

  const onSelectedChange = (option) => {
    setSelectedOption(option)
  }

  const getCommunityOptions = async () => {
    try {
      const communities = await getCommunities()
      // prepare communities for <Select/>
      const communityOptions = communities.map((community) => {
        return {
          value: community.id,
          label: community.title,
          info: community.info,
          id: community.id,
        }
      })
      setCommunityOptions(communityOptions)

      // preselect community if user comes from specific community
      if (communityId) {
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
