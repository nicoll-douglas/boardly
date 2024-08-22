describe("Profile card with API integration", () => {
  it("Should update UI correctly with integration", () => {
    cy.intercept("GET", "**/api/me").as("fetch");
    cy.visit("/profile");
    cy.wait("@fetch");
    cy.contains("Session Expired");
    cy.contains("Please login to continue.");
    cy.wait(250);
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });
});
