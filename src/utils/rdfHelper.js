import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getPodUrlAll,
  saveFileInContainer,
} from "@inrupt/solid-client"
import { FOAF } from "@inrupt/vocab-common-rdf"
import { PUBLIC_CONTAINER } from "../assets/constants/pod"

const postText = async (user, post, callback) => {
  const profileURL = new URL(user.info.webId)
  // remove hash
  profileURL.hash = ""

  const savedFile = await saveFileInContainer(
    user.pods[0] + PUBLIC_CONTAINER,
    new Blob([JSON.stringify(post)], { type: "plain/text" }),
    { slug: `poddit-post-${Date.now()}`, contentType: "text/plain", fetch: user.fetch },
  )

  callback(savedFile)
  return savedFile
}

const getProfile = async (webId, callback) => {
  const profileURL = new URL(webId)
  // remove hash
  profileURL.hash = ""

  // get solid dataset
  let profileData = await getSolidDataset(profileURL.href)

  // get profile data
  let profile = getThing(profileData, webId)

  // create profile object
  const name = getStringNoLocale(profile, FOAF.name)

  const profileObject = { name }

  callback(profileObject)
  return profileObject
}

const getPodUrl = async (user) => {
  const myPods = await getPodUrlAll(user.info.webId, { fetch: user.fetch })
  return myPods
}

export { getProfile, postText, getPodUrl }
