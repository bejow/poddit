import {
  CREATE_WEBID_TEXT,
  ERROR_MESSAGE_TEXT,
  ERROR_TYPE_MISSING_WEBID,
  INRUPT_SIGNUP_URL,
  MISSING_WEBID_INFO_TEXT,
  REFRESH_TEXT,
  SOMETHING_WENT_WRONG_TEXT,
} from "../../assets/constants/strings"
import { useNavigate } from "react-router-dom"
import Box from "../../components/Box/Box"
import Button from "../../components/Button/Button"
import Layout from "../../components/Layout/Layout"
import paths from "../../routing/routePaths"
import PropTypes from "prop-types"
import React from "react"
import styles from "./ErrorPage.module.scss"

const ErrorPage = ({ error, setError }) => {
  const navigate = useNavigate()

  const renderAdditionalInfo = () => {
    switch (error?.type) {
      case undefined:
        return (
          <Button
            type="primary"
            onClick={() => {
              setError({})
              navigate(paths.main)
            }}
          >
            {REFRESH_TEXT}
          </Button>
        )
      // user can be logged in without having a webId
      // --> redirect them to inrupt service to create one
      case ERROR_TYPE_MISSING_WEBID:
        return (
          <div>
            <p className={styles.solveText}>{MISSING_WEBID_INFO_TEXT}</p>
            <Button type="primary" onClick={() => (window.location.href = INRUPT_SIGNUP_URL)}>
              {CREATE_WEBID_TEXT}
            </Button>
          </div>
        )
      default:
        null
    }
  }

  return (
    <Layout hideSearchBar>
      <Box className={styles.box}>
        <div className={styles.contentWrapper}>
          <p className={styles.errorText}>{SOMETHING_WENT_WRONG_TEXT}</p>
          {error?.message ? (
            <p className={styles.errorText}>
              {ERROR_MESSAGE_TEXT} {error.message}
            </p>
          ) : null}
          {renderAdditionalInfo()}
        </div>
      </Box>
    </Layout>
  )
}

ErrorPage.propTypes = {
  error: PropTypes.object,
  hasError: PropTypes.func,
  setError: PropTypes.func,
}

export default ErrorPage
