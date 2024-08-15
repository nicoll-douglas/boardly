describe("Login form with API integration", () => {
  it("Should display correct errors with integration", () => {
    cy.visit("/");
    cy.intercept("POST", "**/api/auth/login").as("fetch");
    cy.getByTestId("login-btn").click();
    cy.getByTestId("login-username").type("username");
    cy.getByTestId("login-password").type("password");
    cy.getByTestId("login-submit").click();
    cy.wait("@fetch");
    cy.contains("Username or password is incorrect");
  });
});
