describe("Email verification page", () => {
  const token = "token";

  beforeEach(() => {
    cy.visit(`/auth/verify/${token}`);
  });

  it("Should display UI feedback on 401 response", () => {
    cy.intercept("PATCH", "**/api/auth/verify", (req) => {
      req.reply({
        statusCode: 401,
      });
    }).as("fetch");
    cy.wait("@fetch");
    cy.contains("Failed to Verify");
    cy.contains(
      "We could not verify your email address. The link is either invalid or expired."
    );
  });

  it("Should display UI feedback on 500 response", () => {
    cy.intercept("PATCH", "**/api/auth/verify", (req) => {
      req.reply({
        statusCode: 500,
      });
    }).as("fetch");
    cy.wait("@fetch");
    cy.contains("Server Error");
    cy.contains("Something went wrong, please try again later.");
  });

  it("Should display UI feedback on 429", () => {
    cy.intercept("PATCH", "**/api/auth/verify", (req) => {
      req.reply({
        statusCode: 429,
      });
    }).as("fetch");
    cy.wait("@fetch");
    cy.contains("Too Many Requests");
    cy.contains("Please try again in 15 minutes.");
  });

  it("Should display UI feedback on 200 and navigates to home", () => {
    const accessToken = "accessToken";

    cy.intercept("PATCH", "**/api/auth/verify", (req) => {
      req.reply({
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          accessToken,
        },
      });
    }).as("fetch");
    cy.wait("@fetch");
    cy.contains("Email Verified");
    cy.contains("You will be redirected shortly, welcome to Lorem!");
    cy.wait(3000);
    cy.url().should("include", "/home");
  });
});
