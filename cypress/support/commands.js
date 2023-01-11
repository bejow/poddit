Cypress.Commands.add("rewriteHeaders", () => {
  cy.intercept("*", (req) =>
    req.on("response", (res) => {
      const setCookies = res.headers["set-cookie"]
      res.headers["set-cookie"] = (Array.isArray(setCookies) ? setCookies : [setCookies])
        .filter((x) => x)
        .map((headerContent) =>
          headerContent.replace(/samesite=(lax|strict)/gi, "secure; SameSite=none"),
        )
    }),
  )
})
