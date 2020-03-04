const withImages = require("next-images");

if (typeof require !== "undefined") {
  require.extensions[".less"] = file => {};
}

const withLess = require("@zeit/next-less"),
  nextConfig = {
    env: {
      weatherApi: "",
      mapBoxApi: ""
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
