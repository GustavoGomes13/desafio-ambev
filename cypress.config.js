const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    watchForFileChanges: false,
    experimentalStudio: false,

    setupNodeEvents(on, config) {
      on('dev-server:start', () => {
        return Promise.resolve()
      })
      return config
    },
  },

  env: {
    url: 'https://serverest.dev',
    baseURL: 'https://front.serverest.dev'
  }
});
