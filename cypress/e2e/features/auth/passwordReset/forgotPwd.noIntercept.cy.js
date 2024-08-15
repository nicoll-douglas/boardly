describe("Forgot password form with API integration", () => {
  const email = "valid.email@gmail.com";

  it("Should update UI correctly with integration", () => {
    cy.visit("/auth/forgot");
    cy.getByTestId("forgot-email").type(email);
    cy.getByTestId("forgot-confirm-email").type(email);
    cy.intercept("POST", "**/api/auth/forgot").as("fetch");
    cy.getByTestId("forgot-submit").click();
    cy.wait("@fetch");
    cy.contains("Count not find a user with this email address");
  });
});
