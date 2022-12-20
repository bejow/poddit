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
    .addUrl(RDF.type, "https://schema.org/comment")
    .build()

  const postContainer = await createContainerAt(user.pods[0] + PUBLIC_CONTAINER + identifier, {
    fetch: user.fetch,
  })

  const commentContainer = await createContainerAt(
    user.pods[0] + PUBLIC_CONTAINER + identifier + "/comments",
    {
      fetch: user.fetch,
    },
  )

  const postThing = buildThing(createThing({ name: identifier }))
    .addStringNoLocale(SCHEMA_INRUPT.Person, user.info.webId)
    .addStringNoLocale(SCHEMA_INRUPT.identifier, identifier)
    .addStringEnglish(SCHEMA_INRUPT.name, post.title)
    .addStringEnglish(SCHEMA_INRUPT.text, post.content)
    .addStringNoLocale(SCHEMA_INRUPT.image, "insert link to image HERE <---")
    .addUrl(RDF.type, "https://schema.org/SocialMediaPosting")
    .addUrl("https://schema.org/comment", commentContainer.internal_resourceInfo.sourceIri)
    .build()

  postSolidDataset = setThing(postSolidDataset, postThing)
  commentSolidDataset = setThing(commentSolidDataset, commentsThing)

  const savedSolidPostDataset = await saveSolidDatasetInContainer(
    postContainer.internal_resourceInfo.sourceIri,
    postSolidDataset,
    { fetch: user.fetch }, // fetch from authenticated Session
  )

  // const savedSolidCommentDataset = await saveSolidDatasetInContainer(
  //   commentContainer.internal_resourceInfo.sourceIri,
  //   commentSolidDataset,
  //   { fetch: user.fetch }, // fetch from authenticated Session
  // )

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

  // await saveAclFor(savedSolidCommentDataset, access, { fetch: user.fetch })

  callback([savedSolidPostDataset, commentContainer])
  return [savedSolidPostDataset, commentContainer]
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

const getPost = async (postUrl) => {
  const postSolidDataset = await getSolidDataset(postUrl)

  const postThings = await getThingAll(postSolidDataset)

  const commentSolidDataset = await getSolidDataset(
    getUrl(postThings[0], "https://schema.org/comment"),
  )

  const commentThings = await getThingAll(commentSolidDataset)

  let comments = commentThings.map((commentThing) => {
    return {
      text: getStringEnglish(commentThing, SCHEMA_INRUPT.text),
      creator: getStringNoLocale(commentThing, SCHEMA_INRUPT.Person),
      identifier: getStringNoLocale(commentThing, SCHEMA_INRUPT.identifier),
      dateModified: getStringNoLocale(commentThing, SCHEMA_INRUPT.dateModified),
      parentIdentifier: getStringNoLocale(commentThing, "https://schema.org/parentItem"),
    }
  })

  const creatorWebId = await getStringNoLocale(postThings[0], SCHEMA_INRUPT.Person)
  const post = {
    title: getStringEnglish(postThings[0], SCHEMA_INRUPT.name),
    content: getStringEnglish(postThings[0], SCHEMA_INRUPT.text),
    identifier: getStringNoLocale(postThings[0], SCHEMA_INRUPT.identifier),
    creator: {
      webId: creatorWebId,
      name: getNameFromWebId(creatorWebId),
    },
    comments,
    commentUrl: commentSolidDataset.internal_resourceInfo.sourceIri,
  }
  return post
}

const postComment = async (user, commentUrl, comment, parentIdentifier, callback) => {
  const uuid = uuidv4()
  const timestamp = Date.now()
  const identifier = `#poddit-comment-${timestamp}-${uuid}`

  let commentSolidDataset = await getSolidDataset(commentUrl, { fetch: user.fetch })

  var commentThing = buildThing(createThing({ name: identifier }))
    .addStringNoLocale(SCHEMA_INRUPT.identifier, identifier)
    .addStringEnglish(SCHEMA_INRUPT.text, comment)
    .addStringNoLocale(SCHEMA_INRUPT.Person, user.info.webId)
    .addStringNoLocale(SCHEMA_INRUPT.dateModified, new Date().toISOString())
    .addStringNoLocale("https://schema.org/parentItem", parentIdentifier)
    .addUrl(RDF.type, "https://schema.org/Comment")
    .build()

  commentSolidDataset = setThing(commentSolidDataset, commentThing)

  const savedSolidCommentDataset = await saveSolidDatasetAt(commentUrl, commentSolidDataset, {
    fetch: user.fetch,
  })

  callback(savedSolidCommentDataset)
}

export { getProfile, postText, getPodUrl, getPost, postComment }
