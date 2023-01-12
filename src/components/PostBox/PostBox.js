import {
  COMMENTS_TEXT,
  COMMUNITY_PREFIX,
  COMMUNITY_ROUTE,
  POSTED_BY_TEXT,
  POST_ROUTE,
  USER_PREFIX,
  VOTE_CONTAINER_TEXT,
} from "../../assets/constants/strings"
import { getPost } from "../../utils/rdfHelper"
import { IconButton } from "../IconButton/IconButton"
import { Link, useNavigate } from "react-router-dom"
import { TimeSinceDisplay } from "../TimeSinceDisplay/TimeSinceDisplay"
import Box from "../Box/Box"
import classNames from "classnames"
import PropTypes from "prop-types"
import React, { useEffect, useState, memo } from "react"
import styles from "./PostBox.module.scss"
import SvgArrowUp from "../icons/ArrowUp"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"

const PostBox = ({ post, clickable, children }) => {
  const { community } = post
  const [postInfo, setPostInfo] = useState({ content: "", title: "" })
  const { content, title, creator, comments } = postInfo
  const createdAt = new Date(post.createdAt)
  const [fetchError, setFetchError] = useState(false)
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const navigate = useNavigate()
  // no real vote count yet
  const votes = Math.floor(Math.random() * 1000)

  useEffect(() => {
    runAsyncFunction(handlePost)
    return () => {}
  }, [post])

  const handlePost = async () => {
    // decentral data could be not reachable
    try {
      const fetchedPost = await getPost(post.url)
      setPostInfo(fetchedPost)
    } catch (error) {
      setFetchError(true)
    }
  }

  const userLinkText = `${USER_PREFIX}${creator?.name}`
  const userLink = `${creator?.webId}`
  const communityLinkText = `${COMMUNITY_PREFIX}${community.title}`
  const communityLink = `${COMMUNITY_ROUTE}/${community.id}`

  const renderPostBox = () => (
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
            <Link
              onClick={(e) => e.stopPropagation()}
              className={styles.communityLink}
              to={communityLink}
            >
              {communityLinkText}
            </Link>
            <span className={styles.dotSeperator}>•</span>
            <div>
              <span className={classNames(styles.smallText, styles.postedByText)}>
                {POSTED_BY_TEXT}
              </span>
              <a
                target="_blank"
                rel="noreferrer"
                className={classNames(styles.smallText, styles.userLink)}
                href={userLink}
                onClick={(e) => e.stopPropagation()}
              >
                {userLinkText}
              </a>
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

  // PostBox dont render unfetchable posts
  return isLoading | fetchError ? null : renderPostBox()
}

PostBox.propTypes = {
  children: PropTypes.node,
  clickable: PropTypes.bool,
  post: PropTypes.shape({
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

export default memo(PostBox)
