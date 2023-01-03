import React, { useEffect, useState } from "react"
import Box from "../../components/Box/Box"
import Feed from "../../components/Feed/Feed"
import PostInputBox from "../../components/PostInputBox/PostInputBox"
import Layout from "../../components/Layout/Layout"
import styles from "./MainPage.module.scss"
import { getCommunities, getPosts } from "../../utils/api"
import useErrorStore from "../../states/Error"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import MoonLoader from "react-spinners/MoonLoader"
import {
  DISCOVER_FILTER_TEXT,
  HOME_FILTER_TEXT,
  JOINED_COMMUNITY_TEXT,
  JOIN_COMMUNITY_TEXT,
  POPULAR_COMMUNITY_TEXT,
} from "../../assets/constants/strings"
import classNames from "classnames"
import { Collapse } from "react-collapse"
import Button from "../../components/Button/Button"
import useSubscriptions from "../../utils/hooks/useSubscriptions"
import TabBar from "../../components/TabBar/TabBar"
import TabButton from "../../components/TabButton/TabButton"

const MainPage = () => {
  const [posts, setPosts] = useState([])
  const { setError } = useErrorStore()
  const [communities, setCommunities] = useState([])
  const [applyPostFilter, setApplyPostFilter] = useState(false)
  const { runAsyncFunction, isLoading } = useAsyncLoading()

  const { subscribeTo, unsubscribeFrom, subscriptions, isSubscribedTo, fetchSubscriptions } =
    useSubscriptions()

  useEffect(() => {
    try {
      runAsyncFunction(handlePosts)
      runAsyncFunction(handleCommunities)
      runAsyncFunction(fetchSubscriptions)
    } catch (error) {
      setError({ message: error.message })
    }
    return () => {}
  }, [])

  const handlePosts = async () => {
    const fetchedPosts = await getPosts()
    setPosts(fetchedPosts)
  }

  const handleCommunities = async () => {
    const fetchedCommunities = await getCommunities()
    setCommunities(fetchedCommunities.map((community) => ({ ...community, isOpen: false })))
  }

  const handleCommunitySubscribe = async (communityId) => {
    await runAsyncFunction(async () => await subscribeTo(communityId))
    await runAsyncFunction(fetchSubscriptions)
  }

  const handleCommunityUnsubscribe = async (communityId) => {
    await runAsyncFunction(async () => await unsubscribeFrom(communityId))
    await runAsyncFunction(fetchSubscriptions)
  }

  const filterPostsToDisplay = (posts) => {
    if (applyPostFilter) {
      return posts.filter((post) => subscriptions.indexOf(post.community.id.toString()) > -1)
    } else {
      return posts
    }
  }

  const toggleOpen = (index) => {
    setCommunities((prevCommunities) => {
      var newCommunities = [...prevCommunities]
      newCommunities[index] = { ...newCommunities[index], isOpen: !newCommunities[index].isOpen }
      return [...newCommunities]
    })
  }

  console.log(applyPostFilter)

  const renderInfo = () => {
    return (
      <Box className={styles.wrapper}>
        <p className={styles.title}>{POPULAR_COMMUNITY_TEXT}</p>
        {communities.map((community, index) => (
          <div className={styles.boxContainer} key={`community-info-${community.id}`}>
            <div onClick={() => toggleOpen(index)} className={styles.collapseHeader}>
              <p className={styles.communityTitle}>{community.title}</p>
              <div className={styles.arrowContainer}>
                <i className={classNames(styles.arrow, styles.down)}></i>
              </div>
            </div>
            <Collapse isOpened={community.isOpen}>
              <p className={styles.info}>{community.info}</p>
              {isLoading ? (
                <div className={styles.spinnerWrapper}>
                  <MoonLoader size={15} loading={true} />
                </div>
              ) : (
                <Button
                  onClick={() =>
                    isSubscribedTo(community.id)
                      ? runAsyncFunction(async () => await handleCommunityUnsubscribe(community.id))
                      : runAsyncFunction(async () => await handleCommunitySubscribe(community.id))
                  }
                  className={styles.joinButton}
                  type={isSubscribedTo(community.id) ? "secondary" : "primary"}
                >
                  {isSubscribedTo(community.id) ? JOINED_COMMUNITY_TEXT : JOIN_COMMUNITY_TEXT}
                </Button>
              )}
            </Collapse>
          </div>
        ))}
      </Box>
    )
  }

  return (
    <Layout infoContent={renderInfo()}>
      <PostInputBox className={styles.postInputBox} />
      {isLoading ? (
        <MoonLoader loading={true} size={30} />
      ) : (
        <div>
          <TabBar className={styles.tabBar}>
            <TabButton
              className={styles.tabButton}
              onClick={() => setApplyPostFilter(true)}
              active={applyPostFilter}
            >
              {HOME_FILTER_TEXT}
            </TabButton>
            <TabButton
              className={styles.tabButton}
              onClick={() => setApplyPostFilter(false)}
              active={!applyPostFilter}
            >
              {DISCOVER_FILTER_TEXT}
            </TabButton>
          </TabBar>
          <Feed posts={filterPostsToDisplay(posts)} />
        </div>
      )}
    </Layout>
  )
}

export default MainPage
