import React from "react"
import Box from "../../components/Box/Box"
// import styles from "./Login.module.scss"
import Layout from "../../components/Layout/Layout"
import Feed from "../../components/Feed/Feed"

const Login = () => {
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
      <Feed />
    </Layout>
  )
}

export default Login
