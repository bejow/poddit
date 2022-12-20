import { API_ENDPOINT, COMMUNITY_ENDPOINT, POST_ENDPOINT } from "../assets/constants/strings"
const { REACT_APP_API_URL } = process.env

const getCommunities = async () => {
  const response = await fetch(`${REACT_APP_API_URL}${API_ENDPOINT}${COMMUNITY_ENDPOINT}`)
  const communities = await response.json()
  return communities
}

const getPosts = async () => {
  const response = await fetch(`${REACT_APP_API_URL}${API_ENDPOINT}${POST_ENDPOINT}`)
  const posts = await response.json()
  return posts
}

// MetaPost = Post references in the database
// Post = Actual Post (with content) saved in solid pods
const getMetaPost = async (postId) => {
  const response = await fetch(`${REACT_APP_API_URL}${API_ENDPOINT}${POST_ENDPOINT}/${postId}`)
  const post = await response.json()
  return post
}

const publishPostToCommunity = async (postUrl, communityId) => {
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

export { getCommunities, publishPostToCommunity, getPosts, getMetaPost }
