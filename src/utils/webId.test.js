import { getNameFromWebId } from "./webId"

describe("WebId utils", () => {
  test("getNameFromWebId returns the name of an WebId", () => {
    const result = getNameFromWebId("https://id.inrupt.com/bejow")
    expect(result).toMatch("bejow")
  })

  test("getNameFromWebId returns undefined for invalid inputs", () => {
    const results = {
      emptyStringInput: getNameFromWebId(""),
      invalidStringInput: getNameFromWebId("Ben"),
      nullInput: getNameFromWebId(null),
      undefinedInput: getNameFromWebId(undefined),
    }

    const assertions = {
      emptyStringInput: undefined,
      invalidStringInput: undefined,
      nullInput: undefined,
      undefinedInput: undefined,
    }

    expect(results).toMatchObject(assertions)
  })
})
