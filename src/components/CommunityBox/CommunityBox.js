import React from "react"
import PropTypes from "prop-types"
import Box from "../Box/Box"
import styles from "./CommunityBox.module.scss"
import Button from "../Button/Button"
import SVGDefaultCommunity from "../icons/DefaultCommunity"
import { JOINED_COMMUNITY_TEXT, JOIN_COMMUNITY_TEXT } from "../../assets/constants/strings"
import useSubscriptions from "../../utils/hooks/useSubscriptions"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import { MoonLoader } from "react-spinners"

const CommunityBox = ({ community }) => {
  const { info, title, id: communityId } = community
  const { fetchSubscriptions, isSubscribedTo, subscribeTo, unsubscribeFrom } = useSubscriptions()
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const communityTitle = `r/${title}`
  console.log("community", community)
  console.log(isLoading)

  const handleCommunitySubscribe = async () => {
    await runAsyncFunction(async () => await subscribeTo(communityId))
    await runAsyncFunction(fetchSubscriptions)
  }

  const handleCommunityUnsubscribe = async () => {
    await runAsyncFunction(async () => await unsubscribeFrom(communityId))
    await runAsyncFunction(fetchSubscriptions)
  }

  const renderSubscribeButton = () => {
    if (isLoading) {
      return <MoonLoader loading={true} size={15} />
    } else {
      return isSubscribedTo(communityId) ? (
        <Button
          className={styles.joinCommunityButton}
          type="secondary"
          onClick={handleCommunityUnsubscribe}
        >
          {JOINED_COMMUNITY_TEXT}
        </Button>
      ) : (
        <Button
          onClick={handleCommunitySubscribe}
          className={styles.joinCommunityButton}
          type="primary"
        >
          {JOIN_COMMUNITY_TEXT}
        </Button>
      )
    }
  }

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
        {renderSubscribeButton()}
      </div>
    </Box>
  )
}

CommunityBox.propTypes = {
  community: PropTypes.shape({
    info: PropTypes.string,
    title: PropTypes.string,
    id: PropTypes.string,
  }),
}

export default CommunityBox
