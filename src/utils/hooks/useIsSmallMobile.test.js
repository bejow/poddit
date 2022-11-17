import { act, render, renderHook } from "@testing-library/react"
import useIsSmallMobile from "./useIsSmallMobile"

describe("isSmallMobileHook", () => {
  test("returns true for small mobile screens", () => {
    const { result } = renderHook(() => useIsSmallMobile())

    // need to render smth. to interact with screensize
    render(<></>)

    act(() => {
      global.innerWidth = 600
      global.dispatchEvent(new Event("resize"))
    })

    expect(result.current).toBe(true)
  })

  test("returns false for bigger screens", () => {
    const { result } = renderHook(() => useIsSmallMobile())

    // need to render smth. to interact with screensize
    render(<></>)

    act(() => {
      global.innerWidth = 700
      global.dispatchEvent(new Event("resize"))
    })

    expect(result.current).toBe(false)
  })
})
