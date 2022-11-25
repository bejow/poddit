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
  createAcl,
  getResourceAcl,
  getSolidDatasetWithAcl,
  saveAclFor,
  createContainerAt,
  getPublicAccess,
} from "@inrupt/solid-client"
import { FOAF, RDF, RDFS, SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf"
import { universalAccess } from "@inrupt/solid-client"
import { PUBLIC_CONTAINER } from "../assets/constants/pod"
import { v4 as uuidv4 } from "uuid"

const postText = async (user, post, callback) => {
  const profileURL = new URL(user.info.webId)
  // remove hash
  profileURL.hash = ""

  // const savedFile = await saveFileInContainer(user.pods[0] + PUBLIC_CONTAINER, postThing.build(), {
  //   slug: `poddit-post-${Date.now()}`,
  //   contentType: "text/turtle",
  //   fetch: user.fetch,
  // })

  const uuid = uuidv4()
  const timestamp = Date.now()
  const identifier = `poddit-${timestamp}-${uuid}`
  var postSolidDataset = createSolidDataset()
  var commentSolidDataset = createSolidDataset()
  const commentsThing = buildThing(
    createThing({
      name: `poddit-comments-${timestamp}-${uuid}`,
    }),
  )
    .addStringNoLocale(SCHEMA_INRUPT.identifier, identifier)
    .addStringNoLocale(RDF.List, JSON.stringify(["test"]))
    .addUrl(RDF.type, "https://schema.org/comment")
    .build()

  const postThing = buildThing(createThing({ name: identifier }))
    .addStringNoLocale(SCHEMA_INRUPT.identifier, identifier)
    .addStringEnglish(SCHEMA_INRUPT.name, post.title)
    .addStringEnglish(SCHEMA_INRUPT.text, post.content)
    .addStringNoLocale(SCHEMA_INRUPT.image, "insert link to image HERE <---")
    .addUrl(RDF.type, "https://schema.org/SocialMediaPosting")
    .addUrl("https://schema.org/comment", commentsThing)
    .build()

  postSolidDataset = setThing(postSolidDataset, postThing)
  commentSolidDataset = setThing(commentSolidDataset, commentsThing)

  const container = await createContainerAt(user.pods[0] + PUBLIC_CONTAINER + identifier, {
    fetch: user.fetch,
  })
  console.log(container)

  const savedSolidPostDataset = await saveSolidDatasetInContainer(
    container.internal_resourceInfo.sourceIri,
    postSolidDataset,
    { fetch: user.fetch }, // fetch from authenticated Session
  )

  const container2 = await createContainerAt(
    user.pods[0] + PUBLIC_CONTAINER + identifier + "/comments",
    {
      fetch: user.fetch,
    },
  )

  const savedSolidCommentDataset = await saveSolidDatasetInContainer(
    container2.internal_resourceInfo.sourceIri,
    commentSolidDataset,
    { fetch: user.fetch }, // fetch from authenticated Session
  )

  console.log(savedSolidCommentDataset)
  console.log(savedSolidCommentDataset.internal_resourceInfo)

  const access = await universalAccess.setPublicAccess(
    savedSolidCommentDataset.internal_resourceInfo.sourceIri, // Resource
    { read: true, write: false, append: true }, // Access object
    { fetch: user.fetch }, // fetch function from authenticated session
  )

  // await saveAclFor(savedSolidCommentDataset, access, { fetch: user.fetch })

  console.log(access)
  console.log([savedSolidPostDataset, savedSolidCommentDataset])
  callback([savedSolidPostDataset, savedSolidCommentDataset])
  return [savedSolidPostDataset, savedSolidCommentDataset]
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
