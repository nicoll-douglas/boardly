import fixture from "../fixtures/RegisterForm.json";

const { email, username, password } = fixture;
const key = "RegisterForm";

describe("RegisterForm", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.intercept("POST", "/api/auth/register").as("register");
  });

  it("Should show error for mismatched emails", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.different);
    cy.scope(key, "username").type(username.default);
    cy.scope(key, "password").type(password.default);
    cy.scope(key, "submit").click();
    cy.scope(key, "confirmEmail-error").should(
      "contain",
      "Emails do not match"
    );
  });

  it("Should show error for username longer than 20", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.longerThan20);
    cy.scope(key, "password").type(password.default);
    cy.scope(key, "submit").click();
    cy.scope(key, "username-error").should(
      "contain",
      "Username must be no more than 20 characters long"
    );
  });

  it("Should show error for username with invalid character", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.invalidCharacter);
    cy.scope(key, "password").type(password.default);
    cy.scope(key, "submit").click();
    cy.scope(key, "username-error").should(
      "contain",
      "Username contains an invalid character"
    );
  });

  it("Should show error for password less than 8", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.default);
    cy.scope(key, "password").type(password.lessThan8);
    cy.scope(key, "submit").click();
    cy.scope(key, "password-error").should(
      "contain",
      "Password must be at least 8 characters long"
    );
  });

  it("Should show error for password longer than 30", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.default);
    cy.scope(key, "password").type(password.longerThan30);
    cy.scope(key, "submit").click();
    cy.scope(key, "password-error").should(
      "contain",
      "Password must be no more than 30 characters long"
    );
  });

  it("Should show error for password with no letter", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.default);
    cy.scope(key, "password").type(password.noLetter);
    cy.scope(key, "submit").click();
    cy.scope(key, "password-error").should(
      "contain",
      "Password must contain at least one letter"
    );
  });

  it("Should show error for password with no number", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.default);
    cy.scope(key, "password").type(password.noNumber);
    cy.scope(key, "submit").click();
    cy.scope(key, "password-error").should(
      "contain",
      "Password must contain at least one number"
    );
  });

  it("Should show error for password with invalid character", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.default);
    cy.scope(key, "password").type(password.invalidCharacter);
    cy.scope(key, "submit").click();
    cy.scope(key, "password-error").should(
      "contain",
      "Password contains an invalid character"
    );
  });

  it("Should show error for password with invalid character", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.default);
    cy.scope(key, "password").type(password.invalidCharacter);
    cy.scope(key, "submit").click();
    cy.scope(key, "password-error").should(
      "contain",
      "Password contains an invalid character"
    );
  });

  // make sure backend server is running
  // clear database when written to
  it.only("Should create account on successful validation", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.default);
    cy.scope(key, "password").type(password.default);
    cy.scope(key, "submit").click();
    cy.wait("@register");
    cy.contains("Account Created");
    cy.contains(
      "Please check your email and click the link to verify your account."
    );
  });

  it.only("Should structure register request correctly", () => {
    cy.scope(key, "open").click();
    cy.wait(250);
    cy.scope(key, "email").type(email.default);
    cy.scope(key, "confirmEmail").type(email.default);
    cy.scope(key, "username").type(username.default);
    cy.scope(key, "password").type(password.default);
    cy.scope(key, "submit").click();
    cy.wait("@register").then(({ request }) => {
      expect(request.body).to.deep.equal({
        email: email.default,
        confirmEmail: email.default,
        username: username.default,
        password: password.default,
      });
      expect(request.headers["content-type"]).to.include("application/json");
    });
  });
});
