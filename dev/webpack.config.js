const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./dev/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.svg-sprite$/,
        use: [
          {
            loader: path.resolve(__dirname, "../dist/index.js"),
            options: {
              srcDir: "dev/assets/icons",
              pattern: "**/*.svg",
              symbolPrefix: "icon-",
              className: "svg-sprite",
              // Test TypeScript generation
              generateTypes: true,
              typesOutputPath: "dev/types/icon-types.ts",
              typesFormat: "both",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./dev/src/index.html",
      title: "SVG Sprite Webpack Loader - Development",
    }),
  ],
  devServer: {
    static: [
      {
        directory: path.join(__dirname, "dist"),
      },
      {
        directory: path.join(__dirname, "assets"),
        watch: true,
      },
    ],
    port: 3000,
    open: true,
    hot: true,
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 300,
    poll: false,
  },
  devtool: "source-map",
};
