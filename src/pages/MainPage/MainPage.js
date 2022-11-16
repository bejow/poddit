import React from "react"
import Box from "../../components/Box/Box"
import Feed from "../../components/Feed/Feed"
import PostInputBox from "../../components/PostInputBox/PostInputBox"
import Layout from "../../components/Layout/Layout"
import styles from "./MainPage.module.scss"

const MainPage = () => {
  return (
    <Layout>
      <div className={styles.pageWrapper}>
        <div className={styles.feedWrapper}>
          <PostInputBox className={styles.postInputBox} />
          <Feed />
        </div>
        <div className={styles.infoWrapper}>
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
      </div>
    </Layout>
  )
}

export default MainPage
