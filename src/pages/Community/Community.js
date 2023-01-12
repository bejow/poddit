import {
  ABOUT_COMMUNITY_TEXT,
  COMMUNITY_PREFIX,
  CREATED_TEXT,
  JOINED_COMMUNITY_TEXT,
  JOIN_COMMUNITY_TEXT,
  POSTS_TEXT,
  POST_TEXT,
} from "../../assets/constants/strings"
import { getCommunity, getMetaPostsFromCommunity } from "../../utils/api"
import { hashStringToColor } from "../../utils/colorHash"
import { useParams } from "react-router-dom"
import Box from "../../components/Box/Box"
import Button from "../../components/Button/Button"
import Layout from "../../components/Layout/Layout"
import MoonLoader from "react-spinners/MoonLoader"
import PostBox from "../../components/PostBox/PostBox"
import PostInputBox from "../../components/PostInputBox/PostInputBox"
import React, { useEffect, useState } from "react"
import styleConstants from "../../styles/constants.scss"
import styles from "./Community.module.scss"
import SVGCake from "../../components/icons/Cake"
import SVGDefaultCommunity from "../../components/icons/DefaultCommunity"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import useAuth from "../../utils/hooks/useAuth"
import useErrorStore from "../../states/Error"
import useSubscriptions from "../../utils/hooks/useSubscriptions"

const Community = () => {
  const [baseColorForCommunity, setBaseColorForCommunity] = useState(styleConstants.blue)
  const [community, setCommunity] = useState({})
  const [communityPosts, setCommunityPosts] = useState([])
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const { setError } = useErrorStore()
  const { user } = useAuth()
  const { fetchSubscriptions, isSubscribedTo, subscribeTo, unsubscribeFrom } =
    useSubscriptions(user)
  let { communityId } = useParams()
  const communityTitle = `${COMMUNITY_PREFIX}${community?.title}`

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
    const posts = await getMetaPostsFromCommunity(communityId)
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

export default Community
