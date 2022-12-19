import React, { useEffect, useState } from "react"
import Box from "../Box/Box"
import SvgArrowUp from "../icons/ArrowUp"
import styles from "./PostBox.module.scss"
import classNames from "classnames"
import PropTypes from "prop-types"
import {
  COMMENTS_TEXT,
  COMMUNITY_ROUTE,
  POSTED_BY_TEXT,
  POST_ROUTE,
  PROFILE_ROUTE,
  VOTE_CONTAINER_TEXT,
} from "../../assets/constants/strings"
import { Link, useNavigate } from "react-router-dom"
import { TimeSinceDisplay } from "../TimeSinceDisplay/TimeSinceDisplay"
import { IconButton } from "../IconButton/IconButton"
import { getPost } from "../../utils/rdfHelper"

/* eslint-disable */

const postData = {
  community: "webdev",
  creator: { webid: "webid", name: "John" },
  createdAt: new Date(new Date().getFullYear(), 0, 1),
  tags: ["frontend", "react"],
  votes: 286,
  title: "Replacing Component Logic with Hooks",
  content:
    "React doesn’t offer a way to “attach” reusable behavior to a component (for example, connecting it to a store). If you’ve worked with React for a while, you may be familiar with patterns like render props and higher-order components that try to solve this. But these patterns require you to restructure your components when you use them, which can be cumbersome and make code harder to follow. If you look at a typical React application in React DevTools, you will likely find a “wrapper hell” of components surrounded by layers of providers, consumers, higher-order components, render props, and other abstractions. While we could filter them out in DevTools, this points to a deeper underlying problem: React needs a better primitive for sharing stateful logic. With Hooks, you can extract stateful logic from a component so it can be tested independently and reused. Hooks allow you to reuse stateful logic without changing your component hierarchy. This makes it easy to share Hooks among many components or with the community.",
  comments: [
    {
      creator: { webid: "webid2", name: "Mark" },
      createdAt: new Date().toISOString(),
      content: "I totally agree with you",
      votes: 32,
      comments: [
        {
          creator: { webid: "webid3", name: "Jim" },
          createdAt: new Date().toISOString(),
          content: "THIS",
          votes: 108,
          comments: [],
        },
      ],
    },
    {
      creator: { webid: "webid4", name: "Cindy" },
      createdAt: new Date().toISOString(),
      content: "I totally not agree with you",
      votes: -87,
      comments: [],
    },
  ],
}
const { community, votes, tags, comments } = postData

const PostBox = ({ post, clickable, children }) => {
  const { community } = post
  const [postInfo, setPostInfo] = useState({ content: "", title: "" })
  const { content, title, creator, comments } = postInfo
  const createdAt = new Date(post.createdAt)
  const navigate = useNavigate()

  useEffect(() => {
    handlePost()
    return () => {}
  }, [post])

  const handlePost = async () => {
    const fetchedPost = await getPost(post.url)
    setPostInfo(fetchedPost)
  }

  const userLinkText = `u/${creator?.name}`
  const userLink = `${PROFILE_ROUTE}/${creator?.webId}`
  const communityLinkText = `r/${community.title}`
  const communityLink = `${COMMUNITY_ROUTE}/${community.id}`

  return (
    <Box
      className={styles.container}
      onClick={
        clickable
          ? () => navigate(`${POST_ROUTE}/${post.id}/${encodeURIComponent(post.url)}`)
          : undefined
      }
    >
      <div className={styles.flex}>
        <div className={classNames(styles.voteContainer, { [styles.white]: !clickable })}>
          <SvgArrowUp viewBox="0 0 28 28" width="20px" height="20px" className={styles.voteIcon} />
          <div className={styles.voteText}>{votes !== 0 ? votes : VOTE_CONTAINER_TEXT}</div>
          <SvgArrowUp
            viewBox="0 0 28 28"
            width="20px"
            height="20px"
            className={classNames(styles.downvoteIcon, styles.voteIcon)}
          />
        </div>
        <div className={styles.contentContainer}>
          <div className={styles.header}>
            <Link className={styles.communityLink} to={communityLink}>
              {communityLinkText}
            </Link>
            <span className={styles.dotSeperator}>•</span>
            <div>
              <span className={classNames(styles.smallText, styles.postedByText)}>
                {POSTED_BY_TEXT}
              </span>
              <Link className={classNames(styles.smallText, styles.userLink)} to={userLink}>
                {userLinkText}
              </Link>
              <TimeSinceDisplay className={styles.smallText} date={createdAt} />
            </div>
          </div>
          <div className={styles.content}>
            <h3 className={styles.postTitle}>{title}</h3>
            <p className={styles.postText}>{content}</p>
          </div>
          <div className={styles.footer}>
            <IconButton className={classNames({ [styles.cursorNormal]: !clickable })}>
              {comments?.length} {COMMENTS_TEXT}
            </IconButton>
          </div>
        </div>
      </div>
      {children}
    </Box>
  )
}

PostBox.propTypes = {
  children: PropTypes.node,
  posts: PropTypes.shape({
    id: PropTypes.number,
    url: PropTypes.string,
    createdAt: PropTypes.string,
    clickable: PropTypes.bool,
    community: PropTypes.shape({
      id: PropTypes.number,
      info: PropTypes.string,
      title: PropTypes.string,
    }),
  }),
}

export default PostBox
