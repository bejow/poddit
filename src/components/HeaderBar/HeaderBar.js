import React from "react"
import SvgPodditLogoS from "../icons/PodditLogoS"
import SvgPodditLogoOnly from "../icons/PodditLogoOnly"
import styles from "./HeaderBar.module.scss"
import SearchBar from "../SearchBar/SearchBar"
import Button from "../Button/Button"
import useIsMobile from "../../utils/hooks/useIsMobile"
import useIsSmallMobile from "../../utils/hooks/useIsSmallMobile"
import SvgUserIcon from "../icons/UserIcon"
import SvgCaretDown from "../icons/CaretDown"
import useAuth from "../../utils/hooks/useAuth"
import { INRUPT_SIGNUP_URL, SIGN_IN_TEXT, SIGN_UP_TEXT } from "../../assets/constants/strings"
import { getNameFromWebId } from "../../utils/webId"
import SvgUnknownUserIcon from "../icons/UnknownUserIcon"
import { useNavigate } from "react-router-dom"
import paths from "../../routing/routePaths"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import MoonLoader from "react-spinners/MoonLoader"
import PropTypes from "prop-types"

export const HeaderBar = ({ hideSearchBar }) => {
  const navigate = useNavigate()
  const { isMobile } = useIsMobile()
  const { isSmallMobile } = useIsSmallMobile()
  const { user, isUserLoggedIn, login } = useAuth()
  const { runAsyncFunction, isLoading } = useAsyncLoading()

  const renderButtons = () => {
    return (
      <div className={styles.buttonWrapper}>
        {renderAuthButtons()}
        {renderProfileButton()}
      </div>
    )
  }

  const renderAuthButtons = () =>
    isSmallMobile || isUserLoggedIn() ? undefined : (
      <>
        <Button onClick={() => (window.location.href = INRUPT_SIGNUP_URL)} type="secondary">
          {SIGN_UP_TEXT}
        </Button>
        {isLoading ? (
          <div className={styles.spinner}>
            <MoonLoader loading={true} size={15} />
          </div>
        ) : (
          <Button type="primary" onClick={() => runAsyncFunction(login)}>
            {SIGN_IN_TEXT}
          </Button>
        )}
      </>
    )

  const renderProfileButton = () =>
    isUserLoggedIn() ? (
      <div className={styles.profileButton}>
        <SvgUnknownUserIcon className={styles.unknownUserIcon} />
        <span className={styles.usernameText}>{getNameFromWebId(user.info.webId)}</span>
        <SvgCaretDown className={styles.carretIcon} width="16" height="16" viewBox="0 0 250 250" />
      </div>
    ) : (
      <div className={styles.profileButton}>
        <SvgUserIcon className={styles.userIcon} width="20" height="20" viewBox="0 0 100 100" />
        <SvgCaretDown className={styles.carretIcon} width="20" height="20" viewBox="0 0 300 300" />
      </div>
    )

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {isMobile ? (
          <SvgPodditLogoOnly
            onClick={() => navigate(paths.main)}
            className={styles.logo}
            viewBox="0 0 500 500"
            height="30"
            width="30"
          />
        ) : (
          <SvgPodditLogoS
            onClick={() => navigate(paths.main)}
            className={styles.logo}
            viewBox="0 0 140 38"
          />
        )}
        {hideSearchBar ? null : <SearchBar />}
        {renderButtons()}
      </div>
    </div>
  )
}

HeaderBar.propTypes = {
  hideSearchBar: PropTypes.bool,
}
