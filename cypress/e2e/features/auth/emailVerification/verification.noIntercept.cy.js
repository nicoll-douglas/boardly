describe("Email verification with API integration", () => {
  it("Should update UI correctly", () => {
    cy.intercept("PATCH", "**/api/auth/verify").as("fetch");
    cy.visit("/auth/verify/token");
    cy.wait("@fetch");
    cy.contains("Failed to Verify");
    cy.contains(
      "We could not verify your email address. The link is either invalid or expired."
    );
  });
});
