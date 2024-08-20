describe("Edit profile form submission", () => {
  it("Should toast correctly and refetch data on successful submission", () => {
    cy.fixture("/features/user-profile/200-response.json").then(
      (fetchResponse) => {
        cy.fixture("/features/user-profile/profileData.json").then(
          (profileData) => {
            let requestCount = 0;
            cy.intercept("GET", "**/api/me", (req) => {
              if (requestCount === 0) {
                requestCount += 1;
                req.reply(fetchResponse);
                return;
              }

              if (requestCount === 1) {
                requestCount += 1;
                req.reply({
                  statusCode: 200,
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: {
                    profile: profileData,
                  },
                });
              }
            }).as("fetch");

            cy.intercept("POST", "**/api/me/profile", (req) =>
              req.reply({
                statusCode: 200,
                body: {},
              })
            ).as("submit");

            cy.visit("/profile");
            cy.wait("@fetch");

            const { age, bio, pronouns } = profileData;
            cy.getByTestId("profile-open").click();
            cy.getByTestId("profile-age").type(`{selectall}{backspace}${age}`);
            cy.getByTestId("profile-pronouns").select(pronouns);
            cy.getByTestId("profile-bio").type(`{selectall}{backspace}${bio}`);
            cy.getByTestId("profile-submit").click();

            cy.wait("@submit");
            cy.contains("Successfully updated profile");
            cy.wait("@fetch");
            cy.contains(age);
            cy.contains(bio);
            cy.contains(pronouns);
          }
        );
      }
    );
  });
});
