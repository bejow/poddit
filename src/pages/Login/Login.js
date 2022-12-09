import React, { useEffect, useState } from "react"
import Box from "../../components/Box/Box"
// import styles from "./Login.module.scss"
import Layout from "../../components/Layout/Layout"
import Feed from "../../components/Feed/Feed"
import { getPosts } from "../../utils/api"

const Login = () => {
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
        <Box>Communities</Box>
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
      <Feed posts={posts} />
    </Layout>
  )
}

export default Login
