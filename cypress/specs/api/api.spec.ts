describe("GET", () => {
  context("Getting Language Blocks", () => {
    it("returns a list of Lb items with language arrays", () => {
      cy.api({
        method: "GET",
        url: `${Cypress.env("apiUrl")}/styles`,
      }).then((res) => {
        expect(res.status).to.eq(200);
        expect(res.body).to.have.property("Lb");
        expect(res.body.Lb).to.be.an("array").and.have.length.greaterThan(0);

        res.body.Lb.forEach((lb: any) => {
          expect(lb).to.have.property("name").and.to.be.a("string");
          expect(lb).to.have.property("languages").and.to.be.an("array");

          lb.languages.forEach((lang: any) => {
            expect(lang).to.have.property("code").and.to.be.a("string");
            expect(lang).to.have.property("name").and.to.be.a("string");
          });
        });
      });
    });
  });
});