const withImages = require("next-images");
require("dotenv").config();

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

const withLess = require("@zeit/next-less"),
  nextConfig = {
    env: {
      host: process.env.IP || "localhost",
      port: process.env.PORT || "3001"
    },
    onDemandEntries: {
      maxInactiveAge: 1000 * 60 * 60,
      pagesBufferLength: 5
    },
    lessLoaderOptions: {
      javascriptEnabled: true
    },
    webpack: config => config
  };

module.exports = withImages(withLess(nextConfig));
