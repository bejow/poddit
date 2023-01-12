import { isSizeMobile } from "../screensize"
import { useEffect, useState } from "react"

export default function useIsMobile() {
  // keeps track of the screensize and returns it's width
  // and if the screensize is considered "mobile"
  const [isMobile, setIsMobile] = useState(isSizeMobile(window.innerWidth))
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const onResize = () => {
      setIsMobile(isSizeMobile(window.innerWidth))
      setWidth(window.innerWidth)
    }

    window.addEventListener("resize", onResize)

    return () => {
      window.removeEventListener("resize", onResize)
    }
  }, [])

  return { isMobile, width }
}
