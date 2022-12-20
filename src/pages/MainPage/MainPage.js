import React, { useEffect, useState } from "react"
import Box from "../../components/Box/Box"
import Feed from "../../components/Feed/Feed"
import PostInputBox from "../../components/PostInputBox/PostInputBox"
import Layout from "../../components/Layout/Layout"
import styles from "./MainPage.module.scss"
import { getPosts } from "../../utils/api"
import useErrorStore from "../../states/Error"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import MoonLoader from "react-spinners/MoonLoader"

const MainPage = () => {
  const [posts, setPosts] = useState([])
  const { setError } = useErrorStore()
  const { runAsyncFunction, isLoading } = useAsyncLoading()

  useEffect(() => {
    try {
      runAsyncFunction(handlePosts)
    } catch (error) {
      setError({ message: error.message })
    }
    return () => {}
  }, [])

  const handlePosts = async () => {
    const fetchedPosts = await getPosts()
    setPosts(fetchedPosts)
  }

  const renderInfo = () => {
    return (
      <div>
        <Box>Communydties</Box>
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
      {isLoading ? <MoonLoader loading={true} size={30} /> : <Feed posts={posts} />}
    </Layout>
  )
}

export default MainPage
