import { act, render, renderHook } from "@testing-library/react"
import useIsMobile from "./useIsMobile"

describe("isMobileHook", () => {
  test("returns true for mobile screens", () => {
    const { result } = renderHook(() => useIsMobile())

    // need to render smth. to interact with screensize
    render(<></>)

    act(() => {
      global.innerWidth = 400
      global.dispatchEvent(new Event("resize"))
    })
    setTimeout(() => expect(result.current).toStrictEqual({ isMobile: true, width: 400 }), 50)
  })

  test("returns false for bigger screens", () => {
    const { result } = renderHook(() => useIsMobile())

    // need to render smth. to interact with screensize
    render(<></>)

    act(() => {
      global.innerWidth = 1024
      global.dispatchEvent(new Event("resize"))
    })
    setTimeout(() => expect(result.current).toStrictEqual({ isMobile: false, width: 1024 }), 50)
  })
})
