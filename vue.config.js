const { defineConfig } = require("@vue/cli-service");
const path = require("path");
module.exports = defineConfig({
  transpileDependencies: true,
  outputDir: path.resolve(__dirname, "../oauth-maps-server/public"),
  devServer: {
    proxy: {
      "/auth": {
        target: "http://localhost:3000",
      },
    },
  },
});
