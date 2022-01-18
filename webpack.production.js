const path = require("path");
var CustomVarLibraryNamePlugin = require("webpack-custom-var-library-name-append-plugin");

module.exports = {
  mode: 'production',
  entry: "./src/index.js",
  output: {
    filename: "milgraphics.js",
    path: path.resolve(path.resolve(), "dist"),
    library: "milgraphics",
    libraryTarget: "umd",
    umdNamedDefine: true
  },
  plugins: [
    new CustomVarLibraryNamePlugin({
      name: "ms"
    })
  ]
};
