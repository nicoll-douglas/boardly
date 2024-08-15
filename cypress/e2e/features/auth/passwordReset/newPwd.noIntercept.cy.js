describe("New password form submission with API integration", () => {
  const password = "ValidPassword123";

  it("Should show correct errors with integration", () => {
    cy.visit("/auth/reset/token");
    cy.getByTestId("reset-password").type(password);
    cy.getByTestId("reset-confirm-password").type(password);
    cy.intercept("POST", "**/api/auth/reset").as("fetch");
    cy.getByTestId("reset-submit").click();
    cy.wait("@fetch");
    cy.contains("Failed to Reset Password");
    cy.contains("The link is either invalid or expired.");
  });
});
