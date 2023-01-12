import { getTimeSinceDateString } from "./date"

describe("Date Utils", () => {
  test("getTimeSinceDateString returns correct values for valid inputs", () => {
    // make new Date(Date.now()) always return the same result
    global.Date.now = jest.fn(() => new Date("2000-12-24T10:00:00Z"))

    const results = {
      secondAgo: getTimeSinceDateString(new Date("2000-12-24T09:59:59Z")),
      secondsAgo: getTimeSinceDateString(new Date("2000-12-24T09:59:30Z")),
      minuteAgo: getTimeSinceDateString(new Date("2000-12-24T09:59:00Z")),
      minutesAgo: getTimeSinceDateString(new Date("2000-12-24T09:25:00Z")),
      dayAgo: getTimeSinceDateString(new Date("2000-12-23T10:00:00Z")),
      daysAgo: getTimeSinceDateString(new Date("2000-12-20T10:00:00Z")),
      weekAgo: getTimeSinceDateString(new Date("2000-12-17T10:00:00Z")),
      weeksAgo: getTimeSinceDateString(new Date("2000-12-10T10:00:00Z")),
      yearAgo: getTimeSinceDateString(new Date("1999-12-24T10:00:00Z")),
      yearsAgo: getTimeSinceDateString(new Date("1980-12-24T10:00:00Z")),
    }

    const assertions = {
      secondAgo: "just now",
      secondsAgo: "30 seconds ago",
      minuteAgo: "1 minute ago",
      minutesAgo: "35 minutes ago",
      dayAgo: "1 day ago",
      daysAgo: "4 days ago",
      weekAgo: "1 week ago",
      weeksAgo: "2 weeks ago",
      yearAgo: "1 year ago",
      yearsAgo: "20 years ago",
    }

    expect(results).toMatchObject(assertions)
  })

  test("getTimeSinceDateString returns undefined for invalid dates / formats", () => {
    const results = {
      undefinedInput: getTimeSinceDateString(undefined),
      nullInput: getTimeSinceDateString(null),
      emptyStringInput: getTimeSinceDateString(""),
      invalidStringInput: getTimeSinceDateString("02.11.2022"),
      numberInput: getTimeSinceDateString(412621),
      invalidDateInput: getTimeSinceDateString(new Date("WRONG")),
      futureDateInput: getTimeSinceDateString(new Date("2000-12-25T09:59:59Z")),
    }

    const assertions = {
      undefinedInput: undefined,
      nullInput: undefined,
      emptyStringInput: undefined,
      invalidStringInput: undefined,
      numberInput: undefined,
      invalidDateInput: undefined,
      futureDateInput: undefined,
    }

    expect(results).toMatchObject(assertions)
  })
})
