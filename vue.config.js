const fs = require("fs");
module.exports = {
  chainWebpack: config => {
    config.plugin("define").tap(definitions => {
      definitions[0]["process.env"]["VERSION"] = JSON.stringify(
        require("./package.json").version
      );
      return definitions;
    });
    config.module
      .rule("pdf")
      .test(/\.pdf$/)
      .use("file-loader")
      .loader("file-loader")
      .options({ name: "[name].[ext]" });
  },
  outputDir: process.env.VUE_APP_DEPLOY_DIR,
  runtimeCompiler: true,
  devServer: {
    open: true,
    https: true,
    key: fs.readFileSync("./certificate/localhost-key.pem"),
    cert: fs.readFileSync("./certificate/localhost.pem")
  },
  css: {
    loaderOptions: {
      sass: {
        // to import global variables
        prependData: `
          @import "@/styles/global.scss";
          @import "@/styles/variables.scss";
          @import "@/styles/custom-buefy.scss";
          @import "@/styles/override.scss";
        `
      }
    }
  }
};
