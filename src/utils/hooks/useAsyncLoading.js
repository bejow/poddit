import { useState } from "react"

export default function useIsMobile() {
  const [isLoading, setIsLoading] = useState(false)

  const runAsyncFunction = async (asyncFunc, callback) => {
    setIsLoading(true)
    const result = await asyncFunc()
    callback()
    setIsLoading(false)
    return result
  }

  const Spinner = <div></div>

  return { runAsyncFunction, isLoading, Spinner }
}
