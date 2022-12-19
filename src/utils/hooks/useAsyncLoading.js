import { useState } from "react"

export default function useAsyncLoading() {
  const [isLoading, setIsLoading] = useState(false)

  const runAsyncFunction = async (asyncFunc) => {
    setIsLoading(true)
    const result = await asyncFunc()
    setIsLoading(false)
    return result
  }

  return { runAsyncFunction, isLoading }
}
