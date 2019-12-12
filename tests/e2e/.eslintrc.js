module.exports = {
  plugins: ["cypress"],
  env: {
    mocha: true,
    "cypress/globals": true
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    strict: "off"
  }
};
