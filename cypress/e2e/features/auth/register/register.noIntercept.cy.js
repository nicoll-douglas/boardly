describe("Register form submission with API integration", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should toast correctly on 200 response", () => {
    cy.getByTestId("register-btn").click();
    cy.getByTestId("register-email").type("valid.email@gmail.com");
    cy.getByTestId("register-confirm-email").type("valid.email@gmail.com");
    cy.getByTestId("register-username").type("username");
    cy.getByTestId("register-password").type("ValidPassword123");
    cy.intercept("POST", "**/api/auth/register").as("fetch");
    cy.getByTestId("register-submit").click();
    cy.wait("@fetch");
    cy.contains("Account Created");
    cy.contains(
      "Please click the link we sent to your email to verify your account. It might be in your spam folder."
    );
  });
});
