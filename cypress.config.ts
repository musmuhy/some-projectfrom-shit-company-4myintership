

module.exports =({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/specs/**/*.spec.ts",
  },
   env: {
     /*  development:{}, */
     frontend: "http://localhost:5173",
     apiUrl: "http://localhost:8080",
   },
});
