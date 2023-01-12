import { useEffect } from "react"

const useClickOutside = (ref, callback) => {
  // triggers callback function if user clicks outside
  // of the referenced DOM Element
  const handleClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      callback()
    }
  }

  useEffect(() => {
    document.addEventListener("click", handleClick)

    return () => {
      document.removeEventListener("click", handleClick)
    }
  })
}

export default useClickOutside
