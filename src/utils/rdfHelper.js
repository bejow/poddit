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
  getThingAll,
  getStringEnglish,
  getUrl,
} from "@inrupt/solid-client"
import { FOAF, RDF, RDFS, SCHEMA_INRUPT } from "@inrupt/vocab-common-rdf"
import { universalAccess } from "@inrupt/solid-client"
import { PUBLIC_CONTAINER } from "../assets/constants/pod"
import { v4 as uuidv4 } from "uuid"
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
    .addStringNoLocale(SCHEMA_INRUPT.Person, user.info.webId)
    .addStringNoLocale(SCHEMA_INRUPT.identifier, identifier)
    .addStringEnglish(SCHEMA_INRUPT.name, post.title)
    .addStringEnglish(SCHEMA_INRUPT.text, post.content)
    .addStringNoLocale(SCHEMA_INRUPT.image, "insert link to image HERE <---")
    .addUrl(RDF.type, "https://schema.org/SocialMediaPosting")
    .addUrl("https://schema.org/comment", commentsThing)
    .build()

  postSolidDataset = setThing(postSolidDataset, postThing)
  commentSolidDataset = setThing(commentSolidDataset, commentsThing)

  const postContainer = await createContainerAt(user.pods[0] + PUBLIC_CONTAINER + identifier, {
    fetch: user.fetch,
  })
  console.log(postContainer)

  const savedSolidPostDataset = await saveSolidDatasetInContainer(
    postContainer.internal_resourceInfo.sourceIri,
    postSolidDataset,
    { fetch: user.fetch }, // fetch from authenticated Session
  )

  const commentContainer = await createContainerAt(
    user.pods[0] + PUBLIC_CONTAINER + identifier + "/comments",
    {
      fetch: user.fetch,
    },
  )

  const savedSolidCommentDataset = await saveSolidDatasetInContainer(
    commentContainer.internal_resourceInfo.sourceIri,
    commentSolidDataset,
    { fetch: user.fetch }, // fetch from authenticated Session
  )

  console.log(savedSolidCommentDataset)
  console.log(savedSolidCommentDataset.internal_resourceInfo)

  const accessComment = await universalAccess.setPublicAccess(
    commentContainer.internal_resourceInfo.sourceIri, // Resource
    { read: true, write: false, append: true }, // Access object
    { fetch: user.fetch }, // fetch function from authenticated session
  )

  const accessPost = await universalAccess.setPublicAccess(
    savedSolidPostDataset.internal_resourceInfo.sourceIri, // Resource
    { read: true, write: false, append: false }, // Access object
    { fetch: user.fetch }, // fetch function from authenticated session
  )

  const fetchedAccessComment = await universalAccess.getPublicAccess(
    commentContainer.internal_resourceInfo.sourceIri,
    { fetch: user.fetch },
  )

  const fetchedAccessPost = await universalAccess.getPublicAccess(
    savedSolidPostDataset.internal_resourceInfo.sourceIri,
    { fetch: user.fetch },
  )
  console.log(fetchedAccessPost)

  console.log("fetched from: " + commentContainer.internal_resourceInfo.sourceIri)
  console.log(fetchedAccessComment)
  console.log(fetchedAccessPost)
  // await saveAclFor(savedSolidCommentDataset, access, { fetch: user.fetch })

  console.log([savedSolidPostDataset, savedSolidCommentDataset])
  callback([savedSolidPostDataset, savedSolidCommentDataset])
  return [savedSolidPostDataset, savedSolidCommentDataset]
}

const getProfile = async (webId, callback) => {
  console.log(webId)
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

const getPost = async (postUrl) => {
  const postSolidDataset = await getSolidDataset(postUrl)

  console.log(postSolidDataset)
  const postThing = await getThingAll(postSolidDataset)

  const commentSolidDataset = await getSolidDataset(
    getUrl(postThing[0], "https://schema.org/comment"),
  )
  const commentThings = await getThingAll(commentSolidDataset)

  console.log(commentThings)
  const creatorWebId = await getStringNoLocale(postThing[0], SCHEMA_INRUPT.Person)
  const post = {
    title: getStringEnglish(postThing[0], SCHEMA_INRUPT.name),
    content: getStringEnglish(postThing[0], SCHEMA_INRUPT.text),
    creator: {
      webId: creatorWebId,
      name: getNameFromWebId(creatorWebId),
    },
    comments: commentThings,
    commentUrl: commentThings[0].url,
  }
  return post
}

const postComment = async (user, commentUrl, comment, callback) => {
  console.log(commentUrl)
  console.log(comment)
  const uuid = uuidv4()
  const timestamp = Date.now()
  const identifier = `#poddit-comment-${timestamp}-${uuid}`

  const commentSolidDataset = getSolidDataset(commentUrl, { fetch: user.fetch })

  var commentThing = buildThing(createThing({ name: identifier }))
    .addStringNoLocale(SCHEMA_INRUPT.identifier, identifier)
    .addStringEnglish(SCHEMA_INRUPT.text, comment)
    .addStringNoLocale(SCHEMA_INRUPT.Person, user.info.webId)
    .build()

  commentSolidDataset = commentSolidDataset.setThing(commentSolidDataset, commentThing)

  const savedSolidCommentDataset = await saveSolidDatasetAt(commentUrl, commentSolidDataset, {
    fetch: user.fetch,
  })

  callback(savedSolidCommentDataset)
}

export { getProfile, postText, getPodUrl, getPost, postComment }
