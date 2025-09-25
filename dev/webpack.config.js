const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./dev/src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    clean: true,
    publicPath: "/",
  },
  module: {
    rules: [
      // SVG Sprite Loader
      {
        test: /\.svg-sprite$/,
        use: [
          {
            loader: path.resolve(__dirname, "../dist/index.js"),
            options: {
              src: "dev/assets/icons", // Source folder with SVGs
              dist: "dev/public", // Save sprite in public folder
              symbolPrefix: "icon-", // Optional: prefix for symbol IDs
              generateTypes: true, // Optional: generate TypeScript types
              typesOutput: "dev/src/sprite-types.ts", // Where to save types
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
        publicPath: "/",
      },
      {
        directory: path.join(__dirname, "assets"),
        publicPath: "/assets/",
        watch: true,
      },
      {
        directory: path.join(__dirname, "public"),
        publicPath: "/public/",
        watch: false, // Don't watch this directory to prevent infinite reloads
      },
    ],
    port: 3000,
    open: true,
    hot: true,
    // Enable compression for better sprite file serving
    compress: true,
    // Headers for better caching of sprite files
    headers: {
      "Cache-Control": "max-age=86400", // 24 hours for static assets
    },
  },
  watchOptions: {
    ignored: [
      "**/node_modules/**",
      "**/public/**",
      "**/sprite-types.ts",
      "**/sprite.svg",
    ],
    aggregateTimeout: 300,
    poll: false,
  },
  devtool: "source-map",
};
