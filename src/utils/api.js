import {
  API_ENDPOINT,
  COMMUNITIES_ENDPOINT,
  COMMUNITY_ENDPOINT,
  POST_ENDPOINT,
} from "../assets/constants/strings"
const { REACT_APP_API_URL } = process.env

// helper functions to interact with the poddit-backend

// MetaPost = Post references in the database
// Post = Actual Post (with content) saved in solid pods

const getCommunity = async (communityId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}${API_ENDPOINT}${COMMUNITIES_ENDPOINT}/${communityId})`,
  )
  const community = await response.json()
  return community
}

const getCommunities = async () => {
  const response = await fetch(`${REACT_APP_API_URL}${API_ENDPOINT}${COMMUNITIES_ENDPOINT}`)
  const communities = await response.json()
  return communities
}

const publishPostToCommunity = async (postUrl, communityId) => {
  // save post reference
  let response = await fetch(`${REACT_APP_API_URL}${API_ENDPOINT}${POST_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      url: postUrl,
      communityId,
    }),
  })
  return response
}

const getMetaPost = async (postId) => {
  const response = await fetch(`${REACT_APP_API_URL}${API_ENDPOINT}${POST_ENDPOINT}/${postId}`)
  const post = await response.json()
  return post
}

const getMetaPosts = async () => {
  const response = await fetch(`${REACT_APP_API_URL}${API_ENDPOINT}${POST_ENDPOINT}`)
  const posts = await response.json()
  return posts
}

const getMetaPostsFromCommunity = async (communityId) => {
  const response = await fetch(
    `${REACT_APP_API_URL}${API_ENDPOINT}${POST_ENDPOINT}${COMMUNITY_ENDPOINT}/${communityId}`,
  )
  const communityPosts = await response.json()
  return communityPosts
}

export {
  getCommunities,
  publishPostToCommunity,
  getMetaPosts,
  getMetaPost,
  getCommunity,
  getMetaPostsFromCommunity,
}
