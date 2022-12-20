import { useEffect, useState } from "react"
import { isSizeMobile } from "../screensize"

export default function useIsMobile() {
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
