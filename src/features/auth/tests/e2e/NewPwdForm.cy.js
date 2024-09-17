// in config.js, make sure config.fetch.privilegeEnabled === false

import fixture from "../fixtures/NewPwdForm.json";

const { responses, password, token } = fixture;
const key = "NewPwdForm";

describe("NewPwdForm", () => {
  beforeEach(() => {
    cy.visit(`/auth/reset?token=${token}`);
  });

  it("Should show correct error if passwords do not match", () => {
    cy.scope(key, "password").type(password.default);
    cy.scope(key, "confirmPassword").type(password.different);
    cy.scope(key, "submit").click();
    cy.scope(key, "confirmPassword-error").should(
      "contain",
      "Passwords do not match"
    );
  });

  // make sure backend server is running
  it("Should fail to reset and respond with 401 by default", () => {
    cy.intercept("POST", "/api/auth/reset").as("reset");
    cy.scope(key, "password").type(password.default);
    cy.scope(key, "confirmPassword").type(password.default);
    cy.scope(key, "submit").click();
    cy.wait("@reset").then(({ response }) => {
      expect(response.statusCode).to.equal(401);
    });
    cy.contains("Failed to Reset Password");
    cy.contains("The link is either invalid or expired.");
  });

  it("Should show correct message and navigate to login on 200", () => {
    cy.intercept("POST", "/api/auth/reset", responses["200"]).as("reset");
    cy.scope(key, "password").type(password.default);
    cy.scope(key, "confirmPassword").type(password.default);
    cy.scope(key, "submit").click();
    cy.wait("@reset");
    cy.contains("Password Successfully Reset");
    cy.contains("You will be redirected to login shortly.");
    cy.wait(3000);
    cy.url().should("include", "/auth/login");
  });

  it("Should structure reset request properly", () => {
    cy.intercept("POST", "/api/auth/reset", responses["200"]).as("reset");
    cy.scope(key, "password").type(password.default);
    cy.scope(key, "confirmPassword").type(password.default);
    cy.scope(key, "submit").click();
    cy.wait("@reset").then(({ request }) => {
      expect(request.headers["content-type"]).to.include("application/json");
      expect(request.body).to.deep.equal({
        password: password.default,
        confirmPassword: password.default,
      });
      expect(request.headers["authorization"]).to.equal(`Bearer ${token}`);
    });
  });
});
