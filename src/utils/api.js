import { API_ENDPOINT, COMMUNITY_ENDPOINT } from "../assets/constants/strings"
const getCommunities = async () => {
  const { REACT_APP_API_URL } = process.env
  console.log(`${REACT_APP_API_URL}${API_ENDPOINT}${COMMUNITY_ENDPOINT}`)
  const response = await fetch(`${REACT_APP_API_URL}${API_ENDPOINT}${COMMUNITY_ENDPOINT}`)
  const communities = await response.json()
  return communities
}

export { getCommunities }
