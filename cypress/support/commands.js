Cypress.Commands.add("scope", (key, id) => {
  return cy.get(`[data-cy="${key}-${id}"]`);
});

Cypress.Commands.add("assertUrlIsIndex", () => {
  const baseUrl = Cypress.config("baseUrl");
  cy.url().should("eq", `${baseUrl}/`);
});
