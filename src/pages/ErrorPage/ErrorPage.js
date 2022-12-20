import React from "react"
import Box from "../../components/Box/Box"
import Layout from "../../components/Layout/Layout"
import styles from "./ErrorPage.module.scss"
import PropTypes from "prop-types"
import { useNavigate } from "react-router-dom"
import { REFRESH_TEXT, SOMETHING_WENT_WRONG_TEXT } from "../../assets/constants/strings"
import Button from "../../components/Button/Button"
import paths from "../../routing/routePaths"

const ErrorPage = ({ error, hasError, setError }) => {
  const navigate = useNavigate()
  console.log(error, hasError(), setError)
  return (
    <Layout>
      <Box className={styles.box}>
        <div className={styles.contentWrapper}>
          <p className={styles.errorText}>{SOMETHING_WENT_WRONG_TEXT}</p>

          {error?.message ? (
            <p className={styles.errorText}>Error Message: {error.message}</p>
          ) : null}

          <Button
            type="primary"
            onClick={() => {
              setError({})
              navigate(paths.main)
            }}
          >
            {REFRESH_TEXT}
          </Button>
        </div>
      </Box>
    </Layout>
  )
}

ErrorPage.propTypes = {
  error: PropTypes.object,
  hasError: PropTypes.bool,
  setError: PropTypes.func,
}

export default ErrorPage
