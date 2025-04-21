const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://front.serverest.dev',
    viewportWidth: 1280,
    viewportHeight: 720,
    setupNodeEvents(on, config) {

    },
  },

  env: {
    url: 'https://serverest.dev',
  }
});
