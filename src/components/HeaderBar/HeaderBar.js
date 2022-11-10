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

export const HeaderBar = () => {
  const isMobile = useIsMobile()
  const isSmallMobile = useIsSmallMobile()
  const { user, isUserLoggedIn, login } = useAuth()
  console.log(user)
  console.log(isUserLoggedIn())
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {isMobile ? (
          <SvgPodditLogoOnly className={styles.logo} viewBox="0 0 500 500" height="30" width="30" />
        ) : (
          <SvgPodditLogoS className={styles.logo} viewBox="0 0 140 38" />
        )}
        <SearchBar />
        <div className={styles.buttonWrapper}>
          {isSmallMobile ? undefined : (
            <>
              <Button type="secondary">SignUp</Button>
              <Button type="primary" onClick={() => login()}>
                Log In
              </Button>
            </>
          )}
          <div className={styles.profileButton}>
            <SvgUserIcon className={styles.userIcon} width="20" height="20" viewBox="0 0 100 100" />
            <SvgCaretDown
              className={styles.carretIcon}
              width="20"
              height="20"
              viewBox="0 0 300 300"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
