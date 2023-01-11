import {
  HEADERBAR_USERNAME_TEST_ID,
  SIGN_IN_BUTTON_TEST_ID,
  SIGN_UP_BUTTON_TEST_ID,
} from "../../assets/constants/testIds"
import {
  INRUPT_SIGNUP_URL,
  LOG_OUT_TEXT,
  SIGN_IN_TEXT,
  SIGN_UP_TEXT,
} from "../../assets/constants/strings"
import { getNameFromWebId } from "../../utils/webId"
import { useNavigate } from "react-router-dom"
import Button from "../Button/Button"
import classNames from "classnames"
import MoonLoader from "react-spinners/MoonLoader"
import paths from "../../routing/routePaths"
import PropTypes from "prop-types"
import React, { useState, useRef } from "react"
import SearchBar from "../SearchBar/SearchBar"
import styles from "./HeaderBar.module.scss"
import SvgCaretDown from "../icons/CaretDown"
import SvgLogout from "../icons/Logout"
import SvgPodditLogoOnly from "../icons/PodditLogoOnly"
import SvgPodditLogoS from "../icons/PodditLogoS"
import SvgUnknownUserIcon from "../icons/UnknownUserIcon"
import SvgUserIcon from "../icons/UserIcon"
import useAsyncLoading from "../../utils/hooks/useAsyncLoading"
import useAuth from "../../utils/hooks/useAuth"
import useClickOutside from "../../utils/hooks/useClickOutside"
import useIsMobile from "../../utils/hooks/useIsMobile"
import useIsSmallMobile from "../../utils/hooks/useIsSmallMobile"

export const HeaderBar = ({ hideSearchBar }) => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { isMobile } = useIsMobile()
  const { isSmallMobile } = useIsSmallMobile()
  const { runAsyncFunction, isLoading } = useAsyncLoading()
  const { user, isUserLoggedIn, login, logout } = useAuth()
  const dropdownRef = useRef()
  const navigate = useNavigate()
  useClickOutside(dropdownRef, () => setIsUserMenuOpen(false))

  const renderButtons = () => {
    return (
      <div className={styles.buttonWrapper}>
        {renderAuthButtons()}
        {renderProfileButton()}
      </div>
    )
  }

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen((prev) => !prev)
  }

  const handleSignUp = () => {
    window.open(INRUPT_SIGNUP_URL, "_blank")
  }

  const renderLogo = () => {
    if (isMobile) {
      return (
        <SvgPodditLogoOnly
          onClick={() => navigate(paths.main)}
          className={styles.logo}
          viewBox="0 0 500 500"
          height="30"
          width="30"
        />
      )
    } else {
      return (
        <SvgPodditLogoS
          onClick={() => navigate(paths.main)}
          className={styles.logo}
          viewBox="0 0 140 38"
        />
      )
    }
  }

  const renderAuthButtons = () =>
    isSmallMobile || isUserLoggedIn() ? undefined : (
      <>
        <Button data-test-id={SIGN_UP_BUTTON_TEST_ID} onClick={handleSignUp} type="secondary">
          {SIGN_UP_TEXT}
        </Button>
        {isLoading ? (
          <div className={styles.spinner}>
            <MoonLoader loading={true} size={15} />
          </div>
        ) : (
          <Button
            type="primary"
            data-test-id={SIGN_IN_BUTTON_TEST_ID}
            onClick={() => runAsyncFunction(login)}
          >
            {SIGN_IN_TEXT}
          </Button>
        )}
      </>
    )

  const renderProfileButton = () =>
    isUserLoggedIn() ? (
      <div ref={dropdownRef} onClick={handleUserMenuToggle} className={styles.profileButton}>
        <SvgUnknownUserIcon className={styles.unknownUserIcon} />
        <span data-test-id={HEADERBAR_USERNAME_TEST_ID} className={styles.usernameText}>
          {getNameFromWebId(user.info.webId)}
        </span>
        <SvgCaretDown className={styles.carretIcon} width="16" height="16" viewBox="0 0 250 250" />
        {isUserMenuOpen ? (
          <div className={styles.dropdown}>
            <div onClick={logout} className={styles.dropdownItem}>
              <SvgLogout className={styles.logoutIcon} />
              {LOG_OUT_TEXT}
            </div>
          </div>
        ) : null}
      </div>
    ) : isSmallMobile ? (
      <div ref={dropdownRef} onClick={handleUserMenuToggle} className={styles.profileButton}>
        <SvgUserIcon className={styles.userIcon} width="20" height="20" viewBox="0 0 100 100" />
        <SvgCaretDown className={styles.carretIcon} width="20" height="20" viewBox="0 0 300 300" />
        {isUserMenuOpen ? (
          <div className={classNames(styles.dropdown, styles.flexible)}>
            <div
              onClick={() => runAsyncFunction(login)}
              className={classNames(styles.dropdownItem, styles.flexible)}
            >
              <SvgLogout className={styles.logoutIcon} />
              {SIGN_IN_TEXT}
            </div>
            <div
              onClick={handleSignUp}
              className={classNames(styles.dropdownItem, styles.flexible)}
            >
              <SvgLogout className={styles.logoutIcon} />
              {SIGN_UP_TEXT}
            </div>
          </div>
        ) : null}
      </div>
    ) : null

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {renderLogo()}
        {hideSearchBar ? null : <SearchBar />}
        {renderButtons()}
      </div>
    </div>
  )
}

HeaderBar.propTypes = {
  hideSearchBar: PropTypes.bool,
}
