describe("Register form submission", () => {
  const email = "valid.email@gmail.com";
  const confirmEmail = email;
  const username = "username";
  const password = "ValidPassword123";

  beforeEach(() => {
    cy.visit("/");
    cy.getByTestId("register-btn").click();
    cy.getByTestId("register-email").type(email);
    cy.getByTestId("register-confirm-email").type(confirmEmail);
    cy.getByTestId("register-username").type(username);
    cy.getByTestId("register-password").type(password);
  });

  it("Should structure request correctly", () => {
    cy.intercept("POST", "**/api/v1/auth/register").as("fetch");
    cy.getByTestId("register-submit").click();
    cy.wait("@fetch").then(({ request }) => {
      cy.wrap(request.url).should("include", "/api/v1/auth/register");
      expect(request.method).to.equal("POST");
      expect(request.body).to.deep.equal({
        email,
        confirmEmail,
        username,
        password,
      });
      expect(request.headers["content-type"]).to.include("application/json");
    });
  });
});
