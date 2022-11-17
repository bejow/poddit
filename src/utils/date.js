import {
  AGO_TEXT,
  DAYS_TEXT,
  DAY_TEXT,
  HOURS_TEXT,
  HOUR_TEXT,
  JUST_NOW_TEXT,
  MINUTES_TEXT,
  MINUTE_TEXT,
  SECONDS_TEXT,
  WEEKS_TEXT,
  WEEK_TEXT,
  YEARS_TEXT,
  YEAR_TEXT,
} from "../assets/constants/strings"

const getTimeSinceDateString = (date) => {
  // takes a Date object as argument
  // returns the time since then as a string

  var dateNow = new Date(Date.now())

  if (date instanceof Date && !isNaN(date.valueOf()) && dateNow >= date) {
    var seconds = Math.floor((dateNow - date) / 1000)
    var minutes = Math.floor(seconds / 60)
    var hours = Math.floor(minutes / 60)
    var days = Math.floor(hours / 24)
    var weeks = Math.floor(days / 7)
    var years = Math.floor(days / 365.2425)

    if (seconds < 60) {
      return `${seconds <= 1 ? JUST_NOW_TEXT : `${seconds} ${SECONDS_TEXT} ${AGO_TEXT}`}`
    }
    if (minutes < 60) {
      return `${minutes} ${minutes === 1 ? MINUTE_TEXT : MINUTES_TEXT} ${AGO_TEXT}`
    }
    if (hours < 24) {
      return `${hours} ${hours === 1 ? HOUR_TEXT : HOURS_TEXT} ${AGO_TEXT}`
    }
    if (days < 7) {
      return `${days} ${days === 1 ? DAY_TEXT : DAYS_TEXT} ${AGO_TEXT}`
    }
    if (weeks < 52) {
      return `${weeks} ${weeks === 1 ? WEEK_TEXT : WEEKS_TEXT} ${AGO_TEXT}`
    }
    return `${years} ${years === 1 ? YEAR_TEXT : YEARS_TEXT} ${AGO_TEXT}`
  } else {
    // not a valid date
    return undefined
  }
}

export { getTimeSinceDateString }
