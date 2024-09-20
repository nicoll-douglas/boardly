// in src/config, make sure config.fetch.queriesEnabled === true

import fixture from "../fixtures/Profile.json";
import { faker } from "@faker-js/faker";

const key = "Profile";
const { responses } = fixture;
const profile = responses["200"][0].body.profile;

describe("Profile", () => {
  it("Should redirect to /me if url username and profile username are the same", () => {
    cy.intercept("GET", "/api/users/*", responses["200"][0]).as("getUser");
    cy.visit(`/users/${profile.username}`);
    cy.wait("@getUser");
    cy.url().should("include", "/me");
  });

  it("Should not show/allow editables for /users/* client routes", () => {
    cy.intercept("GET", "/api/users/*", responses["200"][0]).as("getUser");
    cy.visit(`/users/${crypto.randomUUID()}`);
    cy.wait("@getUser");
    cy.scope(key, "editable").should("not.exist");
    cy.scope(key, "editable-input").should("be.disabled");
  });

  it("Should show/allow editables for /me route", () => {
    cy.intercept("GET", "/api/me", responses["200"][0]).as("getMe");
    cy.visit("/me");
    cy.wait("@getMe");
    cy.scope(key, "editable").should("exist");
    cy.scope(key, "editable-input").should("not.be.disabled");
  });

  it.only("Should structure requests correctly when submitting profile edit and set new edit", () => {
    let requestCount = 0;
    cy.intercept("GET", "/api/me", (req) => {
      req.reply(responses[200][requestCount]);
      requestCount += 1;
    }).as("getMe");
    cy.intercept("PATCH", "/api/me", responses["200User"]).as("patchMe");

    cy.visit("/me");
    cy.wait("@getMe");
    const preview = cy.scope(key, "bio-editable-preview");
    preview.should("contain", profile.bio);
    preview.click();

    const input = cy.scope(key, "editable-input").filter("#bio-editable-input");
    input.should("exist");

    const newBio = faker.lorem.words(3);
    input.type(newBio);

    cy.scope(key, "bio-submit").click();
    cy.wait("@patchMe").then(({ request }) => {
      expect(request.body).to.deep.equal({
        age: profile.age,
        pronouns: profile.pronouns,
        bio: newBio,
      });
      expect(request.headers["content-type"]).to.equal("application/json");
    });
    cy.wait("@getMe");
    cy.wait(500);
    preview.should("contain", responses[200][1].body.profile.bio);
  });
});
