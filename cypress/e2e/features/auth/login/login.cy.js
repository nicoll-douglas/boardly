describe("Login form submission", () => {
  const username = "username";
  const password = "password";

  beforeEach(() => {
    cy.visit("/");
    cy.getByTestId("login-btn").click();
    cy.getByTestId("login-username").type(username);
    cy.getByTestId("login-password").type(password);
  });

  it("Should set errors correctly on 400 response", () => {
    cy.fixture("/features/auth/login/400-response.json").then((data) => {
      cy.wrap(data).as("fixture");
      cy.intercept("POST", "**/api/v1/auth/login", (req) => {
        req.reply(data);
      }).as("fetch");
    });
    cy.getByTestId("login-submit").click();
    cy.wait("@fetch");
    cy.get("@fixture").then(({ body }) => {
      cy.contains(body.feedback[0].message);
      cy.contains(body.feedback[1].message);
    });
  });

  it("Should structure request correctly", () => {
    cy.intercept("POST", "**/api/v1/auth/login").as("fetch");
    cy.getByTestId("login-submit").click();
    cy.wait("@fetch").then(({ request }) => {
      cy.wrap(request.url).should("include", "/api/v1/auth/login");
      expect(request.body).to.deep.equal({ username, password });
      expect(request.headers["content-type"]).to.include("application/json");
      expect(request.method).to.equal("POST");
    });
  });

  it("Should set errors correctly on 404 response", () => {
    cy.intercept("POST", "**/api/v1/auth/login", (req) => {
      req.reply({
        statusCode: 404,
      });
    }).as("fetch");
    cy.getByTestId("login-submit").click();
    cy.wait("@fetch");
    cy.contains("Username or password is incorrect");
  });

  it("Should toast correctly on 429 response", () => {
    cy.intercept("POST", "**/api/v1/auth/login", (req) => {
      req.reply({
        statusCode: 429,
      });
    }).as("fetch");
    cy.getByTestId("login-submit").click();
    cy.wait("@fetch");
    cy.contains("Too Many Requests");
    cy.contains("Please try again in 15 minutes.");
  });

  it("Should toast correctly on 500 response", () => {
    cy.intercept("POST", "**/api/v1/auth/login", (req) => {
      req.reply({
        statusCode: 500,
      });
    }).as("fetch");
    cy.getByTestId("login-submit").click();
    cy.wait("@fetch");
    cy.contains("Server Error");
    cy.contains("Something went wrong, please try again later.");
  });

  it("Should toast correctly on network error", () => {
    cy.intercept("POST", "**/api/v1/auth/login", {
      forceNetworkError: true,
    }).as("fetch");
    cy.getByTestId("login-submit").click();
    cy.wait("@fetch");
    cy.contains("Network Error");
    cy.contains("Something went wrong, please try again.");
  });

  it.only("Should toast and navigate correctly on 200 response", () => {
    cy.fixture("/features/auth/login/200-response.json").then((data) => {
      cy.wrap(data).as("fixture");
      cy.intercept("POST", "**/api/v1/auth/login", (req) => {
        req.reply(data);
      }).as("fetch");
    });
    cy.getByTestId("login-submit").click();
    cy.wait("@fetch");
    cy.contains("Successfully logged in");
    cy.url().should("include", "/home");
  });
});
