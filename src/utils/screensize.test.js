import { isSizeMobile, isSizeSmallMobile } from "./screensize"

describe("Screensize", () => {
  // 960 is mobile breakpoint
  // 620 is mobile_s breakpoint
  test("isSizeMobile returns true for mobile screens", () => {
    const result = isSizeMobile(400)
    expect(result).toBe(true)
  })

  test("isSizeMobile returns false for bigger screens", () => {
    const result = isSizeMobile(1024)
    expect(result).toBe(false)
  })

  test("isSizeMobile returns false for invalid inputs", () => {
    const expectedResults = {
      textInput: false,
      undefinedInput: false,
      nullInput: false,
    }
    const results = {
      textInput: isSizeMobile("Snack"),
      undefinedInput: isSizeMobile(undefined),
      nullInput: isSizeMobile(null),
    }
    expect(results).toMatchObject(expectedResults)
  })

  test("isSizeSmallMobile returns true for mobile screens", () => {
    const result = isSizeSmallMobile(400)
    expect(result).toBe(true)
  })

  test("isSizeSmallMobile returns false for bigger screens", () => {
    const result = isSizeSmallMobile(700)
    expect(result).toBe(false)
  })

  test("isSizeSmallMobile returns false for invalid inputs", () => {
    const expectedResults = {
      textInput: false,
      undefinedInput: false,
      nullInput: false,
    }
    const results = {
      textInput: isSizeSmallMobile("Snack"),
      undefinedInput: isSizeSmallMobile(undefined),
      nullInput: isSizeSmallMobile(null),
    }
    expect(results).toMatchObject(expectedResults)
  })
})
