import React, { useEffect, useState } from "react"
import Box from "../../components/Box/Box"
import Feed from "../../components/Feed/Feed"
import PostInputBox from "../../components/PostInputBox/PostInputBox"
import Layout from "../../components/Layout/Layout"
import styles from "./MainPage.module.scss"
import { getPosts } from "../../utils/api"

const MainPage = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    handlePosts()
    return () => {}
  }, [])

  const handlePosts = async () => {
    const fetchedPosts = await getPosts()
    setPosts(fetchedPosts)
  }

  const renderInfo = () => {
    return (
      <div>
        <Box>Communyties</Box>
        <Box>Communities</Box>
        <Box>Communities</Box>
        <Box>Communities</Box>
        <Box>Communities</Box>
        <Box>Communities</Box>
        <Box>Communities</Box>
        <Box>Communities</Box>
        <Box>Communities</Box>
        <Box>Communities</Box>
      </div>
    )
  }

  return (
    <Layout infoContent={renderInfo()}>
      <PostInputBox className={styles.postInputBox} />
      <Feed posts={posts} />
    </Layout>
  )
}

export default MainPage
