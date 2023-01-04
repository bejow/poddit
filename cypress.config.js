const { defineConfig } = require("cypress")

module.exports = defineConfig({
  video: false,
  projectId: "swoaar",
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "http://127.0.0.1:3000",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
