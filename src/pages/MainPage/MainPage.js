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
import { JOIN_COMMUNITY_TEXT, POPULAR_COMMUNITY_TEXT } from "../../assets/constants/strings"
import classNames from "classnames"
import { Collapse } from "react-collapse"
import Button from "../../components/Button/Button"
import useAuth from "../../utils/hooks/useAuth"

const MainPage = () => {
  const [posts, setPosts] = useState([])
  const { setError } = useErrorStore()
  const [communities, setCommunities] = useState([])
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const { login } = useAuth()

  useEffect(() => {
    try {
      runAsyncFunction(handlePosts)
      runAsyncFunction(handleCommunities)
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

  const toggleOpen = (index) => {
    setCommunities((prevCommunities) => {
      var newCommunities = [...prevCommunities]
      newCommunities[index] = { ...newCommunities[index], isOpen: !newCommunities[index].isOpen }
      return [...newCommunities]
    })
  }

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
                  onClick={() => runAsyncFunction(login)}
                  className={styles.joinButton}
                  type="primary"
                >
                  {JOIN_COMMUNITY_TEXT}
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
      {isLoading ? <MoonLoader loading={true} size={30} /> : <Feed posts={posts} />}
    </Layout>
  )
}

export default MainPage
