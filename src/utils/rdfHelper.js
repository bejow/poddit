/* eslint-disable */
import {
  getSolidDataset,
  getThing,
  getStringNoLocale,
  getPodUrlAll,
  saveFileInContainer,
  buildThing,
  createSolidDataset,
  createThing,
  setThing,
  saveSolidDatasetAt,
  saveSolidDatasetInContainer,
} from "@inrupt/solid-client"
import { FOAF, RDF, RDFS, SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf"
import { PUBLIC_CONTAINER } from "../assets/constants/pod"
import { getNameFromWebId } from "./webId"

const postText = async (user, post, callback) => {
  const profileURL = new URL(user.info.webId)
  // remove hash
  profileURL.hash = ""

  // const savedFile = await saveFileInContainer(user.pods[0] + PUBLIC_CONTAINER, postThing.build(), {
  //   slug: `poddit-post-${Date.now()}`,
  //   contentType: "text/turtle",
  //   fetch: user.fetch,
  // })

  var postSolidDataset = createSolidDataset()

  const postThing = buildThing(createThing({ name: "book1" }))
    .addStringNoLocale(SCHEMA_INRUPT.name, "ABC123 of Example Literature")
    .addUrl(RDF.type, "https://schema.org/Book")
    .build()

  postSolidDataset = setThing(postSolidDataset, postThing)

  const savedSolidDataset = await saveSolidDatasetInContainer(
    user.pods[0] + PUBLIC_CONTAINER,
    postSolidDataset,
    { fetch: user.fetch }, // fetch from authenticated Session
  )

  console.log(savedSolidDataset)
  callback(savedSolidDataset)
  return savedSolidDataset
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
