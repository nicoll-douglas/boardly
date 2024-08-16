describe("Profile card with API integration", () => {
  it("Should update UI correctly with integration", () => {
    cy.intercept("GET", "**/api/me").as("fetch");
    cy.visit("/profile");
    cy.wait("@fetch");
    cy.contains("Unauthorized");
    cy.contains("Please login to access the requested resource.");
    cy.wait(250);
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });
});
