const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./examples/webpack-example/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".ts", ".json", ".svg"],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: path.resolve(__dirname, "../../dist/index.js"),
            // Zero configuration - fully automatic!
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
      template: "./examples/webpack-example/src/index.html",
      title: "SVG Sprite Webpack Loader - Demo",
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, "dist"),
      publicPath: "/",
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
  },
  watchOptions: {
    ignored: "**/node_modules/**",
  },
  devtool: "source-map",
};
