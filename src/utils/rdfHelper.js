import {
  getSolidDataset,
  getStringNoLocale,
  getPodUrlAll,
  buildThing,
  createSolidDataset,
  createThing,
  setThing,
  saveSolidDatasetAt,
  saveSolidDatasetInContainer,
  createContainerAt,
  getThingAll,
  getStringEnglish,
  getUrl,
  addUrl,
  addStringNoLocale,
  universalAccess,
  removeThing,
} from "@inrupt/solid-client"
import {
  PUBLIC_CONTAINER,
  PRIVATE_CONTAINER,
  COMMUNITY_SUBSCRIPTIONS_FILENAME,
  SUBSCRIPTION_THINGNAME,
  COMMENTS_SCHEMA,
  PARENT_ITEM_SCHEMA,
  COMMENT_INDENTIFIER_PREFIX,
  POST_SCHEMA,
} from "../assets/constants/pod"
import { ERROR_TYPE_MISSING_WEBID } from "../assets/constants/strings"
import { getNameFromWebId } from "./webId"
import { publishPostToCommunity } from "./api"
import { RDF, SCHEMA_INRUPT, AS } from "@inrupt/vocab-common-rdf"
import { v4 as uuidv4 } from "uuid"

// DISCLAIMER: This file has more comments than usual
// This is because I think it's easier for people that are unfamiliar
// with solid to understand what's going on here

const postText = async (user, post, callback) => {
  // save post in users solid pod
  const uuid = uuidv4()
  const timestamp = Date.now()
  const identifier = `poddit-${timestamp}-${uuid}`
  var postSolidDataset = createSolidDataset()

  // create container structure in pod
  const postContainer = await createContainerAt(user.pods[0] + PUBLIC_CONTAINER + identifier, {
    fetch: user.fetch,
  })

  const commentContainer = await createContainerAt(
    user.pods[0] + PUBLIC_CONTAINER + identifier + "/comments",
    {
      fetch: user.fetch,
    },
  )

  // create post thing
  const postThing = buildThing(createThing({ name: identifier }))
    .addStringNoLocale(SCHEMA_INRUPT.Person, user.info.webId)
    .addStringNoLocale(SCHEMA_INRUPT.identifier, identifier)
    .addStringEnglish(SCHEMA_INRUPT.name, post.title)
    .addStringEnglish(SCHEMA_INRUPT.text, post.content)
    .addStringNoLocale(SCHEMA_INRUPT.image, "insert link to image HERE <---")
    .addUrl(RDF.type, POST_SCHEMA)
    .addUrl(COMMENTS_SCHEMA, commentContainer.internal_resourceInfo.sourceIri)
    .build()

  // Add things to Solid Dataset
  postSolidDataset = setThing(postSolidDataset, postThing)

  // Persist changes
  const savedSolidPostDataset = await saveSolidDatasetInContainer(
    postContainer.internal_resourceInfo.sourceIri,
    postSolidDataset,
    { fetch: user.fetch },
  )

  // make post/comments available for other users
  await universalAccess.setPublicAccess(
    commentContainer.internal_resourceInfo.sourceIri,
    { read: true, write: false, append: true },
    { fetch: user.fetch },
  )

  await universalAccess.setPublicAccess(
    savedSolidPostDataset.internal_resourceInfo.sourceIri,
    { read: true, write: false, append: false },
    { fetch: user.fetch },
  )

  callback([savedSolidPostDataset, commentContainer])
  return [savedSolidPostDataset, commentContainer]
}

const postTextToCommunity = async (user, community, title, content, callback) => {
  // creates a post in the users solid pod and
  // stores a reference to that post in the backend
  await postText(
    user,
    {
      community,
      title,
      content,
    },
    async (result) => {
      const createdSolidPostDataset = result[0]
      // store post reference in backend
      await publishPostToCommunity(
        createdSolidPostDataset.internal_resourceInfo.sourceIri,
        community.id,
      )
      callback(createdSolidPostDataset)
      return createdSolidPostDataset
    },
  )
}

const getPodUrls = async (user, setError) => {
  // a user can have multiple pods associated to their account
  // get pods that are used by the authed user
  var myPods
  try {
    myPods = await getPodUrlAll(user.info.webId, { fetch: fetch })
  } catch (error) {
    setError({ message: "Seems like your webid is missing", type: ERROR_TYPE_MISSING_WEBID })
  }
  return myPods
}

