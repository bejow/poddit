const { defineConfig } = require("cypress")

module.exports = defineConfig({
  video: false,
  projectId: "swoaar",
  chromeWebSecurity: false,

  e2e: {
    experimentalSessionAndOrigin: true,
    baseUrl: "http://127.0.0.1:3000",
    experimentalInteractiveRunEvents: true,
    setupNodeEvents(on) {
      on("before:browser:launch", (browser = {}, launchOptions) => {
        if (browser.name === "chrome" || browser.name === "edge") {
          // To receive cookies from inrupt
          launchOptions.args.push("--disable-features=SameSiteByDefaultCookies")
          return launchOptions
        }
      })
    },
  },
})
