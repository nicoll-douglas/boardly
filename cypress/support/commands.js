Cypress.Commands.add("scope", (key, id) => {
  return cy.get(`[data-cy="${key}-${id}"]`);
});
