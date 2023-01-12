import { Collapse } from "react-collapse"
import { getCommunities, getMetaPosts } from "../../utils/api"
import { JOIN_COMMUNITY_TEXT, POPULAR_COMMUNITY_TEXT } from "../../assets/constants/strings"
import Box from "../../components/Box/Box"
import Button from "../../components/Button/Button"
import classNames from "classnames"
import Feed from "../../components/Feed/Feed"
import Layout from "../../components/Layout/Layout"
import MoonLoader from "react-spinners/MoonLoader"
import React, { useEffect, useState } from "react"
import styles from "./Login.module.scss"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import useAuth from "../../utils/hooks/useAuth"
import useErrorStore from "../../states/Error"

const Login = () => {
  const [communities, setCommunities] = useState([])
  const [posts, setPosts] = useState([])
  const { login } = useAuth()
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const { setError } = useErrorStore()

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
    const fetchedPosts = await getMetaPosts()
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

  const renderCommunity = (community, index) => (
    <div className={styles.boxContainer} key={`community-info-${community.id}`}>
      <div onClick={() => toggleOpen(index)} className={styles.collapseHeader}>
        <p onClick={() => login()} className={styles.communityTitle}>
          {community.title}
        </p>
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
  )

  const renderInfo = () => {
    return (
      <Box className={styles.wrapper}>
        <p className={styles.title}>{POPULAR_COMMUNITY_TEXT}</p>
        {communities.map((community, index) => renderCommunity(community, index))}
      </Box>
    )
  }

  return (
    <Layout infoContent={renderInfo()}>
      {isLoading ? <MoonLoader loading={true} size={30} /> : <Feed redirectToLogin posts={posts} />}
    </Layout>
  )
}

export default Login
