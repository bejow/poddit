import { useEffect, useState } from "react"
import { isSizeSmallMobile } from "../screensize"

export default function isSmallMobile() {
  // keeps track of the screensize and returns it's width
  // and if the screensize is considered "mobile"
  const [isSmallMobile, setIsMobile] = useState(isSizeSmallMobile(window.innerWidth))
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => {
      setIsMobile(isSizeSmallMobile(window.innerWidth))
    }

    window.addEventListener("resize", onResize)
    setWidth(window.innerWidth)

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return { isSmallMobile, width }
}
