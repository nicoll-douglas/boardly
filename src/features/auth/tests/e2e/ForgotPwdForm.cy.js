import fixture from "../fixtures/ForgotPwdForm.json";
const { email, responses } = fixture;

const key = "ForgotPwdForm";

describe("ForgotPwdForm", () => {
  beforeEach(() => {
    cy.visit("/auth/forgot");
  });

  it("Should show correct error for mismatched emails", () => {
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.different);
    cy.scope(key, "submit").click();
    cy.scope(key, "confirmEmail-error").should(
      "contain",
      "Emails do not match"
    );
  });

  // make sure backend server is running
  it("Should reject with 404 and show errors by default", () => {
    cy.intercept("POST", "/api/auth/forgot").as("forgot");
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "submit").click();
    cy.wait("@forgot");
    cy.scope(key, "email-error").should(
      "contain",
      "Could not find a user with this email address"
    );
  });

  it("Should structure forgot request correctly", () => {
    cy.intercept("POST", "/api/auth/forgot", responses["200"]).as("forgot");
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "submit").click();
    cy.wait("@forgot").then(({ request }) => {
      expect(request.headers["content-type"]).to.include("application/json");
      expect(request.body).to.deep.equal({
        email: email.default,
        confirmEmail: email.default,
      });
    });
  });

  it("Should show correct message on 200 response", () => {
    cy.intercept("POST", "/api/auth/forgot", responses["200"]).as("forgot");
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "submit").click();
    cy.wait("@forgot");
    cy.contains("Email Sent");
    cy.contains(
      "Please check your email and click the link to reset your password. It may be in your spam folder."
    );
  });
});
