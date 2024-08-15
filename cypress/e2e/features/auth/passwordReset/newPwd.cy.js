describe("New password form submission", () => {
  const token = "token";
  const password = "ValidPassword123";

  beforeEach(() => {
    cy.visit(`/auth/reset/${token}`);
    cy.getByTestId("reset-password").type(password);
    cy.getByTestId("reset-confirm-password").type(password);
  });

  it("Should display correct errors on 400 response", () => {
    cy.fixture("/features/auth/passwordReset/newPwd-400-response.json").then(
      (data) => {
        cy.intercept("POST", "**/api/auth/reset", (req) => {
          req.reply(data);
        }).as("fetch");
        cy.getByTestId("reset-submit").click();
        cy.wait("@fetch");
        cy.contains(data.body.feedback[0].message);
        cy.contains(data.body.feedback[1].message);
      }
    );
  });

  it("Should toast correctly on 429 response", () => {
    cy.intercept("POST", "**/api/auth/reset", (req) => {
      req.reply({
        statusCode: 429,
      });
    }).as("fetch");
    cy.getByTestId("reset-submit").click();
    cy.wait("@fetch");
    cy.contains("Too Many Requests");
    cy.contains("Please try again in 15 minutes.");
  });

  it("Should toast correctly on 500 response", () => {
    cy.intercept("POST", "**/api/auth/reset", (req) => {
      req.reply({
        statusCode: 500,
      });
    }).as("fetch");
    cy.getByTestId("reset-submit").click();
    cy.wait("@fetch");
    cy.contains("Server Error");
    cy.contains("Something went wrong, please try again later.");
  });

  it("Should toast correctly on 401 response", () => {
    cy.intercept("POST", "**/api/auth/reset", (req) => {
      req.reply({
        statusCode: 401,
      });
    }).as("fetch");
    cy.getByTestId("reset-submit").click();
    cy.wait("@fetch");
    cy.contains("Failed to Reset Password");
    cy.contains("The link is either invalid or expired.");
  });

  it("Should toast correctly on 200 response and navigate to index", () => {
    cy.intercept("POST", "**/api/auth/reset", (req) => {
      req.reply({
        statusCode: 200,
      });
    }).as("fetch");
    cy.getByTestId("reset-submit").click();
    cy.wait("@fetch");
    cy.contains("Password Successfully Reset");
    cy.contains("You will be redirected to login shortly.");
    cy.wait(3000);
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });

  it.only("Should structure request correctly", () => {
    cy.intercept("POST", "**/api/auth/reset").as("fetch");
    cy.getByTestId("reset-submit").click();
    cy.wait("@fetch").then(({ request }) => {
      expect(request.url).to.include("/api/auth/reset");
      expect(request.method).to.equal("POST");
      expect(request.headers["content-type"]).to.include("application/json");
      expect(request.headers.authorization).to.equal(`Bearer ${token}`);
      expect(request.body).to.deep.equal({
        password,
        confirmPassword: password,
      });
    });
  });
});
