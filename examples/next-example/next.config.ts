import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Regular webpack configuration for all SVG files
  webpack: (config, { isServer }) => {
    // Add rule for all SVG files to be processed by our sprite loader
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "svg-sprite-webpack-loader",
          // No options needed - fully automatic!
        },
      ],
    });

    return config;
  },

  turbopack: {
    root: __dirname,
    rules: {
      // Turbopack rule for all SVG files
      "*.svg": {
        loaders: [
          {
            loader: "svg-sprite-webpack-loader",
            options: {},
          },
        ],
      },
    },
  },
};

export default nextConfig;
