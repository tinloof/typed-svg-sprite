import type { Configuration } from "webpack";

// Minimal Next.js config types we need
interface NextConfig {
  webpack?: (config: any, context: any) => any;
  turbopack?: {
    rules?: Record<string, any>;
    [key: string]: any;
  };
  [key: string]: any;
}

/**
 * Adds svg-sprite-webpack-loader configuration to a Next.js config
 *
 * @param nextConfig - The existing Next.js configuration object
 * @param options - Options for the sprite loader
 * @returns Modified Next.js configuration with sprite loader support
 *
 * @example
 * ```typescript
 * import { withSpriteLoader } from 'svg-sprite-webpack-loader/next';
 *
 * const nextConfig = withSpriteLoader({
 *   // your existing Next.js config
 * }, {
 *   dist: 'static/media/sprite.svg'
 * });
 *
 * export default nextConfig;
 * ```
 */
export function withSpriteLoader(nextConfig: any): NextConfig {
  const spriteOptions = {
    dist: "static/media/sprite.svg",
  };

  return {
    ...nextConfig,
    webpack: (config: Configuration, context: any) => {
      // Call the existing webpack function if it exists
      if (typeof nextConfig.webpack === "function") {
        config = nextConfig.webpack(config, context);
      }

      // Add our sprite loader rule
      config.module = config.module || {};
      config.module.rules = config.module.rules || [];

      config.module.rules.push({
        test: /\.svg$/,
        use: [
          {
            loader: "svg-sprite-webpack-loader",
            options: spriteOptions,
          },
        ],
      });

      return config;
    },
    turbopack: {
      ...nextConfig.turbopack,
      rules: {
        ...nextConfig.turbopack?.rules,
        "*.svg": {
          loaders: [
            {
              loader: "svg-sprite-webpack-loader",
              options: spriteOptions,
            },
          ],
          as: "*.js",
        },
      },
    },
  };
}
