import { fileURLToPath, URL } from "url";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import viteCompression from "vite-plugin-compression";
import dns from "dns";
import zlib from "zlib";
import { VitePWA } from "vite-plugin-pwa";

// Localhost instead of ip 127.0.0.1
dns.setDefaultResultOrder("verbatim");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  //Workaround for building environments
  let dist = null;
  if (mode === "development") {
    dist = "build/dev/";
  } else if (mode === "pre") {
    dist = "build/pre/";
  } else if (mode === "prod") {
    dist = "build/prod/";
  }
  return {
    plugins: [
      vue(),
      viteCompression({
        filter: new RegExp("\\.(js|json|css|html|svg)$", "i"),
        threshold: 10240,
        algorithm: "brotliCompress",
        ext: ".br",
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]:
              zlib.constants.BROTLI_MAX_QUALITY,
            [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
          },
        },
        deleteOriginFile: false,
      }),
      viteCompression({
        filter: new RegExp("\\.(js|json|css|html)$", "i"),
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz",
        compressionOptions: {
          level: zlib.constants.Z_BEST_COMPRESSION,
        },
        deleteOriginFile: false,
      }),
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: [
          "cambera_icon.ico",
          "robots.txt",
          "apple-touch-icon.png",
        ],
        devOptions: {
          enabled: true,
        },
        manifest: {
          name: "RíosConCienciApp",
          short_name: "RíosConCienciApp",
          icons: [
            {
              src: "img/icons/manifest-icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "img/icons/manifest-icon-512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
          background_color: "#FFFFFF",
          theme_color: "#64b3dc",
        },
      }),
    ],
    define: {
      __APP_VERSION__: JSON.stringify(require("./package.json").version),
      // Can be set to true if no options api components are used. The build will be lighter
      __VUE_OPTIONS_API__: "true",
      // Enables devtools in production env, can be set to true for debugging purposes
      __VUE_PROD_DEVTOOLS__: "false",
      // Gives more details about hydration mismatch errors, not needed unless we are using SSR
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
    },
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
        "~": fileURLToPath(new URL("src", import.meta.url)),
        //Example alias bulma sass
        // bulma: "bulma/bulma.sass",
      },
    },
    server: {
      port: 8080,
      // Exits if port is already in use
      strictPort: true,
      // Uncomment for LOCAL DEVELOPMENT only to be able to use https with certificate in localhost.
      // Https configuration, default is false
      // https: {
      //   key: fs.readFileSync("./certificate/localhost-key.pem"),
      //   cert: fs.readFileSync("./certificate/localhost.pem"),
      // },
    },
    preview: {
      port: 8080,
      strictPort: true,
      https: false,
    },
    build: {
      outDir: dist,
      reportCompressedSize: false,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@use '@/styles/variables' as app-variables;",
        },
      },
      modules: {
        scopeBehaviour: "global",
      },
    },
    test: {
      include: ["__tests__/**/*.test.js"],
      environment: "jsdom",
      globals: true,
      deps: {
        inline: ["@vue"],
      },
    },
  };
});
