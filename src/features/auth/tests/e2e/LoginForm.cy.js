// in config.js, make sure config.fetch.privilegeEnabled === false

import fixture from "../fixtures/LoginForm.json";
const { login, responses } = fixture;

const key = "LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  // make sure backend server is running
  it("Should reject with 404 response and show errors by default", () => {
    cy.intercept("POST", "/api/auth/login").as("login");
    cy.scope(key, "open").click();
    cy.scope(key, "username").type(login.username);
    cy.scope(key, "password").type(login.password);
    cy.scope(key, "submit").click();
    cy.wait("@login").then(({ response }) => {
      expect(response.statusCode).to.equal(404);
    });
    cy.scope(key, "username-error").should(
      "contain",
      "Username or password is incorrect"
    );
    cy.scope(key, "password-error").should(
      "contain",
      "Username or password is incorrect"
    );
  });

  it("Should show correct message, store response cookie and navigate to home on 200 response", () => {
    cy.intercept("POST", "/api/auth/login", responses["200"]).as("login");
    cy.scope(key, "open").click();
    cy.scope(key, "username").type(login.username);
    cy.scope(key, "password").type(login.password);
    cy.scope(key, "submit").click();
    cy.wait("@login");
    cy.contains("Successfully logged in");
    const [cookieName, cookieValue] =
      responses["200"].headers["Set-Cookie"].split("=");
    cy.getCookie(cookieName).should("have.property", "value", cookieValue);
    cy.url().should("include", "/home");
  });

  it("Should show structure login request correctly", () => {
    cy.intercept("POST", "/api/auth/login", responses["200"]).as("login");
    cy.scope(key, "open").click();
    cy.scope(key, "username").type(login.username);
    cy.scope(key, "password").type(login.password);
    cy.scope(key, "submit").click();
    cy.wait("@login").then(({ request }) => {
      expect(request.headers["content-type"]).to.include("application/json");
      expect(request.body).to.deep.equal(login);
    });
  });
});
