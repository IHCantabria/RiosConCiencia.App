const fs = require("fs");
module.exports = {
  chainWebpack: config => {
    if (process.env.NODE_ENV === "production") {
      //Build PRO
      config.devtool("none");
    } else if (!process.env.WEBPACK_DEV_SERVER) {
      //BUILD DEV
      config.devtool("eval-source-map");
    } else {
      //LOCAL DEV
      config.devtool("source-map");
    }
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
      .options({ name: "[name].[ext]", outputPath: "pdfs/" });
  },
  outputDir: process.env.VUE_APP_DEPLOY_DIR,
  runtimeCompiler: true,
  devServer: {
    open: true,
    https: true,
    key: fs.readFileSync("./certificate/localhost-key.pem"),
    cert: fs.readFileSync("./certificate/localhost.pem")
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
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
