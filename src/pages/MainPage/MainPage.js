import React from "react"
import Box from "../../components/Box/Box"
import Feed from "../../components/Feed/Feed"
import PostInputBox from "../../components/PostInputBox/PostInputBox"
import Layout from "../../components/Layout/Layout"
import styles from "./MainPage.module.scss"

const MainPage = () => {
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
      <PostInputBox className={styles.postInputBox} />
      <Feed />
    </Layout>
  )
}

export default MainPage
