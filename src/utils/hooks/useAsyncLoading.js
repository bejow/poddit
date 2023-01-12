import { useState } from "react"

export default function useAsyncLoading() {
  // returns a loading state for running async functions
  const [isLoading, setIsLoading] = useState(false)

  const runAsyncFunction = async (asyncFunc) => {
    setIsLoading(true)
    const result = await asyncFunc()
    setIsLoading(false)
    return result
  }

  return { runAsyncFunction, isLoading }
}
