Cypress.Commands.add("cyId", (id) => {
  return cy.get(`[data-cy="${id}"]`);
});
