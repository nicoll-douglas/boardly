Cypress.Commands.add("testId", (testId) => {
  return cy.get(`[data-cy="${testId}"]`);
});
