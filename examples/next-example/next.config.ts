import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // Regular webpack configuration for all SVG files
  webpack: (config, { isServer }) => {
    // Add rule for all SVG files to be processed by our sprite loader
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: path.resolve(__dirname, "../../dist/index.js"),
          options: {
            dist: "static/media/sprite.svg",
          },
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
            loader: path.resolve(__dirname, "../../dist/index.js"),
            options: {
              dist: "static/media/sprite.svg",
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
