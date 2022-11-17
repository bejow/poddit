import React from "react"
import styles from "./PostCreate.module.scss"
import Box from "../../components/Box/Box"
import Feed from "../../components/Feed/Feed"
import PostInputBox from "../../components/PostInputBox/PostInputBox"
import Layout from "../../components/Layout/Layout"

const PostCreate = () => {
  console.log("POST CREATE")
  return (
    <Layout>
      <div className={styles.pageWrapper}>
        <div className={styles.feedWrapper}>
          <PostInputBox className={styles.postInputBox} />
          <Feed />
        </div>
        <div className={styles.infoWrapper}>
          <Box>Posting to Reddit Disclaimer</Box>
        </div>
      </div>
    </Layout>
  )
}

export default PostCreate
