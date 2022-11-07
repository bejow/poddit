import { SCREEN_MOBILE, SCREEN_MOBILE_S } from "../assets/constants/breakpoints"

const isSizeMobile = (size) => {
  if (size === null) {
    return false
  }
  return size <= SCREEN_MOBILE
}

const isSizeSmallMobile = (size) => {
  if (size === null) {
    return false
  }
  return size <= SCREEN_MOBILE_S
}

export { isSizeMobile, isSizeSmallMobile }
