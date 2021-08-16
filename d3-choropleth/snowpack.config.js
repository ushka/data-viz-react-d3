// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    src: "/"
  },
  alias: {
    components: "./src/components",
  },
  plugins: [

  ],
  packageOptions: {
    /* ... */
    // source: 'remote',
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