const getPost = async (postUrl) => {
  // fetches the content of a post

  // fetch datasets & get things from those datasets
  const postSolidDataset = await getSolidDataset(postUrl)
  const postThings = await getThingAll(postSolidDataset)
  const commentSolidDataset = await getSolidDataset(getUrl(postThings[0], COMMENTS_SCHEMA))
  const commentThings = await getThingAll(commentSolidDataset)

  // convert thing properties back into strings
  const creatorWebId = await getStringNoLocale(postThings[0], SCHEMA_INRUPT.Person)

  let comments = commentThings.map((commentThing) => {
    return {
      text: getStringEnglish(commentThing, SCHEMA_INRUPT.text),
      creator: getStringNoLocale(commentThing, SCHEMA_INRUPT.Person),
      identifier: getStringNoLocale(commentThing, SCHEMA_INRUPT.identifier),
      dateModified: getStringNoLocale(commentThing, SCHEMA_INRUPT.dateModified),
      parentIdentifier: getStringNoLocale(commentThing, PARENT_ITEM_SCHEMA),
    }
  })

  // combine all retrieved values
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

const subscribeToCommunity = async (user, communityId) => {
  // saves user community subscription into their solid pods
  const subscriptionDatasetUrl = `${user.pods[0]}${PRIVATE_CONTAINER}${COMMUNITY_SUBSCRIPTIONS_FILENAME}` // eslint-disable-line
  let subscriptionList
  try {
    // Attempt to retrieve subscriptions in case it already exists.
    subscriptionList = await getSolidDataset(subscriptionDatasetUrl, { fetch: user.fetch })
  } catch (error) {
    if (typeof error.statusCode === "number" && error.statusCode === 404) {
      // if not found, create a new SolidDataset for subscriptions
      subscriptionList = createSolidDataset()
    } else {
      throw error
    }
  }

  // add new subscription thing
  let subscription = createThing({ name: `${SUBSCRIPTION_THINGNAME}${communityId}` })
  subscription = addUrl(subscription, RDF.type, AS.Join)
  subscription = addStringNoLocale(subscription, AS.Group, communityId)
  subscriptionList = setThing(subscriptionList, subscription)

  // persist subscriptions
  let savedSubscriptionList = await saveSolidDatasetAt(subscriptionDatasetUrl, subscriptionList, {
    fetch: user.fetch,
  })
  return savedSubscriptionList
}

const getSubscribedCommunities = async (user) => {
  // returns subscribed communities retrieved from users solid pod
  const subscriptionDatasetUrl = `${user.pods[0]}${PRIVATE_CONTAINER}${COMMUNITY_SUBSCRIPTIONS_FILENAME}` // eslint-disable-line
  try {
    let subscriptionsDataset = await getSolidDataset(subscriptionDatasetUrl, { fetch: user.fetch })
    let subscriptions = getThingAll(subscriptionsDataset)
    subscriptions = subscriptions.map((subscription) => getStringNoLocale(subscription, AS.Group))
    return subscriptions
  } catch (error) {
    if (typeof error.statusCode === "number" && error.statusCode === 404) {
      // not found --> no subscriptions yet --> returning empty arrry
      // file will be created when subscribing to the first community
      return []
    } else {
      throw error
    }
  }
}

const unsubscribeFromCommunity = async (user, communityId) => {
  // deletes user community subscription from their solid pods
  const subscriptionDatasetUrl = `${user.pods[0]}${PRIVATE_CONTAINER}${COMMUNITY_SUBSCRIPTIONS_FILENAME}` // eslint-disable-line
  let subscriptionsDataset = await getSolidDataset(subscriptionDatasetUrl, { fetch: user.fetch })
  let subscriptions = getThingAll(subscriptionsDataset)

  // find and remove subscription
  subscriptions.forEach((subscription) => {
    if (getStringNoLocale(subscription, AS.Group) === communityId.toString()) {
      subscriptionsDataset = removeThing(subscriptionsDataset, subscription)
    }
  })

  // persist change
  const savedSubscriptionDataset = await saveSolidDatasetAt(
    subscriptionDatasetUrl,
    subscriptionsDataset,
    {
      fetch: user.fetch,
    },
  )
  return savedSubscriptionDataset
}

const postComment = async (user, commentUrl, comment, parentIdentifier, callback) => {
  // add a comment to an existing post
  const uuid = uuidv4()
  const timestamp = Date.now()
  const identifier = `${COMMENT_INDENTIFIER_PREFIX}${timestamp}-${uuid}`

  // get existing comments
  let commentSolidDataset = await getSolidDataset(commentUrl, { fetch: user.fetch })

  // create new comment
  var commentThing = buildThing(createThing({ name: identifier }))
    .addStringNoLocale(SCHEMA_INRUPT.identifier, identifier)
    .addStringEnglish(SCHEMA_INRUPT.text, comment)
    .addStringNoLocale(SCHEMA_INRUPT.Person, user.info.webId)
    .addStringNoLocale(SCHEMA_INRUPT.dateModified, new Date().toISOString())
    .addStringNoLocale(PARENT_ITEM_SCHEMA, parentIdentifier)
    .addUrl(RDF.type, COMMENTS_SCHEMA)
    .build()

  // add comment to solid  dataset
  commentSolidDataset = setThing(commentSolidDataset, commentThing)

  // persist
  const savedSolidCommentDataset = await saveSolidDatasetAt(commentUrl, commentSolidDataset, {
    fetch: user.fetch,
  })
  callback(savedSolidCommentDataset)
}

export {
  postText,
  getPodUrls,
  getPost,
  postComment,
  subscribeToCommunity,
  unsubscribeFromCommunity,
  getSubscribedCommunities,
  postTextToCommunity,
}
