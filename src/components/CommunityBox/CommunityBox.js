import React from "react"
import PropTypes from "prop-types"
import Box from "../Box/Box"
import styles from "./CommunityBox.module.scss"
import Button from "../Button/Button"
import SVGDefaultCommunity from "../icons/DefaultCommunity"
import { JOIN_COMMUNITY_TEXT } from "../../assets/constants/strings"

const CommunityBox = ({ community }) => {
  const { info, title } = community
  const communityTitle = `r/${title}`
  return (
    <Box>
      <div className={styles.header}></div>
      <div className={styles.contentWrapper}>
        <div className={styles.titleContainer}>
          <SVGDefaultCommunity className={styles.communityIcon} />
          <div className={styles.title}>{communityTitle}</div>
        </div>
        <p className={styles.info}>{info}</p>
        <hr className={styles.seperator} />
        <Button className={styles.joinCommunityButton} type="disabled">
          {JOIN_COMMUNITY_TEXT}
        </Button>
      </div>
    </Box>
  )
}

CommunityBox.propTypes = {
  community: PropTypes.shape({
    info: PropTypes.string,
    title: PropTypes.string,
  }),
}

export default CommunityBox
