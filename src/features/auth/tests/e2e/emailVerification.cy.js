// in config.js, make sure config.fetch.privilegeEnabled === false

import fixture from "../fixtures/emailVerification.json";

const { token, responses } = fixture;
const key = "emailVerification";

describe("emailVerification", () => {
  it("Should reject with 401 by default", () => {
    cy.intercept("POST", "/api/auth/verify").as("verify");
    cy.visit(`/auth/verify?token=${token}`);
    cy.wait("@verify").then(({ response }) => {
      expect(response.statusCode).to.equal(401);
    });
    cy.scope(key, "feedback-heading").should("contain", "Failed to Verify");
    cy.scope(key, "feedback-text").should(
      "contain",
      "We could not verify your email address. The link is either invalid or expired."
    );
  });

  it("Should show correct messages on 200 response and navigate to home", () => {
    cy.intercept("POST", "/api/auth/verify", responses["200"]).as("verify");
    cy.visit(`/auth/verify?token=${token}`);
    cy.wait("@verify");
    cy.scope(key, "feedback-heading").should("contain", "Email Verified");
    cy.scope(key, "feedback-text").should(
      "contain",
      "You will be redirected shortly, welcome to Lorem!"
    );
    cy.wait(3000);
    cy.url().should("include", "/home");
    cy.contains("Successfully logged in");
  });

  it("Should structure verification request correctly", () => {
    cy.intercept("POST", "/api/auth/verify", responses["200"]).as("verify");
    cy.visit(`/auth/verify?token=${token}`);
    cy.wait("@verify").then(({ request }) => {
      expect(request.headers["authorization"]).to.equal(`Bearer ${token}`);
    });
  });
});
