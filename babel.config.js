module.exports = {
  presets: ["@vue/app"],
  env: {
    test: {
      presets: ["@vue/app", ["env", { targets: { node: "current" } }]]
    }
  },
  ignore: []
};
