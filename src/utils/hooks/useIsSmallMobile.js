import { useEffect, useState } from "react"
import { isSizeSmallMobile } from "../screensize"

export default function isSmallMobile() {
  const [isSmallMobile, setIsMobile] = useState(isSizeSmallMobile(window.innerWidth))

  useEffect(() => {
    const onResize = () => {
      setIsMobile(isSizeSmallMobile(window.innerWidth))
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return isSmallMobile
}
