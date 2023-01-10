const {
  SIGN_IN_BUTTON_TEST_ID,
  HEADERBAR_USERNAME_TEST_ID,
} = require("../../src/assets/constants/testIds")
import paths from "../../src/routing/routePaths"
Cypress.config("defaultCommandTimeout", 100000)
describe("Login", () => {
  beforeEach(() => {
    cy.session(
      Date.now().toString(),
      () => {
        cy.visit("/")
        cy.viewport(1920, 1080)
        cy.get(`[data-test-id="${SIGN_IN_BUTTON_TEST_ID}"]`).click()
        cy.get(".visible-lg [type=text]", { timeout: 10000 }).type(
          Cypress.env("INRUPT_TESTING_USERNAME"),
          {
            force: true,
          },
        )
        cy.get(".visible-lg [type=password]", { timeout: 10000 }).type(
          Cypress.env("INRUPT_TESTING_PASSWORD"),
          {
            force: true,
          },
        )
        cy.get("div .visible-md").find("input[name='signInSubmitButton']").click()
        cy.get("[form='approve']").click()
        cy.get(`[data-test-id="${HEADERBAR_USERNAME_TEST_ID}"]`, { timeout: 30000 }).should(
          (item) => {
            expect(item).to.have.text(Cypress.env("INRUPT_TESTING_USERNAME"))
          },
        )
      },
      { cacheAcrossSpecs: true },
    )
  })

  it("Can open index page", () => {
    cy.visit("/")
  })

  it("Redirect unauthed user to login route", () => {
    cy.visit(paths.main)
    cy.url().should("include", "/")
  })

  it("Displays Username if logged in", () => {
    cy.visit("/")
    cy.get(`[data-test-id="${HEADERBAR_USERNAME_TEST_ID}"]`, { timeout: 20000 }).should(
      "have.text",
      Cypress.env("INRUPT_TESTING_USERNAME"),
    ) // wait for it to change
  })
})
