describe("Forgot password form", () => {
  const email = "valid.email@gmail.com";

  beforeEach(() => {
    cy.visit("/auth/forgot");
  });

  it("Should display correct error on 404 response", () => {
    cy.getByTestId("forgot-email").type(email);
    cy.getByTestId("forgot-confirm-email").type(email);
    cy.intercept("POST", "**/api/auth/forgot", (req) => {
      req.reply({
        statusCode: 404,
      });
    }).as("fetch");
    cy.getByTestId("forgot-submit").click();
    cy.wait("@fetch");
    cy.contains("Count not find a user with this email address");
  });

  it("Should display correct error on 429 response", () => {
    cy.getByTestId("forgot-email").type(email);
    cy.getByTestId("forgot-confirm-email").type(email);
    cy.intercept("POST", "**/api/auth/forgot", (req) => {
      req.reply({
        statusCode: 429,
      });
    }).as("fetch");
    cy.getByTestId("forgot-submit").click();
    cy.wait("@fetch");
    cy.contains("Too Many Requests");
    cy.contains("Please try again in 15 minutes.");
  });

  it("Should display correct error on 500 response", () => {
    cy.getByTestId("forgot-email").type(email);
    cy.getByTestId("forgot-confirm-email").type(email);
    cy.intercept("POST", "**/api/auth/forgot", (req) => {
      req.reply({
        statusCode: 500,
      });
    }).as("fetch");
    cy.getByTestId("forgot-submit").click();
    cy.wait("@fetch");
    cy.contains("Server Error");
    cy.contains("Something went wrong, please try again later.");
  });

  it("Should display correct error on 200 response", () => {
    cy.getByTestId("forgot-email").type(email);
    cy.getByTestId("forgot-confirm-email").type(email);
    cy.intercept("POST", "**/api/auth/forgot", (req) => {
      req.reply({
        statusCode: 200,
      });
    }).as("fetch");
    cy.getByTestId("forgot-submit").click();
    cy.wait("@fetch");
    cy.contains("Email Sent");
    cy.contains(
      "Please check your email and click the link to reset your password. It may be in your spam folder."
    );
  });

  it("Should structure request correctly", () => {
    cy.getByTestId("forgot-email").type(email);
    cy.getByTestId("forgot-confirm-email").type(email);
    cy.intercept("POST", "**/api/auth/forgot").as("fetch");
    cy.getByTestId("forgot-submit").click();
    cy.wait("@fetch").then(({ request }) => {
      expect(request.url).to.include("/api/auth/forgot");
      expect(request.method).to.equal("POST");
      expect(request.body).to.deep.equal({
        email: email,
        confirmEmail: email,
      });
      expect(request.headers["content-type"]).to.include("application/json");
    });
  });
});
