import React from "react"
import SvgPodditLogoS from "../icons/PodditLogoS"
import SvgPodditLogoOnly from "../icons/PodditLogoOnly"
import styles from "./HeaderBar.module.scss"
import { SearchBar } from "../SearchBar/SearchBar"

const screensizepalceholder = 1024
const breakpointplaceholder = 900

export const HeaderBar = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        {screensizepalceholder > breakpointplaceholder ? (
          <SvgPodditLogoS className={styles.logo} />
        ) : (
          <SvgPodditLogoOnly className={styles.logo} />
        )}
        <SearchBar />
        <div className="loginBtns">
          <button>SignUp</button>
          <button>SignIn</button>
          <button>Profile</button>
        </div>
      </div>
    </div>
  )
}
