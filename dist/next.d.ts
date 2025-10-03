interface NextConfig {
    webpack?: (config: any, context: any) => any;
    turbopack?: {
        rules?: Record<string, any>;
        [key: string]: any;
    };
    [key: string]: any;
}
interface SpriteLoaderOptions {
    /**
     * URL path where the sprite file will be served from.
     * @default "/"
     */
    url?: string;
    /**
     * Filename for the sprite file.
     * @default "sprite.svg"
     */
    filename?: string;
    /**
     * Directory containing SVG files to include in the sprite.
     * Relative to project root.
     * @default "public/icons"
     */
    inputDir?: string;
    /**
     * Output path for the sprite file.
     * Relative to project root.
     * @default "public/sprite.svg"
     */
    outputFile?: string;
    /**
     * Output path for the TypeScript types file.
     * Relative to project root.
     * @default "generated/icons.ts"
     */
    typesOutputFile?: string;
}
/**
 * Generates SVG sprite and TypeScript types for Next.js projects
 *
 * This function generates:
 * 1. An SVG sprite file containing all icons
 * 2. A TypeScript file with typed icon IDs and helper functions
 *
 * No loader is needed - just import the typed icon references directly.
 *
 * @param nextConfig - The existing Next.js configuration object
 * @param options - Optional sprite generation configuration
 * @returns Next.js configuration (unchanged, sprite generation happens during config)
 *
 * @example
 * ```typescript
 * // next.config.ts
 * import { withSpriteLoader } from 'svg-sprite-webpack-loader/next';
 *
 * export default withSpriteLoader({
 *   // your existing Next.js config
 * });
 *
 * // Then in your components:
 * import { HOME, SETTINGS } from '@/generated/icons';
 * import { Icon } from '@/components/Icon';
 *
 * function MyComponent() {
 *   return (
 *     <>
 *       <Icon href={HOME} />
 *       <Icon href={SETTINGS} />
 *     </>
 *   );
 * }
 * ```
 *
 * @example
 * ```typescript
 * // With custom options
 * export default withSpriteLoader(
 *   {
 *     // your existing Next.js config
 *   },
 *   {
 *     inputDir: "assets/icons",
 *     outputFile: "public/icons-sprite.svg",
 *     typesOutputFile: "lib/icons.ts",
 *     url: "/",
 *     filename: "icons-sprite.svg"
 *   }
 * );
 * ```
 */
export declare function withSpriteLoader(nextConfig: any, options?: SpriteLoaderOptions): NextConfig;
export {};
