import React, { useEffect, useState } from "react"
import Box from "../../components/Box/Box"
// import styles from "./Login.module.scss"
import Layout from "../../components/Layout/Layout"
import Feed from "../../components/Feed/Feed"
import { getPosts } from "../../utils/api"
import useErrorStore from "../../states/Error"
import MoonLoader from "react-spinners/MoonLoader"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"

const Login = () => {
  const [posts, setPosts] = useState([])
  const { runAsyncFunction, isLoading } = useAsyncLoading()

  const { setError } = useErrorStore()
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
      {isLoading ? <MoonLoader loading={true} size={30} /> : <Feed redirectToLogin posts={posts} />}
    </Layout>
  )
}

export default Login
