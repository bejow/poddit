const { SIGN_IN_BUTTON_TEST_ID } = require("../../src/assets/constants/testIds")

// const { Session } = require("@inrupt/solid-client-authn-node")
const login = () => {
  cy.session(
    "123",
    () => {
      cy.viewport(1920, 1080)
      cy.visit("/")
      cy.get(`[data-test-id="${SIGN_IN_BUTTON_TEST_ID}"]`).click()
      cy.get("#signInFormUsername", { timeout: 10000 }).type(
        Cypress.env("INRUPT_TESTING_USERNAME"),
        {
          force: true,
        },
      )
      cy.get("#signInFormPassword", { timeout: 10000 }).type(
        Cypress.env("INRUPT_TESTING_PASSWORD"),
        {
          force: true,
        },
      )
      // cy.rewriteHeaders()
      cy.get("div .visible-md").find("input[name='signInSubmitButton']").click()
      cy.get('[form="approve"]').click()
      cy.wait(10000)
    },
    { cacheAcrossSpecs: true },
  )
}
describe("Login", () => {
  // before(() => {
  //   //login the user

  // })

  it("Can open index page", () => {
    login()
    cy.visit("/")
  })

  it("Redirect unauthed user to /login", () => {
    login()
    cy.visit("/")
    cy.url().should("include", "/login")
  })
})
