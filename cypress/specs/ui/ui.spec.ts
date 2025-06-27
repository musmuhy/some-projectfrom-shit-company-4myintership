describe("Dashboard Table", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("frontend")}/comparer`);
    cy.wait(500)
  });

  it("should render the comparison table", () => {
    cy.get("table").should("exist");
    cy.get("table").should("be.visible");

    cy.contains("DE").should("be.visible");


    cy.contains("th", "A").should("be.visible");
    cy.contains("th", "B").should("be.visible");
    cy.contains("th", "C").should("be.visible");
    
    cy.contains("td", "HERREN-FUNKTIONSSHIRT").should("exist");
    cy.contains("td", "Material").should("exist");
  });
});