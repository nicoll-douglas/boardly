describe("Edit profile form with API integration", () => {
  it("Should update UI correctly with integration", () => {
    cy.fixture("/features/user-profile/200-response.json").then((response) => {
      cy.fixture("/features/user-profile/profileData.json").then(
        (profileData) => {
          cy.intercept("GET", "**/api/me", (req) => req.reply(response)).as(
            "fetch"
          );
          cy.intercept("POST", "**/api/me/profile/info").as("submit");
          cy.visit("/profile");
          cy.wait("@fetch");

          const { age, bio, pronouns } = profileData;
          cy.getByTestId("profile-open").click();
          cy.getByTestId("profile-age").type(`{selectall}{backspace}${age}`);
          cy.getByTestId("profile-pronouns").select(pronouns);
          cy.getByTestId("profile-bio").type(`{selectall}{backspace}${bio}`);
          cy.getByTestId("profile-submit").click();
          cy.wait("@submit");

          cy.wait(250);
          cy.url().should("eq", `${Cypress.config("baseUrl")}/`);
        }
      );
    });
  });
});
