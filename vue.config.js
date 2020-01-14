module.exports = {
  chainWebpack: config => {
    config.plugin("define").tap(definitions => {
      definitions[0]["process.env"]["VERSION"] = JSON.stringify(
        require("./package.json").version
      );
      return definitions;
    });
  },
  outputDir: process.env.VUE_APP_DEPLOY_DIR,
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        // to import global variables
        prependData: `
          @import "@/styles/global.scss";
          @import "@/styles/variables.scss";
          @import "@/styles/custom-buefy.scss";
        `
      }
    }
  }
};
