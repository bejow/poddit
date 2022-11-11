import React from "react"
import Box from "../../components/Box/Box"
import styles from "./Login.module.scss"
import { Layout } from "../../components/Layout/Layout"
import Feed from "../../components/Feed/Feed"

const Login = () => {
  return (
    <Layout>
      <div className={styles.pageWrapper}>
        <div className={styles.feedWrapper}>
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

export default Login
