describe("Profile card data fetching", () => {
  beforeEach(() => {
    cy.visit("/profile");
  });

  it("Should display data on 200 response", () => {
    cy.fixture("/features/user-profile/200-response.json").then((data) => {
      cy.intercept("GET", "**/api/me", (req) => {
        req.reply(data);
      }).as("fetch");
      cy.wait("@fetch");
      const { username, age, bio, pronouns } = data.body.profile;
      cy.contains(username);
      cy.contains(age);
      cy.contains(bio);
      cy.contains(pronouns);
    });
  });

  it("Should toast correctly and navigate to index on 401 response", () => {
    cy.intercept("GET", "**/api/me", (req) => {
      req.reply({
        statusCode: 401,
      });
    }).as("fetch");
    cy.wait("@fetch");
    cy.contains("Unauthorized");
    cy.contains("Please login to access the requested resource.");
    cy.wait(250);
    cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
  });

  it("Should toast correctly on 500 response", () => {
    cy.intercept("GET", "**/api/me", (req) => {
      req.reply({
        statusCode: 500,
      });
    }).as("fetch");
    cy.wait("@fetch");
    cy.contains("Server Error");
    cy.contains("Something went wrong, please try again later.");
  });

  it("Should toast correctly on 429 response", () => {
    cy.intercept("GET", "**/api/me", (req) => {
      req.reply({
        statusCode: 429,
      });
    }).as("fetch");
    cy.wait("@fetch");
    cy.contains("Too many requests");
  });

  it("Should toast correctly on network error", () => {
    cy.intercept("GET", "**/api/me", {
      forceNetworkError: true,
    }).as("fetch");
    cy.wait("@fetch");
    cy.contains("Network Error");
    cy.contains("Something went wrong, please try again.");
  });
});
