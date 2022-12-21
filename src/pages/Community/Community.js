import React, { useEffect, useState } from "react"
// import PropTypes from "prop-types"
import { useParams } from "react-router-dom"
import Layout from "../../components/Layout/Layout"
import useErrorStore from "../../states/Error"
import { getCommunity, getPostsFromCommunity } from "../../utils/api"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import styles from "./Community.module.scss"
import MoonLoader from "react-spinners/MoonLoader"
import PostBox from "../../components/PostBox/PostBox"

const Community = () => {
  let { communityId } = useParams()
  const { setError } = useErrorStore()
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const [communityPosts, setCommunityPosts] = useState([])
  const [community, setCommunity] = useState([])

  useEffect(() => {
    try {
      runAsyncFunction(handleCommunityPosts)
      runAsyncFunction(handleCommunity)
    } catch (error) {
      setError({ message: error.message })
    }
    return () => {}
  }, [])

  const handleCommunityPosts = async () => {
    const posts = await getPostsFromCommunity(communityId)
    setCommunityPosts(posts)
  }

  const handleCommunity = async () => {
    const community = await getCommunity(communityId)
    setCommunity(community)
  }

  const renderCommunityInfo = () => {
    return (
      <div>
        <p>{community.title}</p>
        <p>{community.info}</p>
      </div>
    )
  }

  const renderCommunityPosts = () => {
    return communityPosts.map((post) => {
      return <PostBox clickable key={`community-postbox-${post.id}`} post={post} />
    })
  }

  console.log(communityPosts)
  console.log(community)

  return (
    <Layout>
      <div>{communityId}</div>
      {isLoading ? (
        <MoonLoader />
      ) : (
        <div>
          <div className={styles.communityInfoWrapper}>{renderCommunityInfo()}</div>
          <div className={styles.communityPostsWrapper}>{renderCommunityPosts()}</div>
        </div>
      )}
    </Layout>
  )
}

Community.propTypes = {}

export default Community
