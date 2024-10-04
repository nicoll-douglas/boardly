// in config.js, make sure config.fetch.privilegeEnabled === true

import fixture from "../fixtures/privilege.json";

const { responses, cookie } = fixture;

describe("Optimistic component, usePrivilege hook, privilege feature", () => {
  afterEach(() => {
    cy.clearCookies();
  });

  it("Should navigate to home on 200 response", () => {
    cy.intercept("GET", "/api/auth/refresh", responses["200"]).as("refresh");
    cy.visit("/");
    cy.wait("@refresh");
    cy.url().should("include", "/home");
  });

  // make sure backend server is running
  it("Respond should reject with 401 by default", () => {
    cy.intercept("GET", "/api/auth/refresh").as("refresh");
    cy.visit("/");
    cy.wait("@refresh").then(({ response }) => {
      expect(response.statusCode).to.equal(401);
    });
    cy.assertUrlIsIndex();
  });

  it("Include cookies in request", () => {
    cy.intercept("GET", "/api/auth/refresh", responses["200"]).as("refresh");
    cy.setCookie(cookie.name, cookie.value);
    cy.visit("/");
    cy.wait("@refresh").then(({ request }) => {
      expect(request.headers["cookie"]).to.include(
        `${cookie.name}=${cookie.value}`
      );
    });
  });
});
