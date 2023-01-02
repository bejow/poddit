import React, { useEffect, useState } from "react"
// import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
import Layout from "../../components/Layout/Layout"
import useErrorStore from "../../states/Error"
import { getCommunity, getPostsFromCommunity } from "../../utils/api"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import styles from "./Community.module.scss"
import MoonLoader from "react-spinners/MoonLoader"
import PostBox from "../../components/PostBox/PostBox"
import SVGDefaultCommunity from "../../components/icons/DefaultCommunity"
import Button from "../../components/Button/Button"
import {
  ABOUT_COMMUNITY_TEXT,
  CREATED_TEXT,
  JOINED_COMMUNITY_TEXT,
  JOIN_COMMUNITY_TEXT,
  POSTS_TEXT,
  POST_TEXT,
} from "../../assets/constants/strings"
import { hashStringToColor } from "../../utils/colorHash"
import styleConstants from "../../styles/constants.scss"
import Box from "../../components/Box/Box"
import SVGCake from "../../components/icons/Cake"
import PostInputBox from "../../components/PostInputBox/PostInputBox"
import useAuth from "../../utils/hooks/useAuth"
import useSubscriptions from "../../utils/hooks/useSubscriptions"
const Community = () => {
  let { communityId } = useParams()
  const { setError } = useErrorStore()
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const [communityPosts, setCommunityPosts] = useState([])
  const [community, setCommunity] = useState({})
  const communityTitle = `r/${community?.title}`
  const { user } = useAuth()
  const [baseColorForCommunity, setBaseColorForCommunity] = useState(styleConstants.blue)
  const { fetchSubscriptions, isSubscribedTo, subscriptions, subscribeTo, unsubscribeFrom } =
    useSubscriptions(user)
  console.log(subscriptions)
  useEffect(() => {
    try {
      runAsyncFunction(handleCommunityPosts)
      runAsyncFunction(handleCommunity)
    } catch (error) {
      setError({ message: error.message })
    }
    return () => {}
  }, [communityId])

  const handleCommunityPosts = async () => {
    const posts = await getPostsFromCommunity(communityId)
    setCommunityPosts(posts)
  }

  const handleCommunity = async () => {
    const community = await getCommunity(communityId)
    setCommunity(community)
    setBaseColorForCommunity(hashStringToColor(community.title))
  }

  const handleCommunitySubscribe = async () => {
    await runAsyncFunction(async () => await subscribeTo(communityId))
    runAsyncFunction(fetchSubscriptions)
  }

  const handleCommunityUnsubscribe = async () => {
    await runAsyncFunction(async () => await unsubscribeFrom(communityId))
    runAsyncFunction(fetchSubscriptions)
  }

  const displayDate = (dateISOString) => {
    const date = new Date(dateISOString)
    var options = { year: "numeric", month: "short", day: "numeric" }
    return date.toLocaleDateString("en-US", options)
  }

  const renderCommunityInfo = () => {
    return (
      <Box>
        <h3 style={{ backgroundColor: baseColorForCommunity }} className={styles.infoTitle}>
          {ABOUT_COMMUNITY_TEXT}
        </h3>
        <div className={styles.infoPadding}>
          <p className={styles.infoText}>{community.info}</p>
          <div className={styles.createdAtContainer}>
            <SVGCake className={styles.cakeIcon} />
            <p className={styles.communityDate}>
              {CREATED_TEXT} {displayDate(community?.createdAt)}
            </p>
          </div>
          <hr className={styles.horizontalLine} />
          <div className={styles.statContainer}>
            <div className={styles.statEntryContainer}>
              <p className={styles.postAmountValue}>{communityPosts.length}</p>
              <p className={styles.postAmountDescription}>
                {communityPosts.length === 1 ? POST_TEXT : POSTS_TEXT}
              </p>
            </div>
          </div>
        </div>
      </Box>
    )
  }

  const renderCommunityHead = () => {
    return (
      <div className={styles.headWrapper}>
        <div
          style={{ backgroundColor: baseColorForCommunity }}
          className={styles.topColorContainer}
        ></div>
        <div className={styles.bottomColor}>
          <div className={styles.bottomColorContainer}>
            <div className={styles.communityHeadContainer}>
              <SVGDefaultCommunity
                fill={baseColorForCommunity}
                path={baseColorForCommunity}
                className={styles.communityIcon}
              />
              <div className={styles.headInfoContainer}>
                <div className={styles.titleWrapper}>
                  <h1 className={styles.communityTitle}>{community.title}</h1>
                  <Button
                    onClick={
                      isSubscribedTo(communityId)
                        ? handleCommunityUnsubscribe
                        : handleCommunitySubscribe
                    }
                    style={{
                      backgroundColor: baseColorForCommunity,
                      borderColor: baseColorForCommunity,
                    }}
                    className={styles.button}
                    type="primary"
                  >
                    {isSubscribedTo(communityId) ? JOINED_COMMUNITY_TEXT : JOIN_COMMUNITY_TEXT}
                  </Button>
                </div>
                <h2 className={styles.communitySubTitle}>{communityTitle}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderCommunityPosts = () => {
    return communityPosts.map((post) => {
      return <PostBox clickable key={`community-postbox-${post.id}`} post={post} />
    })
  }

  console.log(communityPosts)
  console.log(community)

  return (
    <Layout infoContent={renderCommunityInfo()} headContent={renderCommunityHead()}>
      {isLoading ? (
        <MoonLoader />
      ) : (
        <div>
          <PostInputBox className={styles.postInput} communityId={community?.id} />
          <div className={styles.communityPostsWrapper}>{renderCommunityPosts()}</div>
        </div>
      )}
    </Layout>
  )
}

Community.propTypes = {}

export default Community
